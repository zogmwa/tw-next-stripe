import React, { useState, useEffect } from 'react'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { fetchAssetSimilar } from '../../queries/service'
import { Button } from '../button'
import { RelatedProductCard } from '../related-product-card'

type RelateName = {
  name: string
}
function RelatedContentComponent({ name }: RelateName) {
  const [viewMore, setViewMore] = useState(false)
  const [relatedProductsList, setRelatedProductsList] = useState([])
  const defaultShowCount = 4

  useEffect(() => {
    async function getAssetSimilarList() {
      const assetSimilarList = await fetchAssetSimilar(name)
      if (assetSimilarList) {
        setRelatedProductsList(assetSimilarList.slice(1))
      } else {
        setRelatedProductsList([])
      }
    }

    getAssetSimilarList()
  }, [])
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
    {
      id: 5,
      logo_url: 'http://logo.clearbit.com/mailchimp.com',
      name: 'Stripe Payment Link5',
      description: 'Create a link. Sell anywhere',
    },
  ]
  let viewRelatedProducts = relatedProductsList
  if (!viewMore) {
    viewRelatedProducts = relatedProductsList.slice(0, 4)
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="my-2 text-base font-medium text-text-primary">Related Products</h1>
        <Button buttonType="primary" className="self-start text-white bg-primary">
          Compare
        </Button>
      </div>
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
