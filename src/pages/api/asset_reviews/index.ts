import { clientWithRetries } from '../../../utils/clientWithRetries'
import { getAccessToken } from '../../../utils/token'
import { Asset } from '../../../types/asset'
import { withSessionApi } from '../../../utils/session'

/**
 * API Route handler for getting asset_review
 */
export default withSessionApi(async (req, res) => {
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
})
