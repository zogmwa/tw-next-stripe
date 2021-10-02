import React from 'react'
import clsx from 'clsx'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/styles.css'
import { UserProvider } from '../hooks/use-user'
import { ProfileProvider } from '../hooks/use-profile'
import { NavBar } from '../components/nav-bar'

const queryClient = new QueryClient()

function CustomApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const renderNavBar = pathname !== '/login' && pathname !== '/signup'

  return (
    <>
      <Head>
        <title>TaggedWeb: Find Web Software, Services and Applications</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ProfileProvider>
            <div suppressHydrationWarning={true}>
              {renderNavBar ? <NavBar className="fixed top-0 left-0 right-0 z-10" /> : null}
              <div className={clsx('w-full h-screen overflow-auto', renderNavBar ? 'pt-14' : undefined)}>
                <Component {...pageProps} />
              </div>
              <Toaster
                toastOptions={{
                  className: 'text-sm !text-text-primary',
                }}
              />
            </div>
          </ProfileProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  )
}

export default CustomApp
