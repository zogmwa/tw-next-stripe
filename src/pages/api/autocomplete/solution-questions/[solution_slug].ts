import { client } from '@taggedweb/utils/client'
import { withApiErrorHandling } from '@taggedweb/utils/error-handling'
import { withSentry } from '@sentry/nextjs'

export default withSentry(
  withApiErrorHandling(async (req, res) => {
    const { solution_slug, search_query } = req.query
    const { data } = await client.get(
      `/autocomplete-solution-questions/?q=${search_query}&solution__slug=${solution_slug}`,
    )
    res.json(data)
  }),
)
