/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    API_BASE_URL: 'https://api.taggedweb.com',
    SITE_BASE_URL: 'https://taggedweb.com', // This is frontend site URL.

    ACCESS_TOKEN_LOCAL_STORAGE_KEY: 'taggedweb-access-token',
    REFRESH_TOKEN_LOCAL_STORAGE_KEY: 'taggedweb-refresh-token',
    FRESHCHAT_TOKEN: '9c479967-f077-4e9f-a451-611601282b69',

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
  },
}

module.exports = nextConfig
