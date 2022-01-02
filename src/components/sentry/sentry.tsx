import * as sentry from '@sentry/browser'
import { User } from '@taggedweb/types/user'
import { useEffect } from 'react'

export type SentryProps = {
  userInfo?: User
}

const Sentry: ({ userInfo }: SentryProps) => null = ({ userInfo }: SentryProps) => {
  useEffect(() => {
    sentry.setUser({
      email: userInfo.email,
      username: userInfo.username,
    })
  }, [userInfo])

  return null
}

export default Sentry
