import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'

/**
 * API Route handler for bookmarking on a solution.
 */
export default withApiAuthRequired(async (req, res) => {
  if (req.method === 'GET') {
    const access = await getAccessToken(req.session)
    const { data } = await clientWithRetries.get('/solution_bookmarks/', {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json(data)
  }
  if (req.method === 'POST') {
    const access = await getAccessToken(req.session)
    const { data } = await clientWithRetries.post('/solution_bookmarks/', req.body, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json(data)
  }
})
