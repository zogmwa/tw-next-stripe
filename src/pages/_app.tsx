import React, { useEffect } from 'react'
import clsx from 'clsx'
import { AppProps } from 'next/app'
import toast, { Toaster } from 'react-hot-toast'
import Router, { useRouter } from 'next/router'
import Error from 'next/error'
import { QueryClient, QueryClientProvider } from 'react-query'
import '@taggedweb/styles/styles.css'
import 'nprogress/nprogress.css'
import nProgress from 'nprogress'
import { SWRConfig } from 'swr'
import { FcInfo } from 'react-icons/fc'
import { MdOutlineError } from 'react-icons/md'
import { UserProvider } from '@taggedweb/hooks/use-user'
import { NavBar } from '@taggedweb/components/nav-bar'
import { Spinner } from '@taggedweb/components/spinner'
import { ToastWithDismiss } from '@taggedweb/components/toast-with-dismiss'
import { fetcher } from '@taggedweb/queries/fetchJson'
import { HomePageFooter } from '@taggedweb/components/homepage-footer-old'
import { topTags, TopSaasTags, TopSolutionTags } from '@taggedweb/utils/top-tags'
import * as ga from '@taggedweb/lib/ga'
import { FooterComponent } from '@taggedweb/components/footer'

const queryClient = new QueryClient()

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

const RedirectSpinner = () => (
  <div className="flex flex-col items-center justify-center w-screen h-screen space-y-4">
    <Spinner className="w-8 h-8 !text-text-secondary" />
    <div className="text-sm text-text-tertiary">Redirecting...</div>
  </div>
)

function CustomApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const router = useRouter()
  const renderNavBar = pathname !== '/login' && pathname !== '/signup'
  const renderFooter = pathname !== '/login' && pathname !== '/signup'
  const renderMainFooter = true

  // fallback is added for SSR when using useSWR.
  // errorCode is used for returning error from SSR.
  const { fallback = {}, errorCode, errorToast, redirectTo, ...restProps } = pageProps

  useEffect(() => {
    if (errorToast) {
      toast.error(errorToast)
    }
  }, [errorToast])

  useEffect(() => {
    if (redirectTo) {
      Router.push(redirectTo)
    }
  }, [redirectTo])

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SWRConfig value={{ fetcher, fallback }}>
          <UserProvider>
            <div suppressHydrationWarning={true}>
              {renderNavBar ? <NavBar className="fixed top-0 left-0 right-0 z-20" /> : null}
              <div className={clsx('w-full h-screen', renderNavBar ? 'pt-14' : undefined)}>
                {redirectTo ? (
                  <RedirectSpinner />
                ) : errorCode ? (
                  // if errorCode is in pageProps then show error page.
                  <Error statusCode={errorCode} key={router.asPath} />
                ) : (
                  <Component {...restProps} key={router.asPath} />
                )}
                {renderFooter ? (
                  renderMainFooter ? (
                    <FooterComponent topSaasTags={TopSaasTags} topSolutionTags={TopSolutionTags} />
                  ) : (
                    <HomePageFooter topTags={topTags} />
                  )
                ) : null}
              </div>
              <Toaster
                toastOptions={{
                  className: 'text-sm !text-text-primary',
                  duration: 2000,
                  error: {
                    icon: <MdOutlineError className="text-2xl text-red-600 " />,
                  },
                  custom: {
                    icon: <FcInfo className="text-2xl" />,
                  },
                }}
              >
                {ToastWithDismiss}
              </Toaster>
            </div>
          </UserProvider>
        </SWRConfig>
      </QueryClientProvider>
    </>
  )
}

export default CustomApp
