import React, { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaGripLines } from 'react-icons/fa'
import { Button } from '../button'
import { useUserContext } from '../../hooks/use-user'
import Avatar from './avatar'

type NavBarProps = {
  className?: string
  style?: React.CSSProperties
}

export function NavBar({ className, style }: NavBarProps) {
  const [mobileTopShow, setMobileTopShow] = useState(false)
  const session = useUserContext()
  const router = useRouter()
  const { isLoggedIn } = session

  return (
    <>
      <div className={clsx('hidden md:block w-full h-14 bg-background-surface border-b px-4', className)} style={style}>
        <div className="flex items-center h-full max-w-screen-lg pr-2 mx-auto">
          <Link href="/">
            <img src="/images/taggedweb-logo.svg" alt="TaggedWeb" className="w-10 h-10 cursor-pointer" />
          </Link>
          <Link href="/">
            <div className="text-base font-medium tracking-wide text-opacity-100 cursor-pointer text-primary">
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
      <div className={clsx('flex md:hidden w-full max-h-32 bg-background-surface border-b px-4', className)} style={style}>
        <div className="flex flex-col items-start w-full h-full py-2 pr-2">
          <div className="flex items-center justify-between w-full p-1">
            <div className="flex items-center">
              <Link href="/">
                <img src="/images/taggedweb-logo.svg" alt="TaggedWeb" className="w-10 h-10 cursor-pointer" />
              </Link>
              <Link href="/">
                <div className="text-base font-medium tracking-wide text-opacity-100 cursor-pointer text-primary">
                  TaggedWeb
                </div>
              </Link>
            </div>
            <FaGripLines 
              className={isLoggedIn() ? "p-1 mr-2 text-2xl border border-solid rounded-md text-primary border-primary" : "p-1 text-2xl border border-solid rounded-md text-primary border-primary"}
              onClick={() => setMobileTopShow(!mobileTopShow)}
            />
          </div>
          {mobileTopShow && (
            <div className="flex items-center justify-between w-full p-1">
              <Link href="/submit-service">
                <>
                  <Button className="px-2 py-2 text-sm md:hidden">Submit A Web Service</Button>
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
          )}
        </div>
      </div>
    </>
  )
}
