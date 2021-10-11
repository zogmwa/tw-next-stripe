import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { Button } from '../button'
import { useUserContext } from '../../hooks/use-user'
import Avatar from './avatar'

type NavBarProps = {
  className?: string
  style?: React.CSSProperties
}

export function NavBar({ className, style }: NavBarProps) {
  const session = useUserContext()
  const { authVerified } = session

  return (
    <div className={clsx('w-full h-14 bg-background-surface border-b px-4', className)} style={style}>
      <div className="flex items-center h-full max-w-screen-lg pr-2 mx-auto">
        <div className="w-10 h-10 mr-2 bg-opacity-25 rounded-md bg-primary" />
        <Link href="/">
          <div className="text-base font-medium tracking-wide text-opacity-50 cursor-pointer text-primary">
            taggedweb
          </div>
        </Link>
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
