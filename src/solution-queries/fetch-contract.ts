import { SessionRequest } from '@taggedweb/types/session'
import { serverSideClient } from '../utils/client'
import { getAccessToken } from '../utils/token'

/**
 * Fetching solution bookings of booked_by user
 * @param req The req object provided by NextJs to api handler or getServerSideProps context
 * @param username: string, id(solution_booking_id): number | string
 * @returns Contracts list
 */
export async function fetchContract(req: SessionRequest, username, id) {
  const access = await getAccessToken(req)
  if (access) {
    let url = `/users/${username}/bookings/`
    if (id) url += `?id=${id}`
    const { data } = await serverSideClient(req).get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return data
  }
}
