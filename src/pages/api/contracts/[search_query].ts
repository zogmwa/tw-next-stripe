import { withSessionApi } from '@taggedweb/utils/session'
import { getAccessToken } from '@taggedweb/utils/token'
import { serverSideClientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { withSentry } from '@sentry/nextjs'

export default withSentry(
  withSessionApi(async (req, res) => {
    const sendUrl = req.query.search_query
    const access = await getAccessToken(req)
    if (req.method === 'GET' && access) {
      const config = {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }

      const { data } = await serverSideClientWithRetries(req).get(`/users/bookings/?${sendUrl}`, config)
      return res.json(data)
    }
  }),
)
