import { client } from '../../../utils/client'
import { getAccessToken } from '../../../utils/token'
import { AttributeVote } from '../../../types/attribute_vote'
import { withApiAuthRequired } from '../../../utils/auth-wrappers'

/**
 * API Route handler for fetching asset_attribute_votes. Might include Get all services in the future
 */
export default withApiAuthRequired(async (req, res) => {
  if (req.method === 'POST') {
    const access = await getAccessToken(req.session)
    const { data } = await client.post<AttributeVote>('/asset_attribute_votes/', req.body, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json(data)
  } else {
    const access = await getAccessToken(req.session)
    const { data } = await client.get<AttributeVote>('/asset_attribute_votes/', {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json(data)
  }
})
