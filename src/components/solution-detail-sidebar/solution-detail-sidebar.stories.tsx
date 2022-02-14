import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { SolutionDetailSidebar, SolutionDetailMobileSidebar } from '.'

export default {
  title: 'General/Sidebar',
  component: SolutionDetailSidebar,
} as Meta

const solutionSidebarInfo = {
  id: 3,
  price: 120,
  pay_now_price: {
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
      name: 'Only 9 more slots available at this time',
      tooltipContent:
        'To prevent overwhelming of the provider we limit the number of active bookings per available capacity.',
    },
    {
      id: 'eda-days',
      name: 'Estimated Days to Fulfill: 1',
      tooltipContent: 'This is an estimate on number of days it will take to deliver.',
    },
    {
      id: 'free-trial',
      name: 'Free Consultation',
      tooltipContent: 'This solution has free consultation.',
    },
  ],
  purchaseDisableOption: true,
  type: 'C',
  slug: 'test',
  is_metered: false,
}

export function DefaultSolutionDetailSidebar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFreshChatShow, setIsFreshChatShow] = useState(false)

  return (
    <>
      <h4 className="py-2 font-bold text-md text-text-primary">Desktop UI</h4>
      <SolutionDetailSidebar detailInfo={solutionSidebarInfo} className="max-w-[14rem]" />
      <h4 className="py-2 font-bold text-md text-text-primary">Mobile UI</h4>
      <SolutionDetailMobileSidebar
        detailInfo={solutionSidebarInfo}
        className="max-w-[18rem]"
        setIsFreshChatShow={setIsFreshChatShow}
      />
    </>
  )
}
