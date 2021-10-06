import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

const client = axios.create({
  baseURL: process.env.API_BASE_URL,
})

/**
 * Add token to request header
 */
client.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(process.env.ACCESS_TOKEN_LOCAL_STORAGE_KEY)
  const tokenType = 'Bearer'

  // We don't want to send tokens in the headers for certain endpoints
  if (
    !(
      config.url.startsWith('/dj-rest-auth') ||
      config.url.startsWith('/api/token/refresh') ||
      (config.method === 'get' && config.url.startsWith('/asset_reviews'))
    )
  ) {
    config.headers = {
      ...config.headers,
      Authorization: `${tokenType} ${accessToken}`,
    }
  } else if (
    config.url.startsWith('/dj-rest-auth/linkedin/connect') ||
    config.url.startsWith('/dj-rest-auth/google/connect') ||
    config.url.startsWith('/dj-rest-auth/user/') ||
    config.url.startsWith('/dj-rest-auth/logout/')
  ) {
    // For social account connects we will require the user to be logged in first
    // For fetching user detail also we will require the user to be logged in
    config.headers = {
      ...config.headers,
      Authorization: `${tokenType} ${accessToken}`,
    }
  }
  return config
})

// Uncomment below code for logging all responses success/error for all requests. Might be useful for debugging
// client.interceptors.response.use(
//   function (response) {
//     console.log('Request Success', response)
//     return response
//   },
//   function (error) {
//     console.log('Request Error', error)
//     return Promise.reject(error)
//   },
// )

createAuthRefreshInterceptor(client, async (failedResponse) => {
  const refreshToken = localStorage.getItem(process.env.REFRESH_TOKEN_LOCAL_STORAGE_KEY)
  const {
    data: { access },
  } = await axios.post<{ access: string }>(`${process.env.API_BASE_URL}/api/token/refresh/`, {
    refresh: refreshToken,
  })
  localStorage.setItem(process.env.ACCESS_TOKEN_LOCAL_STORAGE_KEY, access)
  failedResponse.config.headers.Authorization = `Bearer ${access}`
  return Promise.resolve()
})

export { client }

export const noAuthClient = axios.create({
  baseURL: process.env.API_BASE_URL,
})
