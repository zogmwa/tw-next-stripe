import { withSessionApi } from '@taggedweb/utils/session'
import { getAccessToken } from '@taggedweb/utils/token'
import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'

export default withSessionApi(async (req, res) => {
  if (req.method === 'GET') {
    const id = req.query.id
    const access = await getAccessToken(req.session)
    const config = access
      ? {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      : null

    const { data } = await clientWithRetries.get(`/solutions/${id}/`, config)
    return res.json(data)
  }
})
