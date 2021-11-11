import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { SolutionDetailRelatedProduct } from './index'

export default {
  title: 'General/SolutionDetailRelatedProduct',
  component: SolutionDetailRelatedProduct,
} as Meta

const relatedProducts = [
  {
    name: 'Mailchimp',
    logo_url: 'http://logo.clearbit.com/mailchimp.com',
    slug: 'mailchimp',
  },
  {
    name: 'GetResponse',
    logo_url: 'http://logo.clearbit.com/getresponse.com',
    slug: 'getresponse',
  },
  {
    name: 'AWeber',
    logo_url: 'http://logo.clearbit.com/aweber.com',
    slug: 'aweber',
  },
  {
    name: 'Campaign Monitor',
    logo_url: 'http://logo.clearbit.com/campaignmonitor.com',
    slug: 'campaign-monitor',
  },
  {
    name: 'PersistIQ',
    logo_url: 'https://logo.clearbit.com/www.persistiq.com',
    slug: 'persistiq',
  },
  {
    name: 'Hubspot Marketing Hub',
    logo_url: 'http://logo.clearbit.com/hubspot.com',
    slug: 'hubspot-marketing-hub',
  },
]

export function DefaultSolutionDetailIntroduction() {
  return <SolutionDetailRelatedProduct relatedProducts={relatedProducts} />
}
