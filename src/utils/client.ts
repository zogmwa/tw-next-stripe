import axios from 'axios'

const client = axios.create({
  baseURL: process.env.API_BASE_URL,
})

/*
  Removed noAuthClient and interceptors for client because access_token and refresh_token are now not available on the client side.
*/

export { client }
