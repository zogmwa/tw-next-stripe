import axios from 'axios'
import ip from 'ip'
import requestIp from 'request-ip'

const client = axios.create({
  baseURL: process.env.API_BASE_URL,
})

/**
 * This is the alternate function to be used on server side in Api Handlers and getServerSideProps to pass client ip in X-Forwarded-For header to django backend.
 */
const serverSideClient = (req) => {
  const serverIp = ip.address()
  const clientIp = requestIp.getClientIp(req)
  // TODO: The clientIp returned right now might not be in the correct format for detection by django. This needs to be investigated
  // If it is not then using a 3rd party library to convert it to correct format may be the best solution. Look into https://github.com/joyent/node-ip6addr

  return axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
      'X-Forwarded-For': `${clientIp}, ${serverIp}`,
    },
  })
}

export { client, serverSideClient }
