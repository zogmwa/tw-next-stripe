import { withSessionApi } from '../../../utils/session'
import { client } from '../../../utils/client'
import { getAccessToken } from '../../../utils/token'

/**
 * API Route handler for fetch updated vote attributes list.
 */
export default withSessionApi(async (req, res) => {
  if (req.method === 'GET') {
    const { slug } = req.query
    const access = await getAccessToken(req.session)
    const { data } = await client.get(`/asset_attributes/?assets__slug=${slug}&asset=${slug}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json(data)
  }
})
