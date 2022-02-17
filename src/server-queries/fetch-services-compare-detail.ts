import { SessionRequest } from '@taggedweb/types/session'
import { serverSideClient } from '../utils/client'
import { getAccessToken } from '../utils/token'

/**
 * Utility to fetch Asset/Services on Server Side. Can be used in Api route handler or getServerSideProps for services compare page.
 * @param req The req object provided by NextJs to api handler or getServerSideProps context
 * @param url The url for fetch services
 * @returns Services Data
 */
export async function fetchServicesDetailCompareServer(req: SessionRequest, url) {
  const access = await getAccessToken(req)
  if (access) {
    const { data } = await serverSideClient(req).get(`/assets/compare/${url}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return data
  } else {
    const { data } = await serverSideClient(req).get(`/assets/compare/${url}`)
    return data
  }
}
