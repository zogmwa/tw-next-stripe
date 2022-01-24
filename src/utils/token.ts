import * as Sentry from '@sentry/nextjs'
import { SessionRequest } from '@taggedweb/types/session'
import { IronSession } from 'iron-session'
import { serverSideClient } from './client'

function atob(b64Encoded) {
  return Buffer.from(b64Encoded, 'base64').toString()
}

/**
 * Utitlity to parse a JWT token
 * @param token
 * @returns parsedToken
 */
export function parseJwt(token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )
  return JSON.parse(jsonPayload)
}

/**
 * Takes session and tokens as parameters and set the tokens for the current user. Should not be used outside of signIn our signUp pages.
 * @param session
 * @param tokens
 */
export const setSessionTokens = async (session: IronSession, { access, refresh }): Promise<void> => {
  const decodedAccessToken = parseJwt(access)
  const decodedRefreshToken = parseJwt(refresh)

  const { exp: accessExp } = decodedAccessToken
  const { exp: refreshExp } = decodedRefreshToken
  session.token = { access, refresh, accessExp, refreshExp }
  await session.save()
}

/**
 * This will return the acces token from the session after validating if user is logged in. If access token cannot be fetched then it will logout the user silently.
 *
 * @param session
 * @returns access_token
 */
export const getAccessToken = async (req: SessionRequest): Promise<string | void> => {
  const session = req.session
  try {
    const user = session.user
    if (!user) return null

    const { access, refresh, accessExp, refreshExp } = session.token ?? {}
    if (!access && !refresh) {
      throw new Error('Tokens not in session')
    }
    if (!accessExp) {
      throw new Error('Access token expiration information not available')
    }
    if (!refresh && accessExp * 1000 - 60000 < Date.now()) {
      throw new Error('Access token expired and refresh token not available')
    }
    if (refreshExp * 1000 - 60000 < Date.now() && accessExp * 1000 - 60000 < Date.now()) {
      throw new Error('Access token and Refresh token both expired')
    }
    if (refresh && accessExp * 1000 - 60000 < Date.now()) {
      const {
        data: { access: newAccess },
      } = await serverSideClient(req).post<{ access: string }>(`${process.env.API_BASE_URL}/api/token/refresh/`, {
        refresh,
      })
      await setSessionTokens(session, { access: newAccess, refresh })
    }
  } catch (error) {
    Sentry.captureException(error)
    // eslint-disable-next-line
    delete session.user
    delete session.token
    await session.save()
  }

  return session?.token?.access || null
}
