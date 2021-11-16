import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
type MenuItemProps = {
  dropdownData: { name: string; slug: string }[]
  navItem: string
}
export function NavItem({ dropdownData, navItem }: MenuItemProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm text-base font-medium tracking-wide text-opacity-100 border-none rounded outline-none cursor-pointer text-primary hover:bg-gray-100 shadow:none">
          {navItem}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg w-156">
          <div className="grid grid-cols-3 gap-4 py-1">
            {dropdownData.map((item) => {
              if (item.name != '/') {
                return (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={`/search/${item.slug}`}
                        className={clsx(
                          active ? 'bg-gray-100' : null,
                          'text-base  tracking-wide text-opacity-100 cursor-pointer text-primary h-full',
                          'block  font-medium',
                          'px-4',
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                )
              } else {
                return (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href="/"
                        className={clsx(
                          active ? 'bg-gray-100' : null,
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
    </Menu>
  )
}
