import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for get has_payment_method field of user.
 */
export default withSentry(
  withApiAuthRequired(async (req, res) => {
    if (req.method === 'GET') {
      const access = await getAccessToken(req)
      const { data } = await clientWithRetries.get('/users/has_payment_method/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }
  }),
)
