import React, { useState } from 'react'
import Link from 'next/link'
import { NavItem } from './menu-item'
import { NavAccordion } from './navbar-accordion'
import { TopSaasTags, TopSolutionTags } from '../../utils/top-tags'

// const ResourceDropdown = [{ name: 'Blog', slug: '/' }]

export function NavbarMenu() {
  return (
    <div id="navbar">
      <div className="flex flex-row w-full h-full item-start">
        <NavItem dropdownData={TopSolutionTags} navItem="Solutions" />
        <NavItem dropdownData={TopSaasTags} navItem="Software" />
        <Link href="/submit-service">
          <a className="flex px-4 py-2 text-sm text-base tracking-wide rounded cursor-pointer text-primary hover:bg-gray-100">
            Submit a Web Service
          </a>
        </Link>
        <Link href="/submit-solution">
          <a className="flex px-4 py-2 text-sm text-base tracking-wide rounded cursor-pointer text-primary hover:bg-gray-100">
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
        dropdownData={TopSolutionTags}
        navItem="Solutions"
      />
      <NavAccordion expanded={expanded} handleChange={handleChange} dropdownData={TopSaasTags} navItem="Software" />
      {/* <NavAccordion
        expanded={expanded}
        handleChange={handleChange}
        dropdownData={ResourceDropdown}
        navItem="Resources"
      /> */}
    </div>
  )
}
