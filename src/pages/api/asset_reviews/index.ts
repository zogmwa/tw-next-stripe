import { withSessionApi } from '../../../utils/session'
import { client } from '../../../utils/client'
import { getAccessToken } from '../../../utils/token'
import { Asset } from '../../../types/asset'

/**
 * API Route handler for getting asset_review
 */
export default withSessionApi(async (req, res) => {
  const { asset } = req.query
  const access = await getAccessToken(req.session)
  const { data } = await client.get<Asset>(`/asset_reviews?asset=${asset}`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  })
  res.json(data)
})
