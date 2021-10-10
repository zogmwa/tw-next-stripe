import { withSessionApi } from '../../../utils/session'
import { client } from '../../../utils/client'
import { Asset } from '../../../types/asset'
import { getAccessToken } from '../../../utils/token'

/**
 * API Route handler for Service Creation. Might include Get all services in the future
 */
export default withSessionApi(async (req, res) => {
  if (req.method === 'POST') {
    const access = await getAccessToken(req.session)
    const { data } = await client.post<Asset>('/assets/', req.body, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json(data)
  }
})
