import { withSessionApi } from '@taggedweb/utils/session'
import { serverSideClient } from '@taggedweb/utils/client'
import { getAccessToken, setSessionTokens } from '@taggedweb/utils/token'
import { User } from '@taggedweb/types/user'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route for connecting LinkedIn to current account. Logs in sets the tokens and the user in session.
 */
export default withSentry(
  withSessionApi(async (req, res) => {
    const curr_access = await getAccessToken(req)
    const { access_token: linkedin_access_token, code } = req.body
    const { data } = await serverSideClient(req).post<{ access_token: string; refresh_token: string; user: User }>(
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
    req.session.user = user
    await req.session.save()
    res.json({ ...user, authVerified: true })
  }),
)
