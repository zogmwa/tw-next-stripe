import { clientWithRetries } from '../../../../utils/clientWithRetries'
import { getAccessToken } from '../../../../utils/token'
import { withSessionApi } from '../../../../utils/session'

/* API integration for fetch similar assets. */
export default withSessionApi(async (req, res) => {
  const name = req.query.name
  const access = await getAccessToken(req.session)
  if (access) {
    const { data } = await clientWithRetries.get(`/assets/similar/?name=${name}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return res.json(data)
  } else {
    const { data } = await clientWithRetries.get(`/assets/similar/?name=${name}`)
    return res.json(data)
  }
})
