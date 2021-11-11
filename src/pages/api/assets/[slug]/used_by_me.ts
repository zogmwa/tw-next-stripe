import { withApiAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { getAccessToken } from '@taggedweb/utils/token'

/**
 * API Route handler for Toggling whether a service is used by user.
 */
export default withApiAuthRequired(async (req, res) => {
  if (req.method === 'POST') {
    const { slug, used_by_me } = req.query
    const access = await getAccessToken(req.session)
    // const { status } = await client.post<boolean>(`/assets/${slug}/used_by_me/?used_by_me=${usedByMeStatus}`)
    const { status } = await clientWithRetries.post<boolean>(
      `/assets/${slug}/used_by_me/?used_by_me=${used_by_me}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      },
    )
    res.status(status).send({})
  }
})
