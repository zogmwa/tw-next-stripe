import { NextApiHandler } from 'next'
import { NextIronHandler } from '../types/session'

/**
 * Add basic error handling and status, error.data to res if an error occurs.
 * @param handler A handler for api route.
 * @returns handlerWithErrorHandling
 */
export function withErrorHandling(handler: NextIronHandler | NextApiHandler) {
  return async function handlerWithErrorHandling(req, res) {
    try {
      await handler(req, res)
    } catch (error) {
      const { response } = error
      res.status(response?.status || 500).json(error.data)
    }
  }
}
