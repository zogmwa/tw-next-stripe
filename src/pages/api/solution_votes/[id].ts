import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for deleting solution_votes.
 */
export default withSentry(
  withApiAuthRequired(async (req, res) => {
    if (req.method === 'DELETE') {
      const { id } = req.query
      const access = await getAccessToken(req.session)
      const { data } = await clientWithRetries.delete(`/solution_votes/${id}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
        data: req.body,
      })
      res.json(data)
    }
  }),
)
