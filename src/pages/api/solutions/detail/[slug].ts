import { withSessionApi } from '@taggedweb/utils/session'
import { getAccessToken } from '@taggedweb/utils/token'
import { serverSideClientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { withSentry } from '@sentry/nextjs'

export default withSentry(
  withSessionApi(async (req, res) => {
    if (req.method === 'GET') {
      const slug = req.query.slug
      const access = await getAccessToken(req)
      const config = access
        ? {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        : null

      const { data } = await serverSideClientWithRetries(req).get(`/solutions/${slug}/`, config)
      return res.json(data)
    }
  }),
)
