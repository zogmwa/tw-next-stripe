import { withSessionApi } from '@tw/utils/session'
import { client } from '@tw/utils/client'
import { getAccessToken, setSessionTokens } from '@tw/utils/token'
import { User } from '@tw/types/user'

/**
 * API Route for connecting LinkedIn to current account. Logs in sets the tokens and the user in session.
 */
export default withSessionApi(async (req, res) => {
  const curr_access = await getAccessToken(req.session)
  const { access_token: linkedin_access_token, code } = req.body
  const { data } = await client.post<{ access_token: string; refresh_token: string; user: User }>(
    '/dj-rest-auth/linkedin/connect/',
    {
      access_token: linkedin_access_token,
      code,
      client_id: process.env.LINKEDIN_CLIENT_ID,
    },
    {
      headers: {
        Authorization: `Bearer ${curr_access}`,
      },
    },
  )
  const { access_token: access, refresh_token: refresh, user } = data
  await setSessionTokens(req.session, { access, refresh })
  req.session.set('user', user)
  await req.session.save()
  res.json({ ...user, authVerified: true })
})
