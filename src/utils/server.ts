import axios from 'axios'
import axiosRetry from 'axios-retry'

const server = axios.create({
  baseURL: process.env.API_BASE_URL,
})

axiosRetry(server, { retries: 3, retryDelay: axiosRetry.exponentialDelay })
export { server }
