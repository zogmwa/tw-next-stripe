import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { withSentry } from '@sentry/nextjs'

export default withSentry(
  withApiAuthRequired(async (req, res) => {
    /**
     * API Route handler for answer the question.
     */
    if (req.method === 'PATCH') {
      const { param } = req.query
      const access = await getAccessToken(req.session)
      const { data } = await clientWithRetries.patch(`/questions/${param}/`, req.body, {
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
      const access = await getAccessToken(req.session)
      const { data } = await clientWithRetries.get(`/questions/?asset__slug=${param}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }
  }),
)
