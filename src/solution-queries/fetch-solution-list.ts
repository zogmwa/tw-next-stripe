import { SessionRequest } from '@taggedweb/types/session'
import { serverSideClient } from '../utils/client'
import { getAccessToken } from '../utils/token'

/**
 * Utility to fetch Solution list on Server Side. Can be used in Api route handler or getServerSideProps for solution list page.
 * @param req The req object provided by NextJs to api handler or getServerSideProps context
 * @param sendUrl The sendUrl for search solution list
 * @returns Solution list data.
 */
export async function fetchSolutionList(req: SessionRequest, sendUrl) {
  const access = await getAccessToken(req)
  if (access) {
    const { data } = await serverSideClient(req).get(`/solutions/${sendUrl}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return data
  } else {
    const { data } = await serverSideClient(req).get(`/solutions/${sendUrl}`)
    return data
  }
}
