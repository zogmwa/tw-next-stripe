import { SessionRequest } from '@taggedweb/types/session'
import { serverSideClient } from '../utils/client'
import { getAccessToken } from '../utils/token'

/**
 * Utility to fetch Asset/Service on Server Side. Can be used in Api route handler or getServerSideProps for service detail page.
 * @param req The req object provided by NextJs to api handler or getServerSideProps context
 * @param slug The slug for asset
 * @returns profileData
 */
export async function fetchServiceServer(req: SessionRequest, slug) {
  const access = await getAccessToken(req)
  if (access) {
    const { data } = await serverSideClient(req).get(`/assets/${slug}?asset__slug=${slug}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return data
  } else {
    const { data } = await serverSideClient(req).get(`/assets/${slug}?asset__slug=${slug}`)
    return data
  }
}
