import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Spinner } from '@taggedweb/components/spinner'
import { useUserContext } from '@taggedweb/hooks/use-user'

/**
 * This is a component to handle the callback from Google for OAuth flow.
 */
export default function LoginWithGoogle() {
  const { replace } = useRouter()
  const { mutate } = useSWRConfig()
  const { nextPageRedirect } = useUserContext()
  const [loginRequestSent, setLoginRequestSent] = useState(false)
  const [shouldNextPageRedirect, setShouldNextPageRedirect] = useState(false)
  const [failureRedirect, setFailureRedirect] = useState('/login')

  useEffect(() => {
    setFailureRedirect(localStorage.getItem(process.env.FAILURE_PAGE_URL_LOCAL_STORAGE_KEY))
  }, [])

  useEffect(() => {
    if (shouldNextPageRedirect) {
      nextPageRedirect()
    }
  }, [shouldNextPageRedirect, nextPageRedirect])

  const params = {}
  // Parse Hash part of URL
  if (typeof document !== 'undefined') {
    const fragmentString = location.hash.substring(1)
    // Parse query string to see if page request is coming from OAuth 2.0 server.
    const regex = /([^&=]+)=([^&]*)/g
    let m
    while ((m = regex.exec(fragmentString))) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
    }
  }

  // created nonEmptyCheck because in the first render it might happen that query is empty
  // and we don't want to redirect user to /login in the first render itself
  const nonEmptyQuery = Object.keys(params).length > 0

  const { access_token: google_access_token, state } = params as { access_token: string; state: string }

  const connectGoogleAccountToExistingTaggedWebAccount = useCallback(
    async (google_access_token) => {
      try {
        await axios.post('/api/social/google-connect/', {
          access_token: google_access_token,
        })

        await mutate('/api/user')
        toast.success('Login Successful and Google Account Connected')

        setShouldNextPageRedirect(true)
      } catch (error) {
        if (error?.response?.status === 401) {
          return replace(
            `${failureRedirect}?googleError=Your email already has an associated account. Login in via email/password first to be able to connect your Google account`,
          )
        }
        replace(`${failureRedirect}?googleError=${error.response.data.detail}`)
      }
    },
    [replace, mutate, failureRedirect],
  )

  useEffect(
    function redirectToLoginPageOnInvalidToken() {
      if (nonEmptyQuery && (!google_access_token || state !== process.env.GOOGLE_OAUTH_STATE)) {
        replace(failureRedirect)
      }
    },
    [nonEmptyQuery, google_access_token, state, replace, failureRedirect],
  )

  useEffect(
    function loginWithGoogleAuthToken() {
      async function login() {
        if (google_access_token && state === process.env.GOOGLE_OAUTH_STATE) {
          try {
            if (!loginRequestSent) {
              setLoginRequestSent(true)
              await axios.post('/api/social/google/', {
                access_token: google_access_token,
              })

              await mutate('/api/user')
              toast.success('Login Successful')

              setShouldNextPageRedirect(true)
            }
          } catch (error) {
            const nonFieldErrors = error.response.data.non_field_errors
            if (nonFieldErrors?.[0] === 'User is already registered with this e-mail address.') {
              connectGoogleAccountToExistingTaggedWebAccount(google_access_token)
            } else {
              // If it isn't redirected to a page yet then it is likely an error case
              replace(`${failureRedirect}`)
            }
          }
        }
      }
      login()
    },
    [
      google_access_token,
      state,
      replace,
      mutate,
      loginRequestSent,
      connectGoogleAccountToExistingTaggedWebAccount,
      failureRedirect,
    ],
  )

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen space-y-4">
      <Spinner className="w-8 h-8 !text-text-secondary" />
      <div className="text-sm text-text-tertiary">Login with Google</div>
    </div>
  )
}
