import React, { useState, useEffect } from 'react'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { fetchAssetSimilar } from '../../queries/service'
import { Button } from '../button'
import { RelatedProductCard } from '../related-product-card'
import { MAX_COMPARE_COUNT } from '../../utils/constants'

type RelateName = {
  name: string
  slug: string
}
function RelatedContentComponent({ name, slug }: RelateName) {
  const [viewMore, setViewMore] = useState(false)
  const [relatedProductsList, setRelatedProductsList] = useState([])
  const [compareRelatedList, setCompareRelatedList] = useState([])
  const router = useRouter()
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

  const handleCompare = () => {
    const compareList = compareRelatedList
    if (compareList.length < 1) {
      toast.error('You should check at least 1 service.')
      return
    } else if (compareList.length > MAX_COMPARE_COUNT) {
      toast.error('You can compare at most 3 services.')
      return
    } else {
      const services = compareList
      services.unshift(slug)
      router.push(
        {
          pathname: '/compare',
          query: {
            services,
          },
        },
        undefined,
        {
          shallow: true,
        },
      )
    }
  }

  const handleChecked = (value, serviceSlug) => {
    let checkedRelatedList = compareRelatedList
    if (value) {
      checkedRelatedList.push(serviceSlug)
      setCompareRelatedList(checkedRelatedList)
    } else {
      setCompareRelatedList(checkedRelatedList.filter((related) => related !== serviceSlug))
    }
  }

  let viewRelatedProducts = relatedProductsList
  if (!viewMore) {
    viewRelatedProducts = relatedProductsList.slice(0, 4)
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="my-2 text-base font-medium text-text-primary">Related Products</h1>
        <Button buttonType="primary" className="self-start text-white bg-primary" onClick={() => handleCompare()}>
          Compare
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {viewRelatedProducts.map((relatedProduct, index) => (
          <RelatedProductCard relatedProduct={relatedProduct} key={index} handleChecked={handleChecked} />
        ))}
      </div>
      {relatedProductsList.length > defaultShowCount ? (
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
