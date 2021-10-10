import { withSessionApi } from '../../../utils/session'
import { fetchServiceServer } from '../../../server-queries/fetch-service'

export default withSessionApi(async (req, res) => {
  const slug = req.query.slug
  const data = await fetchServiceServer(req.session, slug)
  res.json(data)
})
