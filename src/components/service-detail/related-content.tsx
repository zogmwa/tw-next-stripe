import React, { useState } from 'react'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { RelatedProductCard } from '../related-product-card'

function RelatedContentComponent() {
  const [viewMore, setViewMore] = useState(false)
  const defaultShowCount = 4
  const relatedProductMockupData = [
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
      isCompare: true,
    },
    {
      id: 3,
      imageUrl: 'http://logo.clearbit.com/mailchimp.com',
      title: 'Stripe Payment Link3',
      content: 'Create a link. Sell anywhere',
      isCompare: true,
    },
    {
      id: 4,
      imageUrl: 'http://logo.clearbit.com/mailchimp.com',
      title: 'Stripe Payment Link4',
      content: 'Create a link. Sell anywhere',
      isCompare: false,
    },
    {
      id: 5,
      imageUrl: 'http://logo.clearbit.com/mailchimp.com',
      title: 'Stripe Payment Link5',
      content: 'Create a link. Sell anywhere',
      isCompare: false,
    },
  ]
  let viewRelatedProducts = relatedProductMockupData
  if (!viewMore) {
    viewRelatedProducts = relatedProductMockupData.slice(0, 4)
  }

  return (
    <>
      <h1 className="my-2 text-base font-medium text-text-primary">Related Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {viewRelatedProducts.map((relatedProduct, index) => (
          <RelatedProductCard relatedProduct={relatedProduct} key={index} />
        ))}
      </div>
      {relatedProductMockupData.length > defaultShowCount ? (
        viewMore ? (
          <div
            className="flex self-start w-48 px-0 mt-2 text-sm border-0 cursor-pointer text-text-tertiary"
            onClick={() => setViewMore(false)}
          >
            Load Less alternatives
            <HiChevronUp className="self-center ml-2 text-text-tertiary" />
          </div>
        ) : (
          <div
            className="flex self-start w-48 px-0 mt-2 text-sm border-0 cursor-pointer text-text-tertiary"
            onClick={() => setViewMore(true)}
          >
            Load More alternatives
            <HiChevronDown className="self-center ml-2 text-text-tertiary" />
          </div>
        )
      ) : null}
    </>
  )
}

export const RelatedContent = RelatedContentComponent
