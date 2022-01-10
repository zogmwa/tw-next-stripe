import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for deleting solution_votes.
 */
export default withSentry(
  withApiAuthRequired(async (req, res) => {
    if (req.method === 'POST') {
      const { r } = req.query
      const { id } = req.query
      const access = await getAccessToken(req.session)
      let url = `/solution-price-checkout/${id}`
      if (r) url += `?r=${r}`
      const { data } = await clientWithRetries.post(url, req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }
  }),
)
