import { SessionRequest } from '@taggedweb/types/session'
import { serverSideClient } from '../utils/client'
import { getAccessToken } from '../utils/token'

/**
 * Utility to fetch Solution detail on Server Side. Can be used in Api route handler or getServerSideProps for solution detail page.
 * @param req The req object provided by NextJs to api handler or getServerSideProps context
 * @param slug The slug for solution
 * @returns Solution detail data.
 */
export async function fetchSolutionDetail(req: SessionRequest, slug) {
  const access = await getAccessToken(req)
  if (access) {
    const { data } = await serverSideClient(req).get(`/solutions/${slug}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return data
  } else {
    const { data } = await serverSideClient(req).get(`/solutions/${slug}/`)
    return data
  }
}
