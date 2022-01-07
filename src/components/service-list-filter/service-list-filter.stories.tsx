import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { SortServiceList } from './sort-list'
import { MobileViewSortAndFilterServiceList } from './mobile-view'
import { FilterServiceList } from './filter-list'

export default {
  title: 'General/SortServiceList',
  component: SortServiceList,
} as Meta

export function SortList() {
  return (
    <SortServiceList
      onChange={(value) => {
        // eslint-disable-next-line no-console
        console.log(value)
      }}
    />
  )
}

export function MobileViewSortList() {
  return (
    <MobileViewSortAndFilterServiceList
      // filterByPrice={(min, max) => {
      //   // eslint-disable-next-line no-console
      //   console.log(min, max)
      // }}
      onSortChange={(value) => {
        // eslint-disable-next-line no-console
        console.log(value)
      }}
      onFilterChange={(value) => {
        // eslint-disable-next-line no-console
        console.log(value)
      }}
    />
  )
}

export function FilterList() {
  return (
    <FilterServiceList
      // filterByPrice={(min, max) => {
      //   // eslint-disable-next-line no-console
      //   console.log(min, max)
      // }}
      onChange={(value) => {
        // eslint-disable-next-line no-console
        console.log(value)
      }}
    />
  )
}
