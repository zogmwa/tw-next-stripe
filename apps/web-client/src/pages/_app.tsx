import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/styles.css'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Taggedweb</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default CustomApp
