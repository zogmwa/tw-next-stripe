import React from 'react'
import clsx from 'clsx'
import { Button } from '../button'
import { useUserContext } from '../../hooks/use-user'
import Link from 'next/link'
import Avatar from './avatar'

type NavBarProps = {
  className?: string
  style?: React.CSSProperties
}

export function NavBar({ className, style }: NavBarProps) {
  const { authVerified } = useUserContext()

  return (
    <div className={clsx('w-full h-14 bg-background-surface border-b px-4', className)} style={style}>
      <div className="flex items-center h-full max-w-screen-lg mx-auto">
        <div className="w-10 h-10 mr-2 bg-opacity-25 rounded-md bg-primary" />
        <div className="text-base font-medium tracking-wide text-opacity-50 text-primary">taggedweb</div>
        <div className="flex-1" />
        {authVerified ? (
          <>
            <Link href="/submit-service">
              <Button>Submit Service</Button>
            </Link>
            <Avatar />
          </>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
