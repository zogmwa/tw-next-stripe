import { withSessionApi } from '@taggedweb/utils/session'
import { fetchServiceServer } from '@taggedweb/server-queries/fetch-service'
import { getAccessToken } from '@taggedweb/utils/token'
import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'

export default withSessionApi(async (req, res) => {
  if (req.method === 'GET') {
    const slug = req.query.slug
    const data = await fetchServiceServer(req.session, slug)
    return res.json(data)
  }
  if (req.method === 'PATCH') {
    const access = await getAccessToken(req.session)
    if (access) {
      const slug = req.query.slug
      const { data } = await clientWithRetries.patch(`/assets/${slug}/`, req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      return res.json(data)
    } else {
      return res.status(401).send({ message: 'You need to be loggedin to access this api.' })
    }
  }
})
