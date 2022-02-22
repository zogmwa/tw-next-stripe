import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'

/**
 *
 */
export default withSentry(
  withApiAuthRequired(async (req, res) => {
    if (req.method === 'POST') {
      const access = await getAccessToken(req)
      const { data } = await clientWithRetries.post('/users/pause_or_resume_contract/', req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }
  }),
)
