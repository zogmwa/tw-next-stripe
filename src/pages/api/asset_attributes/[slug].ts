import { withSessionApi } from '@taggedweb/utils/session'
import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSentry } from '@sentry/nextjs'

/**
 * API Route handler for fetch updated vote attributes list.
 */
export default withSentry(
  withSessionApi(async (req, res) => {
    if (req.method === 'GET') {
      const { slug } = req.query
      const access = await getAccessToken(req.session)
      if (access) {
        const { data } = await clientWithRetries.get(`/asset_attributes/?assets__slug=${slug}&asset__slug=${slug}`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        })
        res.json(data)
      } else {
        const { data } = await clientWithRetries.get(`/asset_attributes/?assets__slug=${slug}&asset__slug=${slug}`)
        res.json(data)
      }
    }
    if (req.method === 'POST') {
      const { slug } = req.query
      const access = await getAccessToken(req.session)
      const { data } = await clientWithRetries.post(`/assets/${slug}/link_attribute/`, req.body, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      res.json(data)
    }
  }),
)
