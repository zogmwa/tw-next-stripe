import { withSessionApi } from '@taggedweb/utils/session'
import { client } from '@taggedweb/utils/client'
import { setSessionTokens } from '@taggedweb/utils/token'
import { User } from '@taggedweb/types/user'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route for Google Login. Logs in sets the tokens and the user in session.
 */
async function handler(req, res) {
  const { access_token: google_access_token } = req.body
  const { data } = await client.post<{ access_token: string; refresh_token: string; user: User }>(
    '/dj-rest-auth/google/',
    {
      access_token: google_access_token,
      client_id: process.env.GOOGLE_CLIENT_ID,
    },
  )
  const { access_token: access, refresh_token: refresh, user } = data
  await setSessionTokens(req.session, { access, refresh })
  req.session.set('user', user)
  await req.session.save()
  res.json({ ...user, authVerified: true })
}

export default withSentry(withSessionApi(handler))
