import { ParsedUrlQuery } from 'querystring'
import { GetServerSideProps, NextApiHandler } from 'next'
import { GetIronServerSideProps, NextIronHandler } from '@taggedweb/types/session'

/**
 * Add basic error handling and status, error.data to res if an error occurs.
 * @param handler A handler for api route.
 * @returns handlerWithErrorHandling
 */
export function withApiErrorHandling(handler: NextIronHandler | NextApiHandler) {
  return async function handlerWithErrorHandling(req, res) {
    try {
      await handler(req, res)
    } catch (error) {
      // eslint-disable-next-line
      console.dir(error)
      const { response } = error
      res.status(response?.status || 500).json(error.data)
    }
  }
}

/**
 * Add basic error handling and returns errorCode in props if an error occurs.
 * @param handler A handler for SSR
 * @returns handlerWithErrorHandling
 */
export function withSSRErrorHandling<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
>(handler: GetIronServerSideProps<P, Q> | GetServerSideProps<P, Q>) {
  return async function handlerWithErrorHandling(context) {
    try {
      return await handler(context)
    } catch (error) {
      const errorCode = error?.response?.status
      if (errorCode === 404) {
        return {
          notFound: true,
          props: null,
        }
      } else {
        return {
          props: {
            errorCode: errorCode ?? 503,
          },
        }
      }
    }
  }
}
