import { withSessionApi } from '@taggedweb/utils/session'
import { getAccessToken } from '@taggedweb/utils/token'
import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'

export default withSessionApi(async (req, res) => {
  if (req.method === 'GET') {
    const slug = req.query.slug
    const access = await getAccessToken(req.session)
    const config = access
      ? {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      : null

    const { data } = await clientWithRetries.get(`/solutions/related_assets/?slug=${slug}`, config)
    return res.json(data)
  }
})
