import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { SolutionListingCard } from './solution-listing-card'
import { SolutionListingBoxCard } from './solution-listing-box-card'

export default {
  title: 'General/SolutionListingCard',
  component: SolutionListingCard,
} as Meta

const listingData = {
  slug: 'improve',
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
  title:
    'Improve the performance of your Python application instrumenting it with Datadog APM, Uncover performance bottlenecks',
  type: 'U',
  upvotes_count: 324,
  pay_now_price_stripe_id: 'price_1K6JX7CD3MPWHCo8oL6VpZD1',
  pay_now_price_unit_amount: 1000,
  avg_rating: '4.700',
  organization: {
    name: 'Solution Provider Organization',
    logo_url: null,
  },
  assets: [
    {
      id: 1,
      slug: 'mailchimp',
      name: 'Mailchimp',
      logo_url: 'http://logo.clearbit.com/mailchimp.com',
      logo: null,
      website: 'http://mailchimp.com/',
    },
    {
      id: 2,
      slug: 'test',
      name: 'Test',
      logo_url: 'http://logo.clearbit.com/campaignmonitor.com',
      logo: null,
      website: null,
    },
    {
      id: 3,
      slug: 'Test1',
      name: 'test1',
      logo_url:
        'https://uploads-ssl.webflow.com/616ec74e8792443f1fa65777/61770851a4e37b287caf6c31_Intropages_LOGO_final-02-p-500.png',
      logo: null,
      website: null,
    },
    {
      id: 4,
      slug: 'test2',
      name: 'Test2',
      logo_url: 'https://logo.clearbit.com/clockify.me',
      logo: null,
      website: null,
    },
  ],
}

export function DefaultSolutionListingCard() {
  return <SolutionListingCard listingData={listingData} />
}

export function DefaultSolutionListingBoxCard() {
  return <SolutionListingBoxCard listingData={listingData} className="w-[15rem] h-[14rem]" />
}
