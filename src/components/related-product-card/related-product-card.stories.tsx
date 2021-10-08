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
      imageUrl: 'http://logo.clearbit.com/mailchimp.com',
      title: 'Stripe Payment Link1',
      content: 'Create a link. Sell anywhere',
      isCompare: false
    },
    {
      id: 2,
      imageUrl: 'http://logo.clearbit.com/mailchimp.com',
      title: 'Slack',
      content: 'Provides interactive video sharing to work',
      isCompare: false
    },
    {
      id: 3,
      imageUrl: 'http://logo.clearbit.com/mailchimp.com',
      title: 'Stripe Payment Link3',
      content: 'Create a link. Sell anywhere',
      isCompare: false
    },
    {
      id: 4,
      imageUrl: 'http://logo.clearbit.com/mailchimp.com',
      title: 'Stripe Payment Link4',
      content: 'Create a link. Sell anywhere',
      isCompare: false
    }
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      {relatedProductMockupData.map((relatedProduct, index) => 
        <RelatedProductCard relatedProduct={relatedProduct} key={index} />
      )}
    </div>
  )
}
