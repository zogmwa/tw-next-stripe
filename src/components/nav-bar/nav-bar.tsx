import React, { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdOutlineClose } from 'react-icons/md'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { useRouter } from 'next/router'
import { Button } from '../button'
import Avatar from './avatar'
import { NavSearchBar } from '../search-bar'

type NavBarProps = {
  className?: string
  style?: React.CSSProperties
}

export function NavBar({ className, style }: NavBarProps) {
  const [mobileTopShow, setMobileTopShow] = useState(false)
  const session = useUserContext()
  const { pathname } = useRouter()
  const router = useRouter()
  const { isLoggedIn, logout } = session
  const renderNavSearchBar =
    pathname !== '/login' && pathname !== '/signup' && pathname !== '/' && pathname.split('/')[1] !== 'search'

  return (
    <div id="navbar">
      <div className={clsx('hidden md:block w-full h-14 bg-background-surface border-b px-4', className)} style={style}>
        <div className="flex items-center h-full max-w-screen-lg pr-2 mx-auto">
          <Link href="/">
            <a>
              <img src="/images/taggedweb-logo.svg" alt="TaggedWeb" className="w-10 h-10 cursor-pointer" />
            </a>
          </Link>
          <Link href="/">
            <a>
              <div className="text-base font-medium tracking-wide text-opacity-100 cursor-pointer text-primary">
                TaggedWeb
              </div>
            </a>
          </Link>
          <div className="flex justify-end flex-1">
            {renderNavSearchBar ? (
              <NavSearchBar
                className="flex-1 ml-2"
                onSubmit={(selectedTag) => {
                  router.push(`/search/${selectedTag}`)
                }}
              />
            ) : null}
            <Link href="/submit-service">
              <a>
                <Button className="flex mx-4">Submit A Web Service</Button>
              </a>
            </Link>
            {isLoggedIn() ? (
              <>
                <Avatar />
              </>
            ) : (
              <Link href={`/login?next=${router.asPath}`}>
                <a>
                  <Button> Sign Up | Login </Button>
                </a>
              </Link>
            )}
          </div>
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
                  <a>
                    <img src="/images/taggedweb-logo.svg" alt="TaggedWeb" className="w-10 h-10 cursor-pointer" />
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <div className="hidden text-base font-medium tracking-wide text-opacity-100 cursor-pointer text-primary sm:block">
                      TaggedWeb
                    </div>
                  </a>
                </Link>
              </div>
              <div className="flex items-center justify-between p-1">
                {isLoggedIn() ? (
                  <>
                    <Avatar />
                  </>
                ) : (
                  <Link href={`/login?next=${router.asPath}`}>
                    <a>
                      <Button> Sign Up | Login </Button>
                    </a>
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
            {isLoggedIn() ? (
              <>
                <a
                  className="flex justify-center w-full"
                  href="#"
                  onClick={() => {
                    router.push('/profile')
                    setMobileTopShow(false)
                  }}
                >
                  <span className="px-2 py-2 text-md"> Profile </span>
                </a>
                <a
                  className="flex justify-center w-full"
                  href="#"
                  onClick={() => {
                    logout()
                    setMobileTopShow(false)
                  }}
                >
                  <span className="px-2 py-2 text-md"> Logout </span>
                </a>
              </>
            ) : (
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
