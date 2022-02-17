/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useRef, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
type MenuItemProps = {
  dropdownData: { name: string; slug: string }[]
  navItem: string
  pathName: string
}
export function NavItem({ dropdownData, navItem, pathName }: MenuItemProps) {
  const dropdownRef = useRef(null)
  // NOTE: useDetectOutsideClick is not necessary with hover, useState(false) would do here
  const [openDropdown, setOpenDropdown] = useState(false)
  const [mouseOverButton, setMouseOverButton] = useState(false)
  const [mouseOverMenu, setMouseOverMenu] = useState(false)

  const timeoutDuration = 75
  let timeoutButton
  let timeoutMenu

  const onMouseEnterButton = () => {
    clearTimeout(timeoutButton)
    setOpenDropdown(true)
    setMouseOverButton(true)
  }
  const onMouseLeaveButton = () => {
    timeoutButton = setTimeout(() => setMouseOverButton(false), timeoutDuration)
  }

  const onMouseEnterMenu = () => {
    clearTimeout(timeoutMenu)
    setMouseOverMenu(true)
  }
  const onMouseLeaveMenu = () => {
    timeoutMenu = setTimeout(() => setMouseOverMenu(false), timeoutDuration)
  }

  const show = openDropdown && (mouseOverMenu || mouseOverButton)
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div
            className="rounded-md focus:outline-none focus:border-white focus:ring-white"
            onClick={() => setOpenDropdown(!openDropdown)}
            onMouseEnter={onMouseEnterButton}
            onMouseLeave={onMouseLeaveButton}
            onKeyPress={null}
            role="button"
            tabIndex={0}
          >
            <Menu.Button
              className="inline-flex justify-center w-full px-4 py-2 text-sm text-base tracking-wide text-opacity-100 border-none rounded outline-none cursor-pointer text-primary hover:bg-gray-100 shadow:none"
              as="a"
            >
              <span>{navItem}</span>
              <svg className="w-5 h-5 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d={
                    'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 ' +
                    '1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  }
                  clipRule="evenodd"
                />
              </svg>
            </Menu.Button>
          </div>

          <Transition
            show={show}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="absolute left-0 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg w-156"
              ref={dropdownRef}
              onMouseEnter={onMouseEnterMenu}
              onMouseLeave={onMouseLeaveMenu}
              static
            >
              <div className="z-30 grid grid-cols-3 gap-4 py-1">
                {dropdownData.map((item) => {
                  if (item.name !== '/') {
                    return (
                      <Menu.Item key={item.name} onClick={() => setOpenDropdown(false)}>
                        {({ active }) => (
                          <a
                            href={`/${pathName}/${item.slug}`}
                            className={clsx(
                              active ? 'bg-gray-200' : null,
                              'text-base  tracking-wide text-opacity-100 cursor-pointer text-primary h-full',
                              'block px-4',
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    )
                  } else {
                    return (
                      <Menu.Item key={item.name} onClick={() => setOpenDropdown(false)}>
                        {({ active }) => (
                          <a
                            href="/"
                            className={clsx(
                              active ? 'bg-gray-200' : null,
                              'text-base  tracking-wide text-opacity-100 cursor-pointer text-primary',
                              'block px-4 py-2 font-medium',
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    )
                  }
                })}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
