import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { NavItem } from './menu-item'
import { TopSaasTags, TopSolutionTags } from '../../utils/top-tags'

export default {
  title: 'General/NavItem',
  component: NavItem,
} as Meta

export function DropdownNav() {
  // const ResourceDropdown = [{ name: 'Blog', slug: '/' }]
  return (
    <div className="flex items-center h-full max-w-screen-lg mx-auto justify-evenly">
      <NavItem dropdownData={TopSolutionTags} navItem="Solutions" />
      <NavItem dropdownData={TopSaasTags} navItem="Software" />
      {/* <NavItem dropdownData={ResourceDropdown} navItem="Resources" /> */}
    </div>
  )
}
