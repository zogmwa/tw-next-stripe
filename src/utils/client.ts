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
      config.url.startsWith('/token/refresh') ||
      (config.method === 'get' && config.url.startsWith('/assets'))
    )
  ) {
    config.headers = {
      ...config.headers,
      Authorization: `${tokenType} ${accessToken}`,
    }
  } else if (
    config.url.startsWith('/dj-rest-auth/linkedin/connect') ||
    config.url.startsWith('/dj-rest-auth/google/connect')
  ) {
    // For social account connects we will require the user to be logged in first
    config.headers = {
      ...config.headers,
      Authorization: `${tokenType} ${accessToken}`,
    }
  }
  return config
})

createAuthRefreshInterceptor(client, async (failedResponse) => {
  const refreshToken = localStorage.getItem(process.env.REFRESH_TOKEN_LOCAL_STORAGE_KEY)
  const {
    data: { access, refresh },
  } = await axios.post<{ refresh: string; access: string }>(`${process.env.API_BASE_URL}/api/token/refresh/`, {
    refresh: refreshToken,
  })
  localStorage.setItem(process.env.ACCESS_TOKEN_LOCAL_STORAGE_KEY, access)
  localStorage.setItem(process.env.REFRESH_TOKEN_LOCAL_STORAGE_KEY, refresh)
  failedResponse.config.headers.Authorization = `Bearer ${access}`
  return Promise.resolve()
})

export { client }
