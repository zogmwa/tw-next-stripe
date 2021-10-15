import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { RelatedProductCard } from './related-product-card'

export default {
  title: 'General/RelatedProductCard',
  component: RelatedProductCard,
} as Meta

export function DefaultServicePricingCard() {
  const relatedProductMockupData = [
    {
      id: 1,
      logo_url: 'http://logo.clearbit.com/mailchimp.com',
      name: 'Stripe Payment Link1',
      description: 'Create a link. Sell anywhere',
    },
    {
      id: 2,
      logo_url: 'http://logo.clearbit.com/mailchimp.com',
      name: 'Slack',
      description: 'Provides interactive video sharing to work',
    },
    {
      id: 3,
      logo_url: 'http://logo.clearbit.com/mailchimp.com',
      name: 'Stripe Payment Link3',
      description: 'Create a link. Sell anywhere',
    },
    {
      id: 4,
      logo_url: 'http://logo.clearbit.com/mailchimp.com',
      name: 'Stripe Payment Link4',
      description: 'Create a link. Sell anywhere',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      {relatedProductMockupData.map((relatedProduct, index) => (
        <RelatedProductCard relatedProduct={relatedProduct} key={index} />
      ))}
    </div>
  )
}
