import { clientWithRetries } from '../utils/clientWithRetries'

/**
 * Utility to fetch Asset/Service on Server Side. Can be used in Api route handler or getServerSideProps for service detail page.
 * @param session The session from req.session
 * @param slug The slug for asset
 * @returns profileData
 */
export async function fetchServicesDetailCompareServer(url) {
  const { data } = await clientWithRetries.get(`/assets/compare/${url}`)
  return data
}
