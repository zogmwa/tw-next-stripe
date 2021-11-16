import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { NavItem } from './menu-item'
import { TopSaasTags, TopSolutionTags } from '../../utils/top-tags'

export default {
  title: 'General/NavItem',
  component: NavItem,
} as Meta

export function DropdownNav() {
  const SolutionDropdown = [{ name: 'Search Solution', slug: '/' }, ...TopSolutionTags]
  const SaaSDropdown = [{ name: 'Search Software', slug: '/' }, ...TopSaasTags]
  // const ResourceDropdown = [{ name: 'Blog', slug: '/' }]
  return (
    <div className="flex items-center h-full max-w-screen-lg mx-auto justify-evenly">
      <NavItem dropdownData={SolutionDropdown} navItem="Solutions" />
      <NavItem dropdownData={SaaSDropdown} navItem="SaaS" />
      {/* <NavItem dropdownData={ResourceDropdown} navItem="Resources" /> */}
    </div>
  )
}
