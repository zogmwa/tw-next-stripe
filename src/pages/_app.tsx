import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import '../styles/styles.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserProvider } from '../hooks/use-user'
import { NavBar } from '../components/nav-bar'

const queryClient = new QueryClient()

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TaggedWeb: Find Web Software, Services and Applications</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <div suppressHydrationWarning={true}>
            <NavBar className="fixed top-0 left-0 right-0 z-10" />
            <div className="w-full h-screen overflow-auto pt-14">
              <Component {...pageProps} />
            </div>
            <Toaster
              toastOptions={{
                className: 'text-sm !text-text-primary',
              }}
            />
          </div>
        </UserProvider>
      </QueryClientProvider>
    </>
  )
}

export default CustomApp
