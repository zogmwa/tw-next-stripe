import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'
import { serverSideClient } from '@taggedweb/utils/client'

export default withSentry(
  withApiAuthRequired(async (req, res) => {
    /**
     * API Route handler for fetch asset voted questions.
     */
    if (req.method === 'GET') {
      const { param } = req.query
      const access = await getAccessToken(req)
      const { data } = await serverSideClient(req).get(`/question_votes/?question__asset__slug=${param}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }
    /**
     * API Route handler for fetch asset down voted question.
     */
    if (req.method === 'DELETE') {
      const { param } = req.query
      const access = await getAccessToken(req)
      const { status } = await serverSideClient(req).delete(`/question_votes/${param}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.status(status).send({})
    }
  }),
)
