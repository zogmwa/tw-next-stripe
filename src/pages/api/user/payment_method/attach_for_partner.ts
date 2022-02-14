import { withSessionApi } from '@taggedweb/utils/session'
import { serverSideClient } from '@taggedweb/utils/client'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'

/**
 * Our Partner's customers could attach payment method.
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
      const { data } = await serverSideClient(req).post('/users/attach_card_for_partners/', req.body, config)
      return res.json(data)
    }
  }),
)
