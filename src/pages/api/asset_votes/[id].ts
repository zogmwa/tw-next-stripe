import { clientWithRetries } from '../../../utils/clientWithRetries'
import { getAccessToken } from '../../../utils/token'
import { withApiAuthRequired } from '../../../utils/auth-wrappers'

/**
 * API Route handler for deleting asset_votes.
 */
export default withApiAuthRequired(async (req, res) => {
  if (req.method === 'DELETE') {
    const { id } = req.query
    const access = await getAccessToken(req.session)
    const { data } = await clientWithRetries.delete(`/asset_votes/${id}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      data: req.body,
    })
    res.json(data)
  }
})
