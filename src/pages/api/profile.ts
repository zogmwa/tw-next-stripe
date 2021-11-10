import { withSessionApi } from '@tw/utils/session'
import { client } from '@tw/utils/client'
import { getAccessToken } from '@tw/utils/token'
import { Profile } from '@tw/types/profile'

/**
 * API route for profile fetching for current user. If user is not loggedin then returns 401 repsonse
 */
export default withSessionApi(async (req, res) => {
  const access = await getAccessToken(req.session)
  if (access) {
    const user = req.session.get('user')
    const { data } = await client.get<Profile>(`/users/${user.username}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    res.json({ ...data, profileFetched: true })
  } else {
    res.status(401).json({ profileFetched: false })
  }
})
