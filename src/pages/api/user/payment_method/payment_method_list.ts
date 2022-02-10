import { withSessionApi } from '@taggedweb/utils/session'
import { serverSideClient } from '@taggedweb/utils/client'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for get payment_methods of user.
 */
export default withSentry(
  withSessionApi(async (req, res) => {
    if (req.method === 'GET') {
      const { customer_id } = req.query
      const access = await getAccessToken(req)
      const config = access
        ? {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        : null
      const { data } = await serverSideClient(req).get(
        customer_id ? `/users/payment_methods?customer_id=${customer_id}` : '/users/payment_methods/',
        config,
      )
      res.json(data)
    }
  }),
)
