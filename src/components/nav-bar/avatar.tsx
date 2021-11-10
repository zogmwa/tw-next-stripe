import React, { Fragment } from 'react'
import Link from 'next/link'
import { BsPersonFill } from 'react-icons/bs'
import { Menu, Transition } from '@headlessui/react'
import { useUserContext } from '@tw/hooks/use-user'

const menuIconClassNames = (active) =>
  `${active ? 'bg-primary text-white' : 'text-gray-900'} group flex rounded-md items-center px-2 py-2 w-full text-sm`

export default function Avatar() {
  const { authVerified, first_name, last_name, logout } = useUserContext()

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus-visible:ring-2 !focus:outline-none !shadow-none focus-visible:ring-white focus-visible:ring-opacity-75"
        style={{ boxShadow: 'none !important' }}
      >
        {authVerified ? <p>{first_name[0] + last_name[0]}</p> : <BsPersonFill size={22} color="gray" />}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link href="/profile">
                  <a>
                    <button className={menuIconClassNames(active)}>Profile</button>
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button onClick={() => logout()} className={menuIconClassNames(active)}>
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
