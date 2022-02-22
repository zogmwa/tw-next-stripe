import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { serverSideClient } from '@taggedweb/utils/client'
import { getAccessToken } from '@taggedweb/utils/token'
import { AttributeVote } from '@taggedweb/types/attribute_vote'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for deleting asset_attribute_votes.
 */
export default withSentry(
  withApiAuthRequired(async (req, res) => {
    if (req.method === 'DELETE') {
      const { id } = req.query
      const access = await getAccessToken(req)
      const { data } = await serverSideClient(req).delete<AttributeVote>(`/asset_attribute_votes/${id}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }
  }),
)
