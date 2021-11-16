import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { SolutionDetailSidebar, SolutionDetailMobileSidebar } from '.'

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
  return (
    <>
      <h4 className="py-2 font-bold text-md text-text-primary">Desktop UI</h4>
      <SolutionDetailSidebar detailInfo={solutionSidebarInfo} className="max-w-[14rem]" />
      <h4 className="py-2 font-bold text-md text-text-primary">Mobile UI</h4>
      <SolutionDetailMobileSidebar detailInfo={solutionSidebarInfo} className="max-w-[18rem]" />
    </>
  )
}
