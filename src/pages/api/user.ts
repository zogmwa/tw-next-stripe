import { withSessionApi } from '@tw/utils/session'
import { getAccessToken } from '@tw/utils/token'

/**
 * Get User from session if user is logged in else returns {authVerified: false}. Used by useUserContext to get user details.
 */
export default withSessionApi(async (req, res) => {
  const access = await getAccessToken(req.session)
  if (access) {
    const user = req.session.get('user')
    res.json({
      ...user,
      authVerified: true,
    })
  } else {
    res.json({
      authVerified: false,
    })
  }
})
