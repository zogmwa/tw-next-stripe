import { client } from '@taggedweb/utils/client'
import { withApiErrorHandling } from '@taggedweb/utils/error-handling'
import { withSentry } from '@sentry/nextjs'

export default withSentry(
  withApiErrorHandling(async (req, res) => {
    const search_query = req.query.search_query
    const { data } = await client.get(`/autocomplete-tags-and-assets/?q=${search_query}`)
    res.json(data)
  }),
)
