import { withSessionApi } from '@taggedweb/utils/session'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'

/**
 * Get User from session if user is logged in else returns {authVerified: false}. Used by useUserContext to get user details.
 */
export default withSentry(
  withSessionApi(async (req, res) => {
    const access = await getAccessToken(req)
    if (access) {
      const user = req.session.user
      res.json({
        ...user,
        authVerified: true,
      })
    } else {
      res.json({
        authVerified: false,
      })
    }
  }),
)
