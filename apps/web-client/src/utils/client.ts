import axios from 'axios'

export const client = axios.create({
  baseURL: process.env.API_BASE_URL,
})

client.interceptors.request.use((config) => {
  if (!/\/dj-rest-auth\//i.exec(config.url)) {
    const accessToken = localStorage.getItem(process.env.ACCESS_TOKEN)
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    }
  }
  return config
})
