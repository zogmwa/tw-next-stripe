import { withSessionApi } from '@taggedweb/utils/session'
import { serverSideClientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for submitting claim for an asset.
 */
export default withSentry(
  withSessionApi(async (req, res) => {
    if (req.method === 'POST') {
      const access = await getAccessToken(req)
      const { data } = await serverSideClientWithRetries(req).post('/asset_claims/', req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }
  }),
)
