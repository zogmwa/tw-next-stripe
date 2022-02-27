import { withSessionApi } from '@taggedweb/utils/session'
import { serverSideClient } from '@taggedweb/utils/client'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for cancel subscription of third party customer.
 */
export default withSentry(
  withSessionApi(async (req, res) => {
    if (req.method === 'POST') {
      const access = await getAccessToken(req)
      const config = access
        ? {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        : null
      const { data } = await serverSideClient(req).post(
        '/third_party_customer_sessions/cancel_asset_subscription_by_third_party_partner/',
        req.body,
        config,
      )
      res.json(data)
    }
  }),
)
