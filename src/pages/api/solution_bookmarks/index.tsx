import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { serverSideClientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for bookmarking on a solution.
 */
export default withSentry(
  withApiAuthRequired(async (req, res) => {
    if (req.method === 'GET') {
      const access = await getAccessToken(req)
      const { data } = await serverSideClientWithRetries(req).get('/solution_bookmarks/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }
    if (req.method === 'POST') {
      const access = await getAccessToken(req)
      const { data } = await serverSideClientWithRetries(req).post('/solution_bookmarks/', req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }
  }),
)
