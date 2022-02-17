import axios from 'axios'
import axiosRetry from 'axios-retry'
import { serverSideClient } from '@taggedweb/utils/client'

const clientWithRetries = axios.create({
  baseURL: process.env.API_BASE_URL,
})

axiosRetry(clientWithRetries, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) =>
    !(error.response.status > 499 && error.response.status < 503) ||
    (error.response.status > 504 && error.response.status < 509) ||
    error.response.status === 510 ||
    error.response.status === 511,
})

const serverSideClientWithRetries = (req) => {
  const client = serverSideClient(req)
  axiosRetry(client, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) =>
      !(error.response.status > 499 && error.response.status < 503) ||
      (error.response.status > 504 && error.response.status < 509) ||
      error.response.status === 510 ||
      error.response.status === 511,
  })

  return client
}
export { clientWithRetries, serverSideClientWithRetries }
