import React from 'react'
type Props = {
  googleAnalytics?: string
  googleTagManager?: string
}

const Analytics = ({ googleAnalytics, googleTagManager }: Props) => {
  return (
    <>
      {googleTagManager && (
        <script
          async
          id="gtm1"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${googleTagManager}');
          `,
          }}
        />
      )}
      {googleAnalytics && (
        <>
          <script async id="ga1" src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`} />

          <script
            id="ga2"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalytics}', {
                page_path: window.location.pathname,}); `,
            }}
          />
        </>
      )}
    </>
  )
}

export default Analytics
