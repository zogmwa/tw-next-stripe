import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { SolutionDetailSidebar } from '.'

export default {
  title: 'General/Sidebar',
  component: SolutionDetailSidebar,
} as Meta

const solutionSidebarInfo = {
  price: 120,
  features: [
    { name: '10 Ready Capacity' },
    { name: '14 Eta Days' },
    { name: 'Free Trial' },
    { name: 'Benefit 4' },
    { name: 'Benefit 5' },
  ],
}

export function DefaultSolutionDetailSidebar() {
  return <SolutionDetailSidebar detailInfo={solutionSidebarInfo} className="max-w-[14rem]" />
}
