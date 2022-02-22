import { withSessionApi } from '@taggedweb/utils/session'
import { serverSideClient } from '@taggedweb/utils/client'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for creating question.
 */
export default withSentry(
  withSessionApi(async (req, res) => {
    if (req.method === 'POST') {
      const access = await getAccessToken(req)
      const { data } = await serverSideClient(req).post('/questions/', req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }
  }),
)
