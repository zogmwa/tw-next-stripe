import { client } from '../utils/client'
import { getAccessToken } from '../utils/token'

/**
 * Utility to fetch Solution list on Server Side. Can be used in Api route handler or getServerSideProps for solution list page.
 * @param session The session from req.session
 * @param sendUrl The sendUrl for search solution list
 * @returns Solution list data.
 */
export async function fetchSolutionList(session, sendUrl) {
  const access = await getAccessToken(session)
  if (access) {
    const { data } = await client.get(`/solutions${sendUrl}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return data
  } else {
    const { data } = await client.get(`/solutions${sendUrl}`)
    return data
  }
}
