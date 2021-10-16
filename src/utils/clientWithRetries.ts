import axios from 'axios'
import axiosRetry from 'axios-retry'

const clientWithRetries = axios.create({
  baseURL: process.env.API_BASE_URL,
})

axiosRetry(clientWithRetries, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) =>
    !(499 < error.response.status && error.response.status < 503) ||
    (504 < error.response.status && error.response.status < 509) ||
    error.response.status === 510 ||
    error.response.status === 511,
})
export { clientWithRetries }
