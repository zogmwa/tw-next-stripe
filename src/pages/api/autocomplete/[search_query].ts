import { client } from '@tw/utils/client'
import { withApiErrorHandling } from '@tw/utils/error-handling'

export default withApiErrorHandling(async (req, res) => {
  const search_query = req.query.search_query
  const { data } = await client.get(`/autocomplete-tags-and-assets/?q=${search_query}`)
  res.json(data)
})
