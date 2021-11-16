import React, { useState } from 'react'
import { NavItem } from './menu-item'
import { NavAccordion } from './navbar-accordion'
import { TopSaasTags, TopSolutionTags } from '../../utils/top-tags'
import Link from 'next/link'

const SolutionDropdown = [{ name: 'Search Solution', slug: '/' }, ...TopSolutionTags]
const SaaSDropdown = [{ name: 'Search Software', slug: '/' }, ...TopSaasTags]
// const ResourceDropdown = [{ name: 'Blog', slug: '/' }]

export function NavbarMenu() {
  return (
    <div id="navbar">
      <div className="flex flex-row w-full h-full item-start">
        <NavItem dropdownData={SolutionDropdown} navItem="Solutions" />
        <NavItem dropdownData={SaaSDropdown} navItem="SaaS" />
        <Link href="/submit-service">
          <a className="flex px-4 py-2 text-sm text-base font-medium tracking-wide rounded cursor-pointer text-primary hover:bg-gray-100">
            Submit a Web Service
          </a>
        </Link>
        <Link href="/submit-service">
          <a className="flex px-4 py-2 text-sm text-base font-medium tracking-wide rounded cursor-pointer text-primary hover:bg-gray-100">
            Submit a Solution
          </a>
        </Link>
        {/* <NavItem dropdownData={ResourceDropdown} navItem="Resources" /> */}
      </div>
    </div>
  )
}

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
