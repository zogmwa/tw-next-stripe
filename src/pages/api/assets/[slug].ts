import { withSessionApi } from '../../../utils/session'
import { fetchServiceServer } from '../../../server-queries/fetch-service'
import { getAccessToken } from '../../../utils/token'
import { clientWithRetries } from '../../../utils/clientWithRetries'

export default withSessionApi(async (req, res) => {
  if (req.method == 'GET') {
    const slug = req.query.slug
    const data = await fetchServiceServer(req.session, slug)
    return res.json(data)
  }
  if (req.method == 'PATCH') {
    const access = await getAccessToken(req.session)
    if (access) {
      const slug = req.query.slug
      const data = await clientWithRetries.patch(`/assets/${slug}/`, req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      console.log('----------data:------------', data)
      return res.json(data)
    } else {
      return res.status(401).send({ message: 'You need to be loggedin to access this api.' })
    }
  }
})
