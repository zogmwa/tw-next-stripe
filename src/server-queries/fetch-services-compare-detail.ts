import { client } from '../utils/client'
import { getAccessToken } from '../utils/token'

/**
 * Utility to fetch Asset/Services on Server Side. Can be used in Api route handler or getServerSideProps for services compare page.
 * @param url The url for fetch services
 * @returns Services Data
 */
export async function fetchServicesDetailCompareServer(session, url) {
  const access = await getAccessToken(session)
  if (access) {
    const { data } = await client.get(`/assets/compare/${url}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return data
  } else {
    const { data } = await client.get(`/assets/compare/${url}`)
    return data
  }
}
