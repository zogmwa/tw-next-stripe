import { withSessionApi } from '../../utils/session'
import { getAccessToken } from '../../utils/token'
import { client } from '../../utils/client'

/**
 * Logs the user out and revokes their refresh token previously stored in session.
 */
export default withSessionApi(async (req, res) => {
  const user = req.session.get('user')
  if (user) {
    const access = await getAccessToken(req.session)
    if (access) {
      await client.post(
        '/dj-rest-auth/logout/',
        {},
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      )
    }
    req.session.destroy()
    return res.json({ authVerified: false })
  } else {
    res.status(401)
  }
})
