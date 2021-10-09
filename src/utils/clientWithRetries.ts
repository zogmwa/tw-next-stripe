import axios from 'axios'
import axiosRetry from 'axios-retry'

const clientWithRetries = axios.create({
  baseURL: process.env.API_BASE_URL,
})

axiosRetry(clientWithRetries, { retries: 3, retryDelay: axiosRetry.exponentialDelay })
export { clientWithRetries }
