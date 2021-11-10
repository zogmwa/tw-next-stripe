import { clientWithRetries } from '@tw/utils/clientWithRetries'
import { getAccessToken } from '@tw/utils/token'
import { withSessionApi } from '@tw/utils/session'

/* API integration for fetch similar assets. */
export default withSessionApi(async (req, res) => {
  const slug = req.query.slug
  const access = await getAccessToken(req.session)
  if (access) {
    const { data } = await clientWithRetries.get(`/assets/similar/?slug=${slug}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return res.json(data)
  } else {
    const { data } = await clientWithRetries.get(`/assets/similar/?slug=${slug}`)
    return res.json(data)
  }
})
