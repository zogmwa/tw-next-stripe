import React, { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdOutlineClose } from 'react-icons/md'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
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
    <div id="navbar">
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
      {!mobileTopShow && (
        <div
          className={clsx('flex md:hidden w-full h-14 bg-background-surface border-b px-4', className)}
          style={style}
        >
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
              <div className="flex items-center justify-between p-1">
                {isLoggedIn() ? (
                  <>
                    <Avatar />
                  </>
                ) : (
                  <Link href={`/login?next=${router.asPath}`}>
                    <Button> Sign Up | Login </Button>
                  </Link>
                )}
                <GiHamburgerMenu className="p-1 text-3xl text-primary" onClick={() => setMobileTopShow(true)} />
              </div>
            </div>
          </div>
        </div>
      )}
      <Drawer
        PaperProps={{ className: 'w-full' }}
        variant="persistent"
        anchor={'right'}
        open={mobileTopShow}
        onClose={() => setMobileTopShow(false)}
      >
        <div className="w-full p-2 divide-y divide divide-border-default">
          <div className="flex justify-end w-full p-1">
            <IconButton className="p-1 text-3xl tex-primary" onClick={() => setMobileTopShow(false)}>
              <MdOutlineClose />
            </IconButton>
          </div>
          <div className="flex flex-col items-center justify-between w-full p-1">
            <a className="flex justify-center w-full" href="/submit-service">
              <span className="px-2 py-2 text-md">Submit A Web Service</span>
            </a>
            {!isLoggedIn() && (
              <a className="flex justify-center w-full" href={`/login?next=${router.asPath}`}>
                <span className="px-2 py-2 text-md"> Sign Up | Login </span>
              </a>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  )
}
