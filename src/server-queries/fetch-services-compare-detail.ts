import { clientWithRetries } from '../utils/clientWithRetries'

/**
 * Utility to fetch Asset/Services on Server Side. Can be used in Api route handler or getServerSideProps for services compare page.
 * @param url The url for fetch services
 * @returns Services Data
 */
export async function fetchServicesDetailCompareServer(url) {
  const { data } = await clientWithRetries.get(`/assets/compare/${url}`)
  return data
}
