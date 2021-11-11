import { withSessionApi } from '@taggedweb/utils/session'
import { client } from '@taggedweb/utils/client'
import { setSessionTokens } from '@taggedweb/utils/token'
import { User } from '@taggedweb/types/user'

/**
 * API Route for Signup. Logs the user with email and password and sets the tokens and the user in session.
 */
export default withSessionApi(async (req, res) => {
  const { email, password1, password2 } = req.body
  const { data } = await client.post<{ access_token: string; refresh_token: string; user: User }>(
    '/dj-rest-auth/registration/',
    {
      email,
      password1,
      password2,
    },
  )
  const { access_token: access, refresh_token: refresh, user } = data
  await setSessionTokens(req.session, { access, refresh })
  req.session.set('user', user)
  await req.session.save()
  res.json({ ...user, authVerified: true })
})
