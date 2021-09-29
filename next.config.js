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

    GOOGLE_CLIENT_ID: '638599930121-73t33tmtfr4ggr9jsv3m7pb4lv53skp8.apps.googleusercontent.com',
    GOOGLE_OAUTH_STATE: 'GZublByuSS',

    CLOUDINARY_CLOUD_NAME: 'dgfmcs1yy',
    CLOUDINARY_PRESET_NAME: 'ml_default',
    CLOUDINARY_API_KEY: '241677845793131',
    CLOUDINARY_API_SECRET: '3DQQEO7VRHMo4WNp_JKOYxGMTtg',
  },
}

module.exports = nextConfig
