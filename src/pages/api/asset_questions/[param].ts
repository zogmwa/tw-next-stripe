import { getAccessToken } from '@taggedweb/utils/token'
import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { withSentry } from '@sentry/nextjs'
import { serverSideClient } from '@taggedweb/utils/client'

export default withSentry(
  withApiAuthRequired(async (req, res) => {
    /**
     * API Route handler for answer the question.
     */
    if (req.method === 'PATCH') {
      const { param } = req.query
      const access = await getAccessToken(req)
      const { data } = await serverSideClient(req).patch(`/questions/${param}/`, req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }

    /**
     * API Route handler for fetch questions.
     */
    if (req.method === 'GET') {
      const { param } = req.query
      const access = await getAccessToken(req)
      const { data } = await serverSideClient(req).get(`/questions/?asset__slug=${param}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }
  }),
)
