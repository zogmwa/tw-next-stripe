import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { useRouter } from 'next/router'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdOutlineClose } from 'react-icons/md'
import { BsSearch, BsFillXCircleFill } from 'react-icons/bs'
import { LIST_A_SOFTWARE_PATH, SOLUTIONS_CONTACT_GOOGLE_FORM } from '@taggedweb/utils/constants'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { Button } from '../button'
import Avatar from './avatar'
import { NavSearchBar, SearchBar } from '../search-bar'
import { NavbarMenu, NavbarMenuResponsive } from '../navbar-menu/navbar-menu'

type NavBarProps = {
  className?: string
  style?: React.CSSProperties
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))

export function NavBar({ className, style }: NavBarProps) {
  const [mobileTopShow, setMobileTopShow] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const session = useUserContext()
  const { pathname } = useRouter()
  const router = useRouter()
  const { isLoggedIn, logout } = session

  // Keeping this false for now as improvements to search bar required.
  const renderNavSearchBar =
    pathname !== '/login' && pathname !== '/signup' && pathname !== '/' && pathname.split('/')[1] !== 'search' && false

  useEffect(() => {
    setMobileTopShow(false)
  }, [router.asPath])
  return (
    <div id="navbar">
      <div className={clsx('hidden md:block w-full h-14 bg-background-surface border-b px-4', className)} style={style}>
        <div className="flex items-center justify-between h-full max-w-screen-lg mx-auto jus">
          <div className="flex items-center">
            <Link href="/">
              <a>
                <img src="/images/taggedweb-logo.svg" alt="TaggedWeb Logo" className="w-10 h-10 cursor-pointer" />
              </a>
            </Link>
            <Link href="/">
              <a>
                <div className="text-base font-medium tracking-wide text-opacity-100 cursor-pointer text-primary">
                  TaggedWeb
                </div>
              </a>
            </Link>
          </div>
          {renderNavSearchBar ? (
            <NavSearchBar
              className="flex-1 ml-2"
              onSubmit={(selectedTag) => {
                router.push(`/softwares/${selectedTag}`)
              }}
            />
          ) : null}
          {showSearch && (
            <div className="flex-1 px-6">
              <SearchBar
                forNavbar={true}
                onSubmit={(selectedTag) => {
                  router.push(`/solutions/${selectedTag}`)
                }}
              />
            </div>
          )}
          {!showSearch && <NavbarMenu />}
          {!showSearch && (
            <LightTooltip title="Find Solutions" placement="bottom" arrow>
              <div
                onClick={() => {
                  setShowSearch(!showSearch)
                }}
                className="px-2 py-2 text-blue-500 rounded cursor-pointer hover:bg-blue-100"
              >
                <BsSearch />
              </div>
            </LightTooltip>
          )}
          {showSearch && (
            <div
              onClick={() => {
                setShowSearch(!showSearch)
              }}
              className="px-2 py-2 mr-4 text-blue-500 rounded cursor-pointer hover:bg-blue-100"
            >
              <BsFillXCircleFill />
            </div>
          )}
          <div className="flex flex-row items-center justify-around ">
            {isLoggedIn() ? (
              <>
                <Avatar />
              </>
            ) : (
              <>
                <div className="hidden md:flex md:mr-4">
                  <Link href={`/login?next=${router.asPath}`} passHref>
                    <a>
                      <div className="">Log In</div>
                    </a>
                  </Link>
                </div>
                <Link href={'/signup'} passHref>
                  <a>
                    <Button buttonType="primary">Get Started</Button>
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {!mobileTopShow && (
        <div
          className={clsx('flex md-lg:hidden w-full h-14 bg-background-surface border-b px-2', className)}
          style={style}
        >
          <div className="flex flex-col items-start w-full h-full py-2 ">
            <div className="flex items-center justify-between w-full ">
              <div className="flex items-center">
                <Link href="/">
                  <a>
                    <img src="/images/taggedweb-logo.svg" alt="TaggedWeb Logo" className="w-10 h-10 cursor-pointer" />
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
              {showSearch && (
                <div className="flex-1 px-2 pt-1">
                  <SearchBar
                    forNavbar={true}
                    onSubmit={(selectedTag) => {
                      router.push(`/solutions/${selectedTag}`)
                    }}
                  />
                </div>
              )}
              {showSearch && (
                <div
                  onClick={() => {
                    setShowSearch(!showSearch)
                  }}
                  className="px-2 py-2 mb-0.5 text-xl text-blue-500 rounded cursor-pointer hover:bg-blue-100"
                >
                  <BsFillXCircleFill />
                </div>
              )}
              {!showSearch && (
                <div className="flex items-center justify-between">
                  <LightTooltip title="Find Solutions" placement="bottom" arrow>
                    <div
                      onClick={() => {
                        setShowSearch(!showSearch)
                      }}
                      className="px-2 py-2 text-xl text-blue-500 rounded cursor-pointer hover:bg-blue-100"
                    >
                      <BsSearch />
                    </div>
                  </LightTooltip>
                  {isLoggedIn() ? (
                    <>
                      <Avatar />
                    </>
                  ) : (
                    <Link href={'/signup'}>
                      <a>
                        <Button buttonType="primary" className="mx-2">
                          Get Started
                        </Button>
                      </a>
                    </Link>
                  )}
                  <GiHamburgerMenu
                    className="p-1 text-3xl cursor-pointer text-primary"
                    onClick={() => setMobileTopShow(true)}
                  />
                </div>
              )}
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
        <div className="w-full divide-y divide divide-border-default">
          <div className="flex justify-end w-full p-1">
            <IconButton className="p-1 text-3xl text-primary" onClick={() => setMobileTopShow(false)}>
              <MdOutlineClose />
            </IconButton>
          </div>
          <NavbarMenuResponsive />
          <div className="flex flex-col justify-center w-full px-4 py-2 text-center">
            <Link href={LIST_A_SOFTWARE_PATH}>
              <a className="py-2 tracking-wide rounded cursor-pointer hover:bg-gray-100">Submit a Web Service</a>
            </Link>
            <Link href={`${SOLUTIONS_CONTACT_GOOGLE_FORM}`}>
              <a
                className="py-2 tracking-wide rounded cursor-pointer hover:bg-gray-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                Submit a Solution
              </a>
            </Link>
            {isLoggedIn() ? (
              <>
                <Link href="#">
                  <a
                    className="py-2 hover:bg-gray-100"
                    onClick={() => {
                      router.push('/profile')
                      setMobileTopShow(false)
                    }}
                  >
                    Profile
                  </a>
                </Link>
                <Link href="#">
                  <a
                    className="py-2 hover:bg-gray-100"
                    onClick={() => {
                      logout()
                      setMobileTopShow(false)
                    }}
                  >
                    Logout
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link href={'/signup'} passHref>
                  <a>
                    <Button buttonType="primary">Get Started</Button>
                  </a>
                </Link>
                <div className="mt-2">
                  <Link href={`/login?next=${router.asPath}`} passHref>
                    <a>
                      <div className="">Log In</div>
                    </a>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  )
}
