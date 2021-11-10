import { withSessionApi } from '@tw/utils/session'
import { client } from '@tw/utils/client'
import { setSessionTokens } from '@tw/utils/token'
import { User } from '@tw/types/user'

/**
 * API Route for login. Logs the user with email and password and sets the tokens and the user in session.
 */
export default withSessionApi(async (req, res) => {
  const { email, password } = req.body
  const { data } = await client.post<{ access_token: string; refresh_token: string; user: User }>(
    '/dj-rest-auth/login/',
    {
      email,
      password,
    },
  )
  const { access_token: access, refresh_token: refresh, user } = data
  await setSessionTokens(req.session, { access, refresh })
  req.session.set('user', user)
  await req.session.save()
  res.json({ ...user, authVerified: true })
})
