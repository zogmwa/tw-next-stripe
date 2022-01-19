import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import Analytics from '@taggedweb/components/Analytics'
import Script from 'next/script'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
          {/* Global Site Tag (gtag.js) - Google Analytics and GTM */}
          <Analytics googleTagManager={process.env.googleTagManager} googleAnalytics={process.env.googleAnalytics} />
        </Head>
        <body>
          {/* <-- Google Tag Manager (noscript) --> */}
          <Script async id="gtm2" strategy="afterInteractive">
            {`
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NCJBMVP"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        `}
          </Script>
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
