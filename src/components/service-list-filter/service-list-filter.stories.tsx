import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { SortServiceList } from './sort-list'

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
