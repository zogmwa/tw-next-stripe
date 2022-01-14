import { serverSideClientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'
import { withSessionApi } from '@taggedweb/utils/session'
import { withSentry } from '@sentry/nextjs'

/* API integration for fetch similar assets. */
export default withSentry(
  withSessionApi(async (req, res) => {
    const slug = req.query.slug
    const access = await getAccessToken(req)
    if (access) {
      const { data } = await serverSideClientWithRetries(req).get(`/assets/similar/?slug=${slug}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      return res.json(data)
    } else {
      const { data } = await serverSideClientWithRetries(req).get(`/assets/similar/?slug=${slug}`)
      return res.json(data)
    }
  }),
)
