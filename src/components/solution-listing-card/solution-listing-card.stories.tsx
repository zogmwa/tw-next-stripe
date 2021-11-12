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
  upvoted_count: 324,
  price: 1200,
  avg_rating: '4.700',
  provide_organization: {
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
