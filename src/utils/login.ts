import Router from 'next/router'

export function handleLinkedInLogin(): void {
  localStorage.setItem('failure_redirect', Router.pathname)
  const redirectUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/login-with-linkedin'
      : 'https://taggedweb.com/login-with-linkedin'
  window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${redirectUrl}&state=${process.env.LINKEDIN_OAUTH_STATE}&scope=r_liteprofile,r_emailaddress`
}

export function handleGoogleLogin(): void {
  localStorage.setItem('failure_redirect', Router.pathname)
  const redirectUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/login-with-google'
      : 'https://taggedweb.com/login-with-google'
  const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&include_granted_scopes=true&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUrl}&state=${process.env.GOOGLE_OAUTH_STATE}&scope=${scope}`
}
