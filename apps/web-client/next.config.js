// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  env: {
    API_BASE_URL: 'https://api.taggedweb.com',
    ACCESS_TOKEN_LOCAL_STORAGE_KEY: 'taggedweb-access-token',
    REFRESH_TOKEN_LOCAL_STORAGE_KEY: 'taggedweb-refresh-token',
    LINKEDIN_CLIENT_ID: '86a9kyhpahci31',
    LINKEDIN_OAUTH_STATE: 'bku19h5hfb',
  },
}

module.exports = withNx(nextConfig)
