import { serverSideClient } from '@taggedweb/utils/client'
import { Asset } from '@taggedweb/types/asset'
import { getAccessToken } from '@taggedweb/utils/token'
import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for Service Creation. Might include Get all services in the future
 */
export default withSentry(
  withApiAuthRequired(async (req, res) => {
    if (req.method === 'POST') {
      const access = await getAccessToken(req)
      const { data } = await serverSideClient(req).post<Asset>('/assets/', req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }
  }),
)
