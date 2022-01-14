import { withSessionApi } from '@taggedweb/utils/session'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'
import { serverSideClient } from '@taggedweb/utils/client'

/**
 * API Route handler for upvote question.
 */
export default withSentry(
  withSessionApi(async (req, res) => {
    if (req.method === 'POST') {
      const access = await getAccessToken(req)
      const { data } = await serverSideClient(req).post('/question_votes/', req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }
  }),
)
