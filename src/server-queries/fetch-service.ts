import { client } from '../utils/client'
import { getAccessToken } from '../utils/token'

/**
 * Utility to fetch Asset/Service on Server Side. Can be used in Api route handler or getServerSideProps for service detail page.
 * @param session The session from req.session
 * @param slug The slug for asset
 * @returns profileData
 */
export async function fetchServiceServer(session, slug) {
  const access = await getAccessToken(session)
  if (access) {
    const { data } = await client.get(`/assets/${slug}?asset=${slug}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return data
  } else {
    const { data } = await client.get(`/assets/${slug}?asset=${slug}`)
    return data
  }
}
