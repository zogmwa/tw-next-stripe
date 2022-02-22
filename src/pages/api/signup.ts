import { withSessionApi } from '@taggedweb/utils/session'
import { serverSideClient } from '@taggedweb/utils/client'
import { setSessionTokens } from '@taggedweb/utils/token'
import { User } from '@taggedweb/types/user'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route for Signup. Logs the user with email and password and sets the tokens and the user in session.
 */
export default withSentry(
  withSessionApi(async (req, res) => {
    const { first_name, last_name, email, password1, password2 } = req.body
    const { data } = await serverSideClient(req).post<{ access_token: string; refresh_token: string; user: User }>(
      '/dj-rest-auth/registration/',
      {
        first_name,
        last_name,
        email,
        password1,
        password2,
      },
    )
    const { access_token: access, refresh_token: refresh, user } = data
    await setSessionTokens(req.session, { access, refresh })
    req.session.user = user
    await req.session.save()
    res.json({ ...user, authVerified: true })
  }),
)
