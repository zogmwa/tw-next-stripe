import { client } from '../../../utils/client'
import { getAccessToken } from '../../../utils/token'
import { withApiAuthRequired } from '../../../utils/auth-wrappers'

export default withApiAuthRequired(async (req, res) => {
  /**
   * API Route handler for answer the question.
   */
  if (req.method === 'PATCH') {
    const { param } = req.query
    const access = await getAccessToken(req.session)
    const { data } = await client.patch(`/questions/${param}/`, req.body, {
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
    const { data } = await client.get(`/questions/?asset__slug=${param}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json(data)
  }
})
