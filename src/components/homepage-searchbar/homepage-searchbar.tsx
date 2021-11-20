import React from 'react'
import { useRouter } from 'next/router'
import { SearchBar } from '@taggedweb/components/search-bar'

import { Tab } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function SearchComponent() {
  const router = useRouter()
  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 md:w-1/2 bg-blue-900/20 rounded-xl">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-lg leading-5 font-medium text-blue-700 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                selected
                  ? 'bg-white shadow transition duration-500 ease-in-out'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
              )
            }
          >
            Find Solutions
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-lg leading-5 font-medium text-blue-700 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                selected
                  ? 'bg-white shadow transition duration-500 ease-in-out'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
              )
            }
          >
            Find Software
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
            )}
          >
            <SearchBar
              onSubmit={(selectedTag) => {
                router.push(`/softwares/${selectedTag}`)
              }}
              forHomepage={true}
            />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
            )}
          >
            <SearchBar
              onSubmit={(selectedTag) => {
                router.push(`/softwares/${selectedTag}`)
              }}
              forHomepage={true}
              forSoftware={true}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
