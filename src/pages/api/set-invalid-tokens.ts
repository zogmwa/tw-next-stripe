import { withSessionApi } from '@taggedweb/utils/session'
import { setSessionTokens } from '@taggedweb/utils/token'

// Add more tokens for testing.
const access_tokens = [
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMzODM1NzUyLCJqdGkiOiJiNGRiNzU5YTU4MjA0OTY2YTM2ZGQ0ZjIzYTgyYWJiYSIsInVzZXJfaWQiOjc2fQ.s-GxJYGVFMJobRny03csH0CAboYpjAZbcntb8puQHHI',
]

// Add more tokens for testing.
const refresh_tokens = [
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYzMzIzMTMxNywianRpIjoiYTdlOTFkMzczM2M2NDJjYmFiMTA4OWY1ZmZkN2Y4YzEiLCJ1c2VyX2lkIjo3Nn0.KI5AS4Q9eJ6vb_kIBcJncnM6gsbVcYV3rHfxEpTSGkc',
]

const chooseRandom = (array: Array<string>): any => {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * For testing in development only. This will set invalid tokens for the current user.
 * Remove this page when using app in production
 */
export default withSessionApi(async (req, res) => {
  const access = chooseRandom(access_tokens)
  const refresh = chooseRandom(refresh_tokens)

  await setSessionTokens(req.session, { access, refresh })
  return res.json({ message: 'Invalid tokens have been set.' })
})
