import { withSessionApi } from '@taggedweb/utils/session'
import { getAccessToken } from '@taggedweb/utils/token'
import { serverSideClient } from '@taggedweb/utils/client'
import { withSentry } from '@sentry/nextjs'

/**
 * Logs the user out and revokes their refresh token previously stored in session.
 */
export default withSentry(
  withSessionApi(async (req, res) => {
    const user = req.session.get('user')
    if (user) {
      const access = await getAccessToken(req)
      if (access) {
        await serverSideClient(req).post(
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
  }),
)
