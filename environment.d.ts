declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_BASE_URL: string
      ACCESS_TOKEN_LOCAL_STORAGE_KEY: string
      REFRESH_TOKEN_LOCAL_STORAGE_KEY: string
      LINKEDIN_CLIENT_ID: string
      LINKEDIN_OAUTH_STATE: string
    }
  }
}
