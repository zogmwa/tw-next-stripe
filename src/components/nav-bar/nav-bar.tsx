import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from '../button'
import { useUserContext } from '../../hooks/use-user'
import Avatar from './avatar'

type NavBarProps = {
  className?: string
  style?: React.CSSProperties
}

export function NavBar({ className, style }: NavBarProps) {
  const session = useUserContext()
  const router = useRouter()
  const { isLoggedIn } = session

  return (
    <div className={clsx('w-full h-14 bg-background-surface border-b px-4', className)} style={style}>
      <div className="flex items-center h-full max-w-screen-lg pr-2 mx-auto">
        <Link href="/">
          <img src="/images/taggedweb-logo.svg" alt="TaggedWeb" className="w-10 h-10 cursor-pointer" />
        </Link>
        <Link href="/">
          <div className="hidden text-base font-medium tracking-wide text-opacity-100 cursor-pointer md:flex text-primary">
            TaggedWeb
          </div>
        </Link>
        <div className="flex-1" />
        <Link href="/submit-service">
          <>
            <Button className="px-2 py-2 mx-4 text-sm md:hidden">Submit A Web Service</Button>
            <Button className="hidden mx-4 md:flex">Submit A Web Service</Button>
          </>
        </Link>
        {isLoggedIn() ? (
          <>
            <Avatar />
          </>
        ) : (
          <Link href={`/login?next=${router.asPath}`}>
            <Button> Sign Up | Login </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
