import { SessionRequest } from '@taggedweb/types/session'
import { serverSideClient } from '@taggedweb/utils/client'
import { getAccessToken } from '@taggedweb/utils/token'

/**
 * Fetching provider's solution bookings of point_of_contact user in solution
 * @param req The req object provided by NextJs to api handler or getServerSideProps context
 * @param username: string, id(solution_booking_id): number | string
 * @returns Contracts list
 */
export async function fetchProviderContract(req: SessionRequest, username, id) {
  const access = await getAccessToken(req)
  if (access) {
    let url = `/users/${username}/provider_bookings/`
    if (id) url += `?id=${id}`
    const { data } = await serverSideClient(req).get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return data
  }
}
