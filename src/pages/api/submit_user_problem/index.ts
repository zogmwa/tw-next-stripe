import { withSessionApi } from '@taggedweb/utils/session'
import { serverSideClientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for submitting user problems for which they are looking for solutions.
 */
export default withSentry(
  withSessionApi(async (req, res) => {
    if (req.method === 'POST') {
      const accessToken = await getAccessToken(req)
      let config = null
      if (accessToken) {
        config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      }
      const { data } = await serverSideClientWithRetries(req).post('/user_problems/', req.body, config)
      res.json(data)
    }
  }),
)
