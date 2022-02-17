import { serverSideClientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for updating solution_booking's rating.
 */
export default withSentry(
  withApiAuthRequired(async (req, res) => {
    if (req.method === 'PATCH') {
      const { id } = req.query
      const access = await getAccessToken(req)
      const { data } = await serverSideClientWithRetries(req).patch(`/solution_bookings/${id}/`, req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })

      res.json(data)
    }
  }),
)
