import React, { useState } from 'react'
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
    { name: '10 Ready Capacity' },
    { name: '14 Eta Days' },
    { name: 'Free Trial' },
    { name: 'Benefit 4' },
    { name: 'Benefit 5' },
  ],
  purchaseDisableOption: true,
}

export function DefaultSolutionDetailSidebar() {
  const [isFreshChatShow, setIsFreshChatShow] = useState(false)

  return (
    <>
      <h4 className="py-2 font-bold text-md text-text-primary">Desktop UI</h4>
      <SolutionDetailSidebar
        detailInfo={solutionSidebarInfo}
        className="max-w-[14rem]"
        setIsFreshChatShow={setIsFreshChatShow}
      />
      <h4 className="py-2 font-bold text-md text-text-primary">Mobile UI</h4>
      <SolutionDetailMobileSidebar
        detailInfo={solutionSidebarInfo}
        className="max-w-[18rem]"
        setIsFreshChatShow={setIsFreshChatShow}
      />
    </>
  )
}
