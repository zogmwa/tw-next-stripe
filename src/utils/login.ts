import Router from 'next/router'

export function handleLinkedInLogin(failure_redirect?: string): void {
  localStorage.setItem(process.env.FAILURE_PAGE_URL_LOCAL_STORAGE_KEY, failure_redirect ?? Router.asPath)
  const redirectUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/linkedin-login'
      : 'https://taggedweb.com/linkedin-login'
  window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${redirectUrl}&state=${process.env.LINKEDIN_OAUTH_STATE}&scope=r_liteprofile,r_emailaddress`
}

export function handleGoogleLogin(failure_redirect?: string): void {
  localStorage.setItem(process.env.FAILURE_PAGE_URL_LOCAL_STORAGE_KEY, failure_redirect ?? Router.asPath)
  const redirectUrl =
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000/google-login' : 'https://taggedweb.com/google-login'
  const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&include_granted_scopes=true&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUrl}&state=${process.env.GOOGLE_OAUTH_STATE}&scope=${scope}`
}

export function handleLinkedInConnect(): void {
  localStorage.setItem(process.env.FAILURE_PAGE_URL_LOCAL_STORAGE_KEY, '/login')
  localStorage.setItem(process.env.NEXT_PAGE_URL_LOCAL_STORAGE_KEY, '/profile')
  const redirectUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/linkedin-login/connect'
      : 'https://taggedweb.com/linkedin-login/connect'
  window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${redirectUrl}&state=${process.env.LINKEDIN_OAUTH_STATE}&scope=r_liteprofile,r_emailaddress`
}

export function handleGoogleConnect(): void {
  localStorage.setItem(process.env.FAILURE_PAGE_URL_LOCAL_STORAGE_KEY, '/login')
  localStorage.setItem(process.env.NEXT_PAGE_URL_LOCAL_STORAGE_KEY, '/profile')
  const redirectUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/google-login/connect'
      : 'https://taggedweb.com/google-login/connect'
  const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&include_granted_scopes=true&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUrl}&state=${process.env.GOOGLE_OAUTH_STATE}&scope=${scope}`
}
