import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/styles.css'
import { UserProvider } from '../hooks/use-user'
import { NavBar } from '../components/nav-bar'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Taggedweb</title>
      </Head>
      <UserProvider>
        <div suppressHydrationWarning={true}>
          <NavBar className="fixed top-0 left-0 right-0 z-10" />
          <div className="w-full h-screen overflow-auto pt-14">
            <Component {...pageProps} />
          </div>
        </div>
      </UserProvider>
    </>
  )
}

export default CustomApp
