import { client } from '../../../../utils/client'
import { withApiErrorHandling } from '../../../../utils/error-handling'

export default withApiErrorHandling(async (req, res) => {
  const search_query = req.query.search_query
  const { data } = await client.get(`/autocomplete-tags/?q=${search_query}`)
  res.json(data)
})
