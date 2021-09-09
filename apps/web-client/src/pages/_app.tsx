import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/styles.css'
import { UserProvider } from '../hooks/use-user'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Taggedweb</title>
      </Head>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  )
}

export default CustomApp
