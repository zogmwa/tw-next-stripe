import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { PricingCard } from './'

const plans = [
  {
    asset: 2,
    name: 'Essentials',
    summary:
      'For marketers who want to build relationships and grow sales with more email sends, customized branding, and 24/7 support.',
    currency: 'USD',
    price: '9.99',
    per: 'Month',
    features: [''],
    most_popular: true,
  },
  {
    asset: 2,
    name: 'Premium',
    summary: 'For high-volume senders who want all marketing features and phone support',
    currency: 'USD',
    price: '299',
    per: 'Month',
    features: [
      'For upto 10,000 contacts.',
      'Advanced Segmentation',
      'Multivariate Testing',
      'Comparative Reporting',
      'Unlimited Seats & Role-Based Access',
      'Phone Support',
    ],
  },
  {
    asset: 2,
    name: 'Standard',
    summary: 'For advanced businesses that want more automations and data-powered tools.',
    currency: 'USD',
    price: '14.99',
    per: 'Month',
    features: [
      'With 500 contacts, For additional number of contacts pricing may vary.',
      'Customer Journey Builder + Branching Points',
      'Send Time Optimization',
      'Behavioral Targeting',
      'Custom Templates',
      'Dynamic Content',
    ],
  },
]

export default {
  title: 'General/UpdatedPricingCard',
  component: PricingCard,
} as Meta

export function DefaultPricingCard() {
  return <PricingCard pricePlans={plans} />
}
