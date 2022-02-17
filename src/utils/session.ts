// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { User } from '@taggedweb/types/user'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import { WithSessionApiHandler, WithSessionSSRHandler } from '@taggedweb/types/session'
import { withApiErrorHandling, withSSRErrorHandling } from './error-handling'

declare module 'iron-session' {
  interface IronSessionData {
    user?: User
    token?: { access: any; refresh: any; accessExp: any; refreshExp: any }
  }
}

const sessionDefaults = {
  ttl: 30 * 24 * 3600, // This means that users will remain logged in for 30 days.
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'taggedweb-iron-session',
}

/**
 * Adds session to reqest object and adds error handling for api handler.
 * @param handler ApiHandler
 * @returns wrappedHandler
 */
const withSessionApi: WithSessionApiHandler = (handler) =>
  withApiErrorHandling(withIronSessionApiRoute(handler, sessionDefaults))

/**
 * Adds session to request object in context and adds error handling for ssr handler.
 * @param handler SSRHandler
 * @returns wrappedHandler
 */
const withSessionSSR: WithSessionSSRHandler = (handler) => async (context) => {
  const result = await withSSRErrorHandling(withIronSessionSsr(handler, sessionDefaults))(context)
  const user = await context.req.session.user
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

export { withSessionApi, withSessionSSR }
