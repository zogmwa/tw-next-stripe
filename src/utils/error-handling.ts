import { ParsedUrlQuery } from 'querystring'
import { GetServerSideProps, NextApiHandler, GetServerSidePropsResult, GetServerSidePropsContext } from 'next'
import * as Sentry from '@sentry/nextjs'
/**
 * Add basic error handling and status, error.data to res if an error occurs.
 * @param handler A handler for api route.
 * @returns handlerWithErrorHandling
 */
export function withApiErrorHandling(handler: NextApiHandler): NextApiHandler {
  return async function handlerWithErrorHandling(req, res) {
    try {
      await handler(req, res)
    } catch (error) {
      Sentry.captureException(error)
      // eslint-disable-next-line
      console.dir(error)
      const { response } = error
      // Previously data from axios errors occuring on api handler functions were not forwarded to the frontend calls to api handler routes.
      res.status(response?.status || 500).json(error.data || response?.data)
    }
  }
}

/**
 * Add basic error handling and returns errorCode in props if an error occurs.
 * @param handler A handler for SSR
 * @returns handlerWithErrorHandling
 */
export function withSSRErrorHandling<
  P extends { errorCode?: Number; [key: string]: any } = { errorCode?: Number; [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
>(handler: GetServerSideProps<P, Q>) {
  return async function handlerWithErrorHandling(
    context: GetServerSidePropsContext<Q>,
  ): Promise<GetServerSidePropsResult<P>> {
    try {
      return await handler(context)
    } catch (error) {
      Sentry.captureException(error)
      const errorCode = error?.response?.status
      if (errorCode === 404) {
        return {
          notFound: true,
        }
      } else {
        return {
          props: {
            errorCode: errorCode ?? 503,
          } as P,
        }
      }
    }
  }
}
