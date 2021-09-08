import React, { useEffect } from 'react'
import { Spinner } from '@taggedweb/ui'
import { useRouter } from 'next/router'
import { client } from '../utils/client'

export default function LoginWithLinkedin() {
  const { query, push } = useRouter()
  const { code, state } = query as { code: string; state: string }

  useEffect(
    function redirectToLoginPageOnInvalidCode() {
      if (!code || state !== process.env.LINKEDIN_OAUTH_STATE) {
        push('/login')
      }
    },
    [code, state, push],
  )

  useEffect(
    function loginWithCode() {
      if (code && state === process.env.LINKEDIN_OAUTH_STATE) {
        const redirectUrl =
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/login-with-linkedin'
            : 'https://taggedweb.com/login-with-linkedin'
        // get linkedin access token
        client
          .get<{ access_token: string }>(
            `/tweb-auth/linkedin/authtoken-from-code?code=${code}&redirect_uri=${redirectUrl}`,
          )
          .then(({ data }) => {
            const { access_token: linkedin_access_token } = data
            // get taggedweb access token
            return client.post<{ access_token: string; refresh_token: string }>('/dj-rest-auth/linkedin/', {
              access_token: linkedin_access_token,
              code,
              client_id: process.env.LINKEDIN_CLIENT_ID,
            })
          })
          .then(({ data }) => {
            const { access_token, refresh_token } = data
            window.localStorage.setItem(process.env.ACCESS_TOKEN_LOCAL_STORAGE_KEY, access_token)
            window.localStorage.setItem(process.env.REFRESH_TOKEN_LOCAL_STORAGE_KEY, refresh_token)
            push('/')
          })
          .catch(() => {
            push('/login')
          })
      }
    },
    [code, state, push],
  )

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen space-y-4">
      <Spinner className="w-8 h-8 !text-text-secondary" />
      <div className="text-sm text-text-tertiary">Login with Linkedin</div>
    </div>
  )
}
