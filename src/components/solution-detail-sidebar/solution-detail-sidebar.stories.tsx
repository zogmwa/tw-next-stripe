import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { SolutionDetailSidebar, SolutionDetailMobileSidebar } from '.'

export default {
  title: 'General/Sidebar',
  component: SolutionDetailSidebar,
} as Meta

const solutionSidebarInfo = {
  price: 120,
  primary_price: {
    id: 1,
    solution: 1,
    stripe_price_id: 'price_1JyKvjJYlLsCg3G3ZwhcIrw8',
    price: '10.00',
    currency: 'USD',
    is_primary: true,
  },
  features: [
    {
      id: 'ready-capacity',
      name: '9/10 Available Capacity',
      tooltipContent:
        'We have 1 solution actively being worked on and up-to 9 solutions that can be booked. We limit capacity to prevent overbooking a provider.',
    },
    {
      id: 'eda-days',
      name: 'Estimated Days to Fulfill: 1',
      tooltipContent: 'This is an estimate on number of days it will take to deliver.',
    },
    {
      id: 'free-trial',
      name: 'Free Trial',
      tooltipContent: 'This solution has free trial.',
    },
  ],
  purchaseDisableOption: true,
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
