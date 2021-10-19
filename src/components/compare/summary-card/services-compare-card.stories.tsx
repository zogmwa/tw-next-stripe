import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { CompareCard } from './services-summary-card'

export default {
  title: 'General/CompareSummary',
  component: CompareCard,
} as Meta

const mockupServices = [
  {
    logo_url: 'http://logo.clearbit.com/mailchimp.com',
    short_description: 'Mailchimp helps small businesses do big things with the right tools.',
    description:
      'Mailchimp helps small businesses do big things, with the right tools and guidance every step of the way.\r\n\r\n* Marketing\r\n* Websites and Commerce\r\n* Transactional Emails',
    tags: [
      {
        slug: 'email-marketing',
        name: 'Email Marketing',
      },
      {
        slug: 'landing-pages',
        name: 'Landing Pages',
      },
      {
        slug: 'marketing',
        name: 'Marketing',
      },
    ],
    upvotes_count: 10,
    name: 'Mailchimp',
    slug: 'mail-chimp',
    id: 1,
    has_free_trial: true,
    reviews_count: 1000,
    avg_rating: '8.1000',
    users_count: 1100,
    website: 'http://mailchimp.com/',
    my_asset_vote: null,
    affiliate_link: 'https://google.com/search?q=mail-chimp',
  },
  {
    logo_url: 'http://logo.clearbit.com/campaignmonitor.com',
    description:
      'Campaign Monitor is an email marketing tool that enables marketers to send beautiful and personalized emails, creating a reliable channel to grow engagement with subscribers and promote loyal readership and conversions.\r\n\r\n* Email templates\r\n* Drag-and-drop builder\r\n* Engagement-based segmentation (Allows digital marketers to deliver targeted content to lists of subscribers without any technical expertise)',
    tags: [
      {
        slug: 'email-marketing',
        name: 'Email Marketing',
      },
    ],
    upvotes_count: 10,
    name: 'Campaign Monitor',
    slug: 'campaign-monitor',
    id: 2,
    has_free_trial: false,
    reviews_count: 457,
    avg_rating: '10.000',
    users_count: 102,
    my_asset_vote: null,
  },
]

export function DefaultServiceCompare() {
  return <CompareCard services={mockupServices} />
}
