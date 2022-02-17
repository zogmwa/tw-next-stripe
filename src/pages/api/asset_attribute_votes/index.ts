import { serverSideClientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { AttributeVote } from '@taggedweb/types/attribute_vote'
import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for fetching asset_attribute_votes. Might include Get all services in the future
 */
export default withSentry(
  withApiAuthRequired(async (req, res) => {
    if (req.method === 'POST') {
      const access = await getAccessToken(req)
      const { data } = await serverSideClientWithRetries(req).post<AttributeVote>('/asset_attribute_votes/', req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    } else {
      const access = await getAccessToken(req)
      const { data } = await serverSideClientWithRetries(req).get<AttributeVote>(
        '/asset_attribute_votes/?is_upvote=true',
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      )
      res.json(data)
    }
  }),
)
