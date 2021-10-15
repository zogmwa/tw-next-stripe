import { withApiAuthRequired } from '../../../utils/auth-wrappers'
import { client } from '../../../utils/client'
import { getAccessToken } from '../../../utils/token'

export default withApiAuthRequired(async (req, res) => {
  /**
   * API Route handler for fetch asset voted questions.
   */
  if (req.method === 'GET') {
    const { param } = req.query
    const access = await getAccessToken(req.session)
    const { data } = await client.get(`/question_votes/?question__asset__slug=${param}`, {
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
    const access = await getAccessToken(req.session)
    const { status } = await client.delete(`/question_votes/${param}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.status(status).send({})
  }
})
