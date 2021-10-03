import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { client } from '../utils/client'
import { useUserContext } from '../hooks/use-user'
import { Spinner } from '../components/spinner'

/**
 * This is a component to handle the callback from Google for OAuth flow.
 */
export default function LoginWithGoogle() {
  const { push } = useRouter()

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
  const { setToken } = useUserContext()

  async function connectGoogleAccountToExistingTaggedWebAccount(google_access_token) {
    try {
      // Use Google access token to get TaggedWeb access token and Taggedweb user object
      const {
        data: { access_token, refresh_token },
      } = await client.post<{ access_token: string; refresh_token: string }>('/dj-rest-auth/google/connect/', {
        access_token: google_access_token,
        client_id: process.env.GOOGLE_CLIENT_ID,
      })
      setToken(access_token, refresh_token)

      toast.success('Login Successful and Google Account Connected')

      // Redirect user to home page on successfully connecting
      push('/')
    } catch (error) {
      push(`/login?googleError=${error.response.data.detail}`)
    }
  }

  useEffect(
    function redirectToLoginPageOnInvalidToken() {
      if (nonEmptyQuery && (!google_access_token || state !== process.env.GOOGLE_OAUTH_STATE)) {
        push('/login')
      }
    },
    [nonEmptyQuery, google_access_token, state, push],
  )

  useEffect(
    function loginWithGoogleAuthToken() {
      async function login() {
        if (google_access_token && state === process.env.GOOGLE_OAUTH_STATE) {
          try {
            // Use Google auth token to get TaggedWeb access token and user
            const {
              data: { access_token: tweb_access_token, refresh_token: tweb_refresh_token },
            } = await client.post<{ access_token: string; refresh_token: string }>('/dj-rest-auth/google/', {
              access_token: google_access_token,
              client_id: process.env.GOOGLE_CLIENT_ID,
            })
            setToken(tweb_access_token, tweb_refresh_token)

            toast.success('Login Successful')

            // Redirect user to home page
            push('/')
          } catch (error) {
            const nonFieldErrors = error.response.data.non_field_errors
            const taggedweb_access_token = localStorage.getItem(process.env.ACCESS_TOKEN_LOCAL_STORAGE_KEY)
            if (nonFieldErrors?.[0] === 'User is already registered with this e-mail address.') {
              // Everything is stored as a string in localStorage even nulls
              if (taggedweb_access_token !== 'null' && taggedweb_access_token !== null) {
                // If the Google login fails due to the email already existing attempt a Google connect (but the user should be logged in for this flow)
                connectGoogleAccountToExistingTaggedWebAccount(google_access_token)
              } else {
                push(
                  '/login?googleError=Your email already has an associated account. Login in via email/password first to be able to connect your Google account',
                )
              }
            } else {
              // If it isn't redirected to a page yet then it is likely an error case
              push('/login')
            }
          }
        }
      }
      login()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [google_access_token, state, push, setToken],
  )

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen space-y-4">
      <Spinner className="w-8 h-8 !text-text-secondary" />
      <div className="text-sm text-text-tertiary">Login with Google</div>
    </div>
  )
}
