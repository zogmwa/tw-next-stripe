import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { serverSideClient } from '@taggedweb/utils/client'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for Toggling whether a service is used by user.
 */
export default withSentry(
  withApiAuthRequired(async (req, res) => {
    if (req.method === 'POST') {
      const { slug, used_by_me } = req.query
      const access = await getAccessToken(req)
      // const { status } = await client.post<boolean>(`/assets/${slug}/used_by_me/?used_by_me=${usedByMeStatus}`)
      const { status } = await serverSideClient(req).post<boolean>(
        `/assets/${slug}/used_by_me/?used_by_me=${used_by_me}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      )
      res.status(status).send({})
    }
  }),
)
