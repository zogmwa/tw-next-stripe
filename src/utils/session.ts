// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { applySession } from 'next-iron-session'
import { WithSessionApiHandler, WithSessionSSRHandler } from '../types/session'
import { withErrorHandling } from './handleApiError'

const applySessionDefaults = (req, res) => {
  return applySession(req, res, {
    ttl: 1 * 24 * 3600,
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'taggedweb-iron-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  })
}

/**
 * Adds session to reqest object and adds error handling for api handler.
 */
const withSessionApi: WithSessionApiHandler = (handler) => {
  return async function withIronSessionHandler(req, res) {
    await applySessionDefaults(req, res)
    await withErrorHandling(handler)(req, res)
  }
}

const withSessionSSR: WithSessionSSRHandler = (handler) => {
  return async function withIronSessionHandler(context) {
    const req = context.req
    const res = context.res
    await applySessionDefaults(req, res)
    return handler(context)
  }
}

export { withSessionApi, withSessionSSR }
