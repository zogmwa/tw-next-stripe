// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN: string = (process.env.SENTRY_DSN as string) || (process.env.NEXT_PUBLIC_SENTRY_DSN as string)

if (process.env.IS_SENTRY_ENABLED === 'true') {
  Sentry.init({
    dsn: SENTRY_DSN,
    // Adjust this value in production, or use tracesSampler for greater control
    environment: process.env.NODE_ENV,
    enabled: process.env.NODE_ENV !== 'development',
    // integrations: [
    //   new Sentry.Integrations.BrowserTracing({
    //     tracingOrigins: ['localhost', 'taggedweb.com', 'https://api.taggedweb.com/'],
    //   }),
    // ],

    tracesSampleRate: 0.25,
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
  })
}
