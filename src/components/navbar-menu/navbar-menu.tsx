import React, { useState } from 'react'
import Link from 'next/link'
import { LIST_A_SOFTWARE_PATH, SOLUTIONS_CONTACT_GOOGLE_FORM, BLOG_SITE_PATH } from '@taggedweb/utils/constants'
import { NavItem } from './menu-item'
import { NavAccordion } from './navbar-accordion'
import { TopSaasTags, TopSolutionTags } from '../../utils/top-tags'

const ResourcesDropdown = [
  { name: 'About', slug: 'about' },
  { name: 'Blog', slug: 'blog' },
  { name: 'Careers', slug: '' },
]

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
            className="flex px-4 py-2 text-sm text-base tracking-wide rounded cursor-pointer text-primary hover:bg-gray-200"
          >
            List your Solution
          </a>
        </Link>
        <Link href={LIST_A_SOFTWARE_PATH}>
          <a className="flex px-4 py-2 text-sm text-base tracking-wide rounded cursor-pointer text-primary hover:bg-gray-200">
            List a Software
          </a>
        </Link>
        <Link href={BLOG_SITE_PATH}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="flex px-4 py-2 text-sm text-base tracking-wide rounded cursor-pointer text-primary hover:bg-gray-200"
          >
            Blog
          </a>
        </Link>
        {/* <NavItem dropdownData={ResourcesDropdown} navItem="Resources" /> */}
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
        pathName="solutions"
        isNavbar={true}
      />
      <NavAccordion
        expanded={expanded}
        handleChange={handleChange}
        dropdownData={TopSaasTags}
        navItem="Software"
        pathName="softwares"
        isNavbar={true}
      />
      <NavAccordion
        expanded={expanded}
        handleChange={handleChange}
        dropdownData={ResourcesDropdown}
        navItem="Resources"
        pathName="resources"
        isNavbar={true}
      />
    </div>
  )
}
