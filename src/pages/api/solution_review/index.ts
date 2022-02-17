import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { serverSideClientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for creating solution review.
 */
export default withSentry(
  withApiAuthRequired(async (req, res) => {
    if (req.method === 'POST') {
      const access = await getAccessToken(req)
      const { data } = await serverSideClientWithRetries(req).post('/solution_reviews/', req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
          'Access-Control-Allow-Headers': 'sentry-trace',
        },
      })
      res.json(data)
    }
  }),
)
