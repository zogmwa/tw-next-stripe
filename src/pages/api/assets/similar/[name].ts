import { client } from '../../../../utils/client'
import { getAccessToken } from '../../../../utils/token'
import { withApiAuthRequired } from '../../../../utils/auth-wrappers'

/* API integration for fetch similar assets. */
export default withApiAuthRequired(async (req, res) => {
  const name = req.query.name
  const access = await getAccessToken(req.session)
  if (access) {
    const { data } = await client.get(`/assets/similar/?name=${name}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return res.json(data)
  } else {
    const { data } = await client.get(`/assets/similar/?name=${name}`)
    return res.json(data)
  }
})
