import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { SolutionListingCard } from './solution-listing-card'
import { SolutionListingBoxCard } from './solution-listing-box-card'

export default {
  title: 'General/SolutionListingCard',
  component: SolutionListingCard,
} as Meta

const listingData = {
  tags: [
    {
      name: 'Design',
      slug: 'design',
    },
    {
      name: 'User Interface',
      slug: 'user-interface',
    },
  ],
  title: 'Improving application performance with APM, metrics and monitoring',
  upvotes_count: 324,
  prices: [
    {
      stripe_price_id: 2,
      price: 11,
      currency: 'USD',
      is_primary: false,
    },
    {
      stripe_price_id: 2,
      price: 120,
      currency: 'USD',
      is_primary: false,
    },
  ],
  avg_rating: '4.700',
  organization: {
    name: 'Solution Provider Organization',
    logo_url: null,
  },
}

export function DefaultSolutionListingCard() {
  return <SolutionListingCard listingData={listingData} />
}

export function DefaultSolutionListingBoxCard() {
  return <SolutionListingBoxCard listingData={listingData} className="w-[15rem] h-[14rem]" />
}
