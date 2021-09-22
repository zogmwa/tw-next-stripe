import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { client } from '../utils/client'
import { useUserContext } from '../hooks/use-user'
import { Spinner } from '../components/spinner'

/**
 * This is a basic component that handles the callback from LinkedIn, after a login.
 */
export default function LoginWithLinkedin() {
  const { query, push } = useRouter()
  // created nonEmptyCheck because in the first render it might happen that query is empty
  // and we don't want to redirect user to /login in the first render itself
  const nonEmptyQuery = Object.keys(query).length > 0

  // code is the LinkedIn auth code extracted from the callback url GET args
  const { code, state } = query as { code: string; state: string }
  const { setToken } = useUserContext()

  useEffect(
    function redirectToLoginPageOnInvalidCode() {
      if (nonEmptyQuery && (!code || state !== process.env.LINKEDIN_OAUTH_STATE)) {
        push('/login')
      }
    },
    [nonEmptyQuery, code, state, push],
  )

  useEffect(
    function loginWithCode() {
      async function login() {
        if (code && state === process.env.LINKEDIN_OAUTH_STATE) {
          try {
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

            // Use LinkedIn auth token to get TaggedWeb access token and user
            const {
              data: { access_token, refresh_token },
            } = await client.post<{ access_token: string; refresh_token: string }>('/dj-rest-auth/linkedin/', {
              access_token: linkedin_access_token,
              code,
              client_id: process.env.LINKEDIN_CLIENT_ID,
            })
            setToken(access_token, refresh_token)

            // Redirect user to home page
            push('/')
          } catch (error) {
            const nonFieldErrors = error.response.data.non_field_errors
            // if any error redirect user to login page (preferably showing an appropriate error message)
            if (nonFieldErrors?.[0] === 'User is already registered with this e-mail address.') {
              // TODO: If the user is logged in, attempt to connect the LinkedIn account first
              // TODO: Using GET params to pass state between pages, find out if there is a better way, if-not, remove this todo comment
              push('/login?linkedInError=Your email already has an associated account. Login in via email/password first to be able to connect your LinkedIn account')
            } else {
              push('/login')
            }
          }
        }
      }
      login()
    },
    [code, state, push, setToken],
  )

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen space-y-4">
      <Spinner className="w-8 h-8 !text-text-secondary" />
      <div className="text-sm text-text-tertiary">Login with Linkedin</div>
    </div>
  )
}
