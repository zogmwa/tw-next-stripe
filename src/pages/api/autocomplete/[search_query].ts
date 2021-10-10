import { client } from '../../../utils/client'
import { withErrorHandling } from '../../../utils/handleApiError'

export default withErrorHandling(async (req, res) => {
  const search_query = req.query.search_query
  const { data } = await client.get(`/autocomplete-tags-and-assets/?q=${search_query}`)
  res.json(data)
})
