import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { SearchBar } from '@taggedweb/components/search-bar'

import { Tab } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
type SearchComponentProps = {
  search_software: number
}
export function SearchComponent({ search_software = 0 }: SearchComponentProps) {
  const router = useRouter()
  const [searchIndex, setSearchIndex] = useState(search_software)
  useEffect(() => {
    if (
      window.location.hash &&
      (window.location.hash === '#software-search' || window.location.hash === '#solution-search')
    ) {
      const hash = window.location.hash
      if (hash === '#software-search') {
        setSearchIndex(1)
      } else {
        setSearchIndex(0)
      }
    } else {
      const index = localStorage.getItem('taggedweb-search-software') || search_software.toString()
      setSearchIndex(parseInt(index))
    }
  }, [])

  return (
    <div className="w-full">
      <Tab.Group
        defaultIndex={searchIndex}
        onChange={(index) => {
          localStorage.setItem('taggedweb-search-software', JSON.stringify(index))
          if (index === 0) {
            window.location.hash = 'solution-search'
          } else {
            window.location.hash = 'software-search'
          }
        }}
      >
        <Tab.List className="flex p-1 space-x-1 sm:w-1/2 bg-blue-900/20 rounded-xl">
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
            title="Useful if you are looking for consultations, software integration support or related services"
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
            title="Useful if you are finding software, SaaS options"
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
                router.push(`/solutions/${selectedTag}`)
              }}
              forHomepage={true}
              forSoftware={false}
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
