import { withSessionApi } from '@taggedweb/utils/session'
import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'

/**
 * API Route handler for submitting claim for an asset.
 */
export default withSessionApi(async (req, res) => {
  if (req.method === 'POST') {
    const access = await getAccessToken(req.session)
    const { data } = await clientWithRetries.post('/asset_claims/', req.body, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json(data)
  }
})
