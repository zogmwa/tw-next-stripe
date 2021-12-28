import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'

export default withApiAuthRequired(async (req, res) => {
  /**
   * API Route handler for updating solution_reviews.
   */
  if (req.method === 'PATCH') {
    const { id } = req.query
    const access = await getAccessToken(req.session)
    const { data } = await clientWithRetries.patch(`/solution_reviews/${id}/`, req.body, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json(data)
  }
  /**
   * API Route handler for deleting solution_reviews.
   */
  if (req.method === 'DELETE') {
    const { id } = req.query
    const access = await getAccessToken(req.session)
    const { data } = await clientWithRetries.delete(`/solution_reviews/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      data: req.body,
    })
    res.json(data)
  }
})
