import { withApiAuthRequired } from '../../../utils/auth-wrappers'
import { client } from '../../../utils/client'
import { getAccessToken } from '../../../utils/token'

/**
 * API Route handler for upvoting on an asset.
 */
export default withApiAuthRequired(async (req, res) => {
  if (req.method === 'POST') {
    const access = await getAccessToken(req.session)
    const { data } = await client.post('/asset_votes/', req.body, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json(data)
  }
})
