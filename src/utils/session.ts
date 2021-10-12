// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { applySession } from 'next-iron-session'
import { WithSessionApiHandler, WithSessionSSRHandler } from '../types/session'
import { withApiErrorHandling, withSSRErrorHandling } from './error-handling'

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
 * @param handler ApiHandler
 * @returns wrappedHandler
 */
const withSessionApi: WithSessionApiHandler = (handler) => {
  return async function withIronSessionHandler(req, res) {
    await applySessionDefaults(req, res)
    await withApiErrorHandling(handler)(req, res)
  }
}

/**
 * Adds session to request object in context and adds error handling for ssr handler.
 * @param handler SSRHandler
 * @returns wrappedHandler
 */
const withSessionSSR: WithSessionSSRHandler = (handler) => {
  return async function withIronSessionHandler(context) {
    const req = context.req
    const res = context.res
    await applySessionDefaults(req, res)
    const result = await withSSRErrorHandling(handler)(context)
    const user = await context.req.session.get('user')
    if ((result as any).props) {
      return {
        ...result,
        props: {
          ...((result as any)?.props ?? {}),
          fallback: { ...((result as any)?.props?.fallback ?? {}), '/api/user': user ?? null },
        },
      }
    } else {
      return result
    }
  }
}

export { withSessionApi, withSessionSSR }
