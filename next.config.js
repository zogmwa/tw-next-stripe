/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    API_BASE_URL: 'https://api.taggedweb.com',

    ACCESS_TOKEN_LOCAL_STORAGE_KEY: 'taggedweb-access-token',
    REFRESH_TOKEN_LOCAL_STORAGE_KEY: 'taggedweb-refresh-token',

    LINKEDIN_CLIENT_ID: '86a9kyhpahci31',
    LINKEDIN_OAUTH_STATE: 'bku19h5hfb',

    CLOUDINARY_CLOUD_NAME: 'dgfmcs1yy',
    CLOUDINARY_PRESET_NAME: 'ml_default',
    CLOUDINARY_API_KEY: '241677845793131',
    CLOUDINARY_API_SECRET: '3DQQEO7VRHMo4WNp_JKOYxGMTtg',
  },
}

module.exports = nextConfig
