import { withApiAuthRequired } from '@tw/utils/auth-wrappers'
import { clientWithRetries } from '@tw/utils/clientWithRetries'
import { getAccessToken } from '@tw/utils/token'

/**
 * API Route handler for upvoting on an asset.
 */
export default withApiAuthRequired(async (req, res) => {
  if (req.method === 'POST') {
    const access = await getAccessToken(req.session)
    const { data } = await clientWithRetries.post('/asset_votes/', req.body, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json(data)
  }
})
