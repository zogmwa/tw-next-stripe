import { client } from '../utils/client'
import { getAccessToken } from '../utils/token'

/**
 * Utility to fetch Solution detail on Server Side. Can be used in Api route handler or getServerSideProps for solution detail page.
 * @param session The session from req.session
 * @param id The id for solution
 * @returns profileData
 */
export async function fetchSolutionDetail(session, slug) {
  const access = await getAccessToken(session)
  if (access) {
    const { data } = await client.get(`/solutions/${slug}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return data
  } else {
    const { data } = await client.get(`/solutions/${slug}/`)
    return data
  }
}
