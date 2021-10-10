import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { CompareOptions } from './compare-options'

export default {
  title: 'General/CompareOptions',
  component: CompareOptions,
} as Meta

export function DefaultCompareOptions() {
  const optionsMockupData = [
    {
      id: 1,
      imageUrl: 'http://logo.clearbit.com/mailchimp.com',
      title: 'Stripe Payment Link1',
      content: 'Create a link. Sell anywhere',
      isCompare: false,
    },
    {
      id: 2,
      imageUrl: 'http://logo.clearbit.com/mailchimp.com',
      title: 'Slack',
      content: 'Provides interactive video sharing to work',
      isCompare: false,
    },
    {
      id: 3,
      imageUrl: 'http://logo.clearbit.com/mailchimp.com',
      title: 'Stripe Payment Link3',
      content: 'Create a link. Sell anywhere',
      isCompare: false,
    },
    {
      id: 4,
      imageUrl: 'http://logo.clearbit.com/mailchimp.com',
      title: 'Stripe Payment Link4',
      content: 'Create a link. Sell anywhere',
      isCompare: false,
    },
  ]

  return <CompareOptions options={optionsMockupData} />
}
