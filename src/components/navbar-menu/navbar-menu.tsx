import React, { useState } from 'react'
import Link from 'next/link'
import { LIST_A_SOFTWARE_PATH, SOLUTIONS_CONTACT_GOOGLE_FORM } from '@taggedweb/utils/constants'
import { NavItem } from './menu-item'
import { NavAccordion } from './navbar-accordion'
import { TopSaasTags, TopSolutionTags } from '../../utils/top-tags'

// const ResourceDropdown = [{ name: 'Blog', slug: '/' }]

export function NavbarMenu() {
  return (
    <div id="navbar">
      <div className="flex flex-row w-full h-full item-start">
        <NavItem dropdownData={TopSolutionTags} navItem="Solutions" pathName="solutions" />
        <NavItem dropdownData={TopSaasTags} navItem="Software" pathName="softwares" />
        <Link href={`${SOLUTIONS_CONTACT_GOOGLE_FORM}`}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="flex px-4 py-2 text-sm text-base tracking-wide rounded cursor-pointer text-primary hover:bg-gray-100"
          >
            Solution Providers
          </a>
        </Link>
        <Link href={LIST_A_SOFTWARE_PATH}>
          <a className="flex px-4 py-2 text-sm text-base tracking-wide rounded cursor-pointer text-primary hover:bg-gray-100">
            List a Software
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
