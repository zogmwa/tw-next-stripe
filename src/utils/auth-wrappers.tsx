import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { Spinner } from '@taggedweb/components/spinner'
import { GetIronServerSideProps } from '@taggedweb/types/session'
import { WithApiAuthRequired, WithPageAuthRequired, WithSSRAuthRequired } from '@taggedweb/types/auth-wrappers'
import { withSessionApi, withSessionSSR } from './session'
import { getAccessToken } from './token'

// Future implementations of this function might pass an extra argument 'authClient' to handler which would be an AxiosInstance with Authorization Header and refresh interceptor set.
/**
 * Wrapper for api Handler that returns new handler which returns 401 response if user is not logged in with custom message.
 * @param handler An Api Handler
 * @param config Configuration
 * @returns newApiHandler
 */
const withApiAuthRequired: WithApiAuthRequired = (handler, options = {}) => {
  const { message = 'You need to be loggedin to access this api.' } = options
  return withSessionApi(async (req, res) => {
    const access = await getAccessToken(req.session)
    if (access) {
      await handler(req, res)
    } else {
      res.status(401).send({ message })
    }
  })
}

/**
 * Wrapper for ssr Handler that returns new handler which returns redirects user to specified page with custom message if user is not logged in. Setting showMessage = false results in faster page load as it redirects on server side.
 * @param handler A getServerSideProps handler function
 * @param config Configuration
 * @returns newApiHandler
 */
const withSSRAuthRequired: WithSSRAuthRequired = (
  handler?: GetIronServerSideProps,
  options: { redirectTo?: string; message?: string; showMessage?: boolean } = {},
) => {
  let { redirectTo, message = 'You need to login to view this page.', showMessage = true } = options
  return withSessionSSR(async (context) => {
    if (!redirectTo) {
      redirectTo = `/login?next=${context.req.url}`
    }
    const access = await getAccessToken(context.req.session)
    if (access) {
      if (handler) {
        const result = await handler(context)
        return result
      } else {
        return {
          props: {},
        }
      }
    } else {
      if (showMessage) {
        return {
          props: {
            redirectTo,
            errorToast: message,
          },
        }
      } else {
        return {
          redirect: {
            destination: redirectTo,
            permanent: false,
          },
        }
      }
    }
  })
}

/**
 * Wrapper for Component that returns Component which returns redirects user to specified page with custom message if user is not logged in.
 * @param handler An Api Handler
 * @param config Configuration
 * @returns newApiHandler
 */
const withPageAuthRequired: WithPageAuthRequired = (Component, options = {}) => {
  let { redirectTo, message = 'You need to login to view this page.' } = options
  return function WrappedComponent(props): JSX.Element {
    const user = useUserContext()
    const router = useRouter()
    if (!redirectTo) {
      redirectTo = `/login?next=${router.asPath}`
    }

    useEffect(() => {
      if (!user.isLoggedIn()) {
        router.replace(redirectTo)
        toast.error(message)
      }
    }, [user, router])

    if (user.isLoading) {
      return (
        <div className="flex flex-col items-center justify-center w-screen h-screen space-y-4">
          <Spinner className="w-8 h-8 !text-text-secondary" />
          <div className="text-sm text-text-tertiary">Checking if you are logged in...</div>
        </div>
      )
    }
    if (user.isLoggedIn()) return <Component {...props} />

    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen space-y-4">
        <Spinner className="w-8 h-8 !text-text-secondary" />
        <div className="text-sm text-text-tertiary">Redirecting...</div>
      </div>
    )
  }
}

export { withApiAuthRequired, withSSRAuthRequired, withPageAuthRequired }
