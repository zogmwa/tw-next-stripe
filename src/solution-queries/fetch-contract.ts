import { client } from '../utils/client'
import { getAccessToken } from '../utils/token'

/**
 * Fetching solution bookings of booked_by user
 * @param session The session from req.session
 * @param username: string, id(solution_booking_id): number | string
 * @returns Contracts list
 */
export async function fetchContract(session, username, id) {
  const access = await getAccessToken(session)
  if (access) {
    let url = `/users/${username}/bookings/`
    if (id) url += `?id=${id}`
    const { data } = await client.get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return data
  }
}
