import axios, { AxiosResponse } from 'axios'
import toast from 'react-hot-toast'

export const client = axios.create({
  baseURL: process.env.API_BASE_URL,
})

/**
 * Add token to request header
 */
client.interceptors.request.use((config) => {
  if (!/\/dj-rest-auth\//i.exec(config.url)) {
    const accessToken = localStorage.getItem(process.env.ACCESS_TOKEN_LOCAL_STORAGE_KEY)
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    }
  }
  return config
})

/**
 * Redirect user to login page if the token is not valid
 */
client.interceptors.response.use(undefined, function onError(error) {
  const response = error.response as AxiosResponse
  const { status } = response

  if (status === 401) {
    toast.error('You are not authorized to perform this action.')
    window.location.replace('/login')
  }
  return Promise.reject(error)
})
