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
        <NavBar className="fixed top-0 left-0 right-0 z-10" />
        <div className="w-full h-screen pt-12 overflow-auto">
          <Component {...pageProps} />
        </div>
      </UserProvider>
    </>
  )
}

export default CustomApp
