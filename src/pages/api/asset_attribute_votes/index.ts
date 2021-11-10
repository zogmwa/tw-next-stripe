import { clientWithRetries } from '@tw/utils/clientWithRetries'
import { getAccessToken } from '@tw/utils/token'
import { AttributeVote } from '@tw/types/attribute_vote'
import { withApiAuthRequired } from '@tw/utils/auth-wrappers'

/**
 * API Route handler for fetching asset_attribute_votes. Might include Get all services in the future
 */
export default withApiAuthRequired(async (req, res) => {
  if (req.method === 'POST') {
    const access = await getAccessToken(req.session)
    const { data } = await clientWithRetries.post<AttributeVote>('/asset_attribute_votes/', req.body, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json(data)
  } else {
    const access = await getAccessToken(req.session)
    const { data } = await clientWithRetries.get<AttributeVote>('/asset_attribute_votes/?is_upvote=true', {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json(data)
  }
})
