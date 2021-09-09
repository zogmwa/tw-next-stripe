import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ServiceCard } from './service-card'

export default {
  title: 'General/ServiceCard',
  component: ServiceCard,
} as Meta

export function DefaultCard() {
  const asset1 = {
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
    has_free_trial: 'true',
    reviews_count: 1000,
    avg_rating: '8.1000',
    users_count: 1000,
  }
  const asset2 = {
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
    has_free_trial: 'false',
    reviews_count: 1000,
    avg_rating: '10.000',
    users_count: 1000,
  }
  return (
    <ul className="flex flex-col justify-start pb-8 divide-y divide">
      <li className="max-w-full transition duration-500 ease-in-out bg-background-surface hover:bg-background-light">
        <ServiceCard
          service={asset1}
          onToggleCompare={(isCompared) => {
            // eslint-disable-next-line no-console
            console.log(isCompared)
          }}
        />
      </li>
      <li className="max-w-full transition duration-500 ease-in-out bg-background-surface hover:bg-background-light">
        <ServiceCard
          service={asset2}
          onToggleCompare={(isCompared) => {
            // eslint-disable-next-line no-console
            console.log(isCompared)
          }}
        />
      </li>
    </ul>
  )
}
