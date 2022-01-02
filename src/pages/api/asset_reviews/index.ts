import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { Asset } from '@taggedweb/types/asset'
import { withSessionApi } from '@taggedweb/utils/session'
import { withSentry } from '@sentry/nextjs'

export default withSentry(
  withSessionApi(async (req, res) => {
    /**
     * API Route handler for getting asset_review
     */
    if (req.method === 'GET') {
      const { asset__slug } = req.query
      const access = await getAccessToken(req.session)
      const config = access
        ? {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        : null
      const { data } = await clientWithRetries.get<Asset>(`/asset_reviews?asset__slug=${asset__slug}`, config)
      res.json(data)
    }
    /**
     * API Route handler for adding asset_review
     */
    if (req.method === 'POST') {
      const access = await getAccessToken(req.session)
      const { data } = await clientWithRetries.post('/asset_reviews/', req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }
  }),
)
