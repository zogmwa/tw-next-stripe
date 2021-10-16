import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import toast from 'react-hot-toast'
import axios from 'axios'
import { client } from '../utils/client'
import { Spinner } from '../components/spinner'
import { useUserContext } from '../hooks/use-user'

/**
 * This is a basic component that handles the callback from LinkedIn, after a login.
 */
export default function LoginWithLinkedin() {
  const { query, replace } = useRouter()
  const { mutate } = useSWRConfig()
  const { nextPageRedirect } = useUserContext()
  const [loginRequestSent, setLoginRequestSent] = useState(false)
  const [shouldNextPageRedirect, setShouldNextPageRedirect] = useState(false)
  const [failureRedirect, setFailureRedirect] = useState('/login')

  useEffect(() => {
    setFailureRedirect(localStorage.getItem('failure_redirect'))
  }, [])

  useEffect(() => {
    if (shouldNextPageRedirect) {
      nextPageRedirect()
    }
  }, [shouldNextPageRedirect, nextPageRedirect])

  // created nonEmptyCheck because in the first render it might happen that query is empty
  // and we don't want to redirect user to /login in the first render itself
  const nonEmptyQuery = Object.keys(query).length > 0

  // code is the LinkedIn auth code extracted from the callback url GET args
  const { code, state } = query as { code: string; state: string }

  const connectLinkedInAccountToExistingTaggedWebAccount = useCallback(
    async (linkedin_access_token, code) => {
      try {
        // Use LinkedIn access token to get TaggedWeb access token and Taggedweb user object
        await axios.post<{ access_token: string; refresh_token: string }>('/api/social/linkedin-connect/', {
          access_token: linkedin_access_token,
          code,
        })
        await mutate('/api/user')

        toast.success('Login Successful and LinkedIn Account Connected')

        setShouldNextPageRedirect(true)
      } catch (error) {
        replace(`${failureRedirect}?linkedInError=${error.response.data.detail}`)
      }
    },
    [mutate, replace, failureRedirect],
  )

  useEffect(
    function redirectToLoginPageOnInvalidCode() {
      if (nonEmptyQuery && (!code || state !== process.env.LINKEDIN_OAUTH_STATE)) {
        replace(failureRedirect)
      }
    },
    [nonEmptyQuery, code, state, replace, failureRedirect],
  )

  useEffect(
    function loginWithLinkedInAuthCode() {
      async function login() {
        if (code && state === process.env.LINKEDIN_OAUTH_STATE) {
          try {
            if (!loginRequestSent) {
              setLoginRequestSent(true)
              const redirectUrl =
                process.env.NODE_ENV === 'development'
                  ? 'http://localhost:3000/login-with-linkedin'
                  : 'https://taggedweb.com/login-with-linkedin'

              // Exchange LinkedIn auth code for LinkedIn authtoken
              const {
                data: { access_token: linkedin_access_token },
              } = await client.get<{ access_token: string }>(
                `/tweb-auth/linkedin/authtoken-from-code?code=${code}&redirect_uri=${redirectUrl}`,
              )

              try {
                // Use LinkedIn auth token to get TaggedWeb access token and user
                await axios.post<{ access_token: string; refresh_token: string }>('/api/social/linkedin/', {
                  access_token: linkedin_access_token,
                  code,
                })
                await mutate('/api/user')

                toast.success('Login Successful')

                setShouldNextPageRedirect(true)
              } catch (error) {
                const nonFieldErrors = error.response.data.non_field_errors
                const taggedweb_access_token = localStorage.getItem(process.env.ACCESS_TOKEN_LOCAL_STORAGE_KEY)
                if (
                  nonFieldErrors?.[0] === 'User is already registered with this e-mail address.' &&
                  // Everything is stored as a string in localStorage even nulls
                  taggedweb_access_token !== 'null'
                ) {
                  // If the linkedin login fails due to the email already existing attempt a linkedin connect (but the user should be logged in for this flow)
                  connectLinkedInAccountToExistingTaggedWebAccount(linkedin_access_token, code)
                } else {
                  // TODO: Using GET params to pass state between pages, find out if there is a better way, if-not, remove this todo comment
                  replace(
                    `${failureRedirect}?linkedInError=Your email already has an associated account. Login in via email/password first to be able to connect your LinkedIn account`,
                  )
                }
              }
            }
          } catch (error) {
            // If it isn't redirected to a page yet then it is likely an error case
            replace(failureRedirect)
          }
        }
      }
      login()
    },
    [code, state, replace, mutate, loginRequestSent, failureRedirect, connectLinkedInAccountToExistingTaggedWebAccount],
  )

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen space-y-4">
      <Spinner className="w-8 h-8 !text-text-secondary" />
      <div className="text-sm text-text-tertiary">Login with Linkedin</div>
    </div>
  )
}
