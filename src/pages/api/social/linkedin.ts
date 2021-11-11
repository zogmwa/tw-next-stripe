import { withSessionApi } from '@taggedweb/utils/session'
import { client } from '@taggedweb/utils/client'
import { setSessionTokens } from '@taggedweb/utils/token'
import { User } from '@taggedweb/types/user'

/**
 * API Route for LinkedIn Login. Logs in sets the tokens and the user in session.
 */
export default withSessionApi(async (req, res) => {
  const { access_token: linkedin_access_token, code } = req.body
  const { data } = await client.post<{ access_token: string; refresh_token: string; user: User }>(
    '/dj-rest-auth/linkedin/',
    {
      access_token: linkedin_access_token,
      code,
      client_id: process.env.LINKED_CLIENT_ID,
    },
  )
  const { access_token: access, refresh_token: refresh, user } = data
  await setSessionTokens(req.session, { access, refresh })
  req.session.set('user', user)
  await req.session.save()
  res.json({ ...user, authVerified: true })
})
