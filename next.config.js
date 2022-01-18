/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,

    // Frontend Site URL (For prod this should be https://www.taggedweb.com)
    SITE_BASE_URL: process.env.SITE_BASE_URL,
    TAGGEDWEB_SUPPORT_EMAIL: process.env.TAGGEDWEB_SUPPORT_EMAIL,
    STRIPE_PUBLISH_KEY: process.env.STRIPE_PUBLISH_KEY,

    ACCESS_TOKEN_LOCAL_STORAGE_KEY: 'taggedweb-access-token',
    REFRESH_TOKEN_LOCAL_STORAGE_KEY: 'taggedweb-refresh-token',
    FRESHCHAT_TOKEN: '4fb0a735-9e98-42cd-9b19-0237f15701e7',

    LINKEDIN_CLIENT_ID: '86a9kyhpahci31',
    LINKEDIN_OAUTH_STATE: 'bku19h5hfb',

    GOOGLE_CLIENT_ID: '638599930121-73t33tmtfr4ggr9jsv3m7pb4lv53skp8.apps.googleusercontent.com',
    GOOGLE_OAUTH_STATE: 'GZublByuSS',

    CLOUDINARY_CLOUD_NAME: 'taggedweb',
    CLOUDINARY_PRESET_NAME: 'ml_default',
    CLOUDINARY_API_KEY: '922317449762841',
    CLOUDINARY_API_SECRET: 'DPZho9YCX_9Lf7LsJI5c96-gBkQ',

    SECRET_COOKIE_PASSWORD: 'cklvnmwhdfklsdfjasdkfajskdnfjkxcvyiuwerbkashkdjf',

    LOGIN_AUTH_POPUP_NAME: 'taggedweb_login_auth_popup',

    NEXT_PAGE_URL_LOCAL_STORAGE_KEY: 'taggedweb-next-page-redirect',
    FAILURE_PAGE_URL_LOCAL_STORAGE_KEY: 'taggedweb-failure-redirect',
    SENTRY_DSN: 'https://0b1c30a4f7ac46a98e8345b97526ad1d@o1064580.ingest.sentry.io/6125907',
    IS_SENTRY_ENABLED: 'true',
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          // For next two redirects refer ISSUE#775 or PR#782
          // This redirect is used because otherwise /[sitemap_url].tsx will be needed instead of /sitemap/[sitemap_url].tsx. This is used to show 404 pages on /abc like pages. Even if we could return 404 page from /[sitemap_url].tsx for /abc, it would be slower.
          source: '/:sitemap_url(sitemap_.*)',
          destination: '/sitemap/:sitemap_url',
        },
      ],
    }
  },
}

/* Enable code below to analyze bundle size */

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: true,
// });

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs')

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
