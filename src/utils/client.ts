import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

const client = axios.create({
  baseURL: process.env.API_BASE_URL,
})

/**
 * Add token to request header
 */
client.interceptors.request.use((config) => {
  if (!/\/dj-rest-auth\//i.exec(config.url) && !/\/token\/refresh\//i.exec(config.url)) {
    const accessToken = localStorage.getItem(process.env.ACCESS_TOKEN_LOCAL_STORAGE_KEY)
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
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
