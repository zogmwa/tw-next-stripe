import { clientWithRetries } from '../../../utils/clientWithRetries'
import { getAccessToken } from '../../../utils/token'
import { Asset } from '../../../types/asset'
import { withSessionApi } from '../../../utils/session'

export default withSessionApi(async (req, res) => {
  /**
   * API Route handler for getting asset_review
   */
  if (req.method === 'GET') {
    const { asset } = req.query
    const access = await getAccessToken(req.session)
    const config = access
      ? {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      : null
    const { data } = await clientWithRetries.get<Asset>(`/asset_reviews?asset=${asset}`, config)
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
})
