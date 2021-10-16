import { withApiAuthRequired } from '../../../utils/auth-wrappers'
import { clientWithRetries } from '../../../utils/clientWithRetries'
import { getAccessToken } from '../../../utils/token'
import { AttributeVote } from '../../../types/attribute_vote'

/**
 * API Route handler for deleting asset_attribute_votes.
 */
export default withApiAuthRequired(async (req, res) => {
  if (req.method === 'DELETE') {
    const { id } = req.query
    const access = await getAccessToken(req.session)
    const { data } = await clientWithRetries.delete<AttributeVote>(`/asset_attribute_votes/${id}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json(data)
  }
})
