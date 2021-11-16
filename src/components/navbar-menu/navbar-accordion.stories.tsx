import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { NavAccordion } from './navbar-accordion'
import { TopSaasTags, TopSolutionTags } from '../../utils/top-tags'

export default {
  title: 'General/NavbarMenuResponsive',
  component: NavAccordion,
} as Meta

const SolutionDropdown = [{ name: 'Search Solution', slug: '/' }, ...TopSolutionTags]
const SaaSDropdown = [{ name: 'Search Software', slug: '/' }, ...TopSaasTags]
// const ResourceDropdown = [{ name: 'Blog', slug: '/' }]

export function NavbarMenuResponsive() {
  const [expanded, setExpanded] = useState<string>('')

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : '')
  }

  return (
    <div className="flex flex-col justify-around w-full item-start">
      <NavAccordion
        expanded={expanded}
        handleChange={handleChange}
        dropdownData={SolutionDropdown}
        navItem="Solutions"
      />
      <NavAccordion expanded={expanded} handleChange={handleChange} dropdownData={SaaSDropdown} navItem="SaaS" />
      {/* <NavAccordion
        expanded={expanded}
        handleChange={handleChange}
        dropdownData={ResourceDropdown}
        navItem="Resources"
      /> */}
    </div>
  )
}
