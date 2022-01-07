import React, { Fragment } from 'react'
import { BiFilterAlt } from 'react-icons/bi'
import { Menu, Transition } from '@headlessui/react'
import { SortServiceList } from './sort-list'
import { FilterServiceList } from './filter-list'

type MobileViewSortServiceListProps = {
  defaultSortValue?: string
  defaultFilterValue?: string
  onSortChange: (value: string) => void
  onFilterChange: (value: string) => void
  filterByPrice?: (minPrice: string, maxPrice: string) => void
  filterLabel?: string
}

export function MobileViewSortAndFilterServiceList({
  defaultSortValue = '',
  defaultFilterValue = '',
  onSortChange,
  onFilterChange,
  filterByPrice,
  filterLabel = 'Trial',
}: MobileViewSortServiceListProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus-visible:ring-2 !focus:outline-none !shadow-none focus-visible:ring-white focus-visible:ring-opacity-75"
        style={{ boxShadow: 'none !important' }}
      >
        <BiFilterAlt size={22} color="gray" />
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
        <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>{() => <SortServiceList defaultValue={defaultSortValue} onChange={onSortChange} />}</Menu.Item>
            <Menu.Item>
              {() => (
                <FilterServiceList
                  filterByPrice={filterByPrice}
                  defaultValue={defaultFilterValue}
                  onChange={onFilterChange}
                  label={filterLabel}
                />
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
