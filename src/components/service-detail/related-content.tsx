import React, { useState, useEffect } from 'react'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import Link from 'next/link'
import { fetchAssetSimilar } from '@taggedweb/queries/service'
import { CompareAccordian } from '../compare-accordian'
import { Button } from '../button'
import { RelatedProductCard } from '../related-product-card'

type RelateName = {
  name: string
  slug: string
  logo: string
  id: string
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function RelatedContentComponent({ name, slug, logo, id }: RelateName) {
  const [viewMore, setViewMore] = useState(false)
  const [relatedProductsList, setRelatedProductsList] = useState([])
  const [compareRelatedList, setCompareRelatedList] = useState([])
  const defaultShowCount = 4

  useEffect(() => {
    async function getAssetSimilarList() {
      const assetSimilarList = await fetchAssetSimilar(slug)
      if (assetSimilarList) {
        setRelatedProductsList(assetSimilarList.slice(1))
      } else {
        setRelatedProductsList([])
      }
    }

    getAssetSimilarList()
  }, [])

  const handleChecked = (value, service) => {
    let checkedRelatedList = compareRelatedList
    if (checkedRelatedList.length === 0) {
      checkedRelatedList = [{ name, slug, logo_url: logo }]
    }
    if (value) {
      setCompareRelatedList([
        ...checkedRelatedList,
        { name: service.name, slug: service.slug, logo_url: service.logo_url },
      ])
    } else {
      setCompareRelatedList(checkedRelatedList.filter((related) => related.slug !== service.slug))
    }
  }

  const handleServiceRemove = (list) => {
    setCompareRelatedList(list)
  }

  let viewRelatedProducts = relatedProductsList
  if (!viewMore) {
    viewRelatedProducts = relatedProductsList.slice(0, 4)
  }

  return (
    <>
      <div className="flex justify-between">
        <a href={`#scrollable-${id}`}>
          <h1 className="my-2 text-base font-medium text-text-primary">Related Software</h1>
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {viewRelatedProducts.map((relatedProduct, index) => {
          const isChecked = !!compareRelatedList.find((item) => item.slug === relatedProduct.slug)
          return (
            <RelatedProductCard
              relatedProduct={relatedProduct}
              key={index}
              handleChecked={handleChecked}
              isChecked={isChecked}
            />
          )
        })}
      </div>
      <CompareAccordian checkedList={compareRelatedList} onServiceRemove={handleServiceRemove} />
      {relatedProductsList.length > defaultShowCount ? (
        viewMore ? (
          <div className="flex flex-col space-y-2">
            <div>
              <Link href={`/alternatives-or-similar-softwares/${slug}`}>
                <a>
                  <Button buttonType="primary" className="mt-2">
                    See Similar Services
                  </Button>
                </a>
              </Link>
            </div>
            <div
              className="flex self-start w-48 px-0 mt-2 text-sm border-0 cursor-pointer text-text-tertiary"
              onClick={() => setViewMore(false)}
            >
              Show Less
              <HiChevronUp className="self-center ml-2 text-text-tertiary" />
            </div>
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
