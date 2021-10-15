import { withSessionApi } from '../../../utils/session'
import { clientWithRetries } from '../../../utils/clientWithRetries'
import { getAccessToken } from '../../../utils/token'

/**
 * API Route handler for upvote question.
 */
export default withSessionApi(async (req, res) => {
  if (req.method === 'POST') {
    const access = await getAccessToken(req.session)
    const { data } = await clientWithRetries.post('/question_votes/', req.body, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json(data)
  }
})
