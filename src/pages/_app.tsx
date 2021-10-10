import React from 'react'
import clsx from 'clsx'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import Router, { useRouter } from 'next/router'
import Error from 'next/error'
import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/styles.css'
import 'nprogress/nprogress.css'
import nProgress from 'nprogress'
import { SWRConfig } from 'swr'
import { UserProvider } from '../hooks/use-user'
import { NavBar } from '../components/nav-bar'
import { ToastWithDismiss } from '../components/toast-with-dismiss'
import { fetcher } from '../queries/fetchJson'

const queryClient = new QueryClient()

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

function CustomApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const router = useRouter()
  const renderNavBar = pathname !== '/login' && pathname !== '/signup'

  // fallback is added for SSR when using useSWR.
  // errorCode is used for returning error from SSR.
  const { fallback = {}, errorCode } = pageProps

  return (
    <>
      <Head>
        <title>TaggedWeb: Find Web Software, Services and Applications</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <SWRConfig value={{ fetcher, fallback }}>
          <UserProvider>
            <div suppressHydrationWarning={true}>
              {renderNavBar ? <NavBar className="fixed top-0 left-0 right-0 z-10" /> : null}
              <div className={clsx('w-full h-screen overflow-auto', renderNavBar ? 'pt-14' : undefined)}>
                {errorCode ? (
                  // if errorCode is in pageProps then show error page.
                  <Error statusCode={errorCode} key={router.asPath} />
                ) : (
                  <Component {...pageProps} key={router.asPath} />
                )}
              </div>
              <Toaster
                toastOptions={{
                  className: 'text-sm !text-text-primary',
                  duration: 2000,
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
