import { client } from '@taggedweb/utils/client'
import { withApiErrorHandling } from '@taggedweb/utils/error-handling'

export default withApiErrorHandling(async (req, res) => {
  const { solution_slug, search_query } = req.query
  const { data } = await client.get(
    `/autocomplete-solution-questions/?q=${search_query}&solution__slug=${solution_slug}`,
  )
  res.json(data)
})
