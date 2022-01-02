import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for creating solution review.
 */
export default withSentry(
  withApiAuthRequired(async (req, res) => {
    if (req.method === 'POST') {
      const access = await getAccessToken(req.session)
      const { data } = await clientWithRetries.post('/solution_reviews/', req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
          'Access-Control-Allow-Headers': 'sentry-trace',
        },
      })
      res.json(data)
    }
  }),
)
