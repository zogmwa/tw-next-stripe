import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { withSessionSSR } from '@taggedweb/utils/session'
import { fetchServiceServer } from '@taggedweb/server-queries/fetch-service'
import { ServiceDetailCard } from '@taggedweb/components/service-card'
import { patchAssetField } from '@taggedweb/queries/service'
import { ServiceDetailSidebar } from '@taggedweb/components/service-detail/sidebar'
import { ServiceDetailTab } from '@taggedweb/components/service-detail/tab'
import { HighlightSection } from '@taggedweb/components/service-detail/highlight-content'
import { PricingContent } from '@taggedweb/components/service-detail/pricing-content'
import { ProductContent } from '@taggedweb/components/service-detail/product-content'
// import { QaContent } from '@taggedweb/components/service-detail/qa-content'
// import { RelatedContent } from '@taggedweb/components/service-detail/related-content'
// import { ReviewsContainer } from '@taggedweb/components/service-detail/get-reviews'
import { Asset } from '@taggedweb/types/asset'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'
import { TOAST_SOFTWARE_EDIT_SUCCESS } from '@taggedweb/utils/token-id'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    params: { slug },
  } = context
  const service = await fetchServiceServer(context.req, slug)
  const editAllowed = service?.edit_allowed ?? false

  if (!editAllowed) {
    return {
      redirect: {
        destination: `/software/${slug}`,
        permanent: false,
      },
    }
  }
  return {
    props: { service },
  }
})

export default function Service({ service }) {
  const [showService, setShowService] = useState(service)
  const editAllowed = service?.edit_allowed ?? false

  const handleChange = async (data) => {
    const updatedData = await patchAssetField(data, service.slug)
    if (updatedData) {
      setShowService(updatedData)
      toast.success('Updated successfully.', {
        id: TOAST_SOFTWARE_EDIT_SUCCESS,
      })
    }
  }

  const elements = [
    {
      id: 'products-information',
      name: 'Product Information',
      content: <ProductContent service={showService as Asset} editAllowed={editAllowed} onChange={handleChange} />,
    },
    {
      id: 'features',
      name: 'Features',
      content: <HighlightSection service={showService as Asset} editAllowed={editAllowed} onChange={handleChange} />,
    },
    {
      id: 'pricing',
      name: 'Pricing',
      content: <PricingContent service={showService as Asset} editAllowed={editAllowed} onChange={handleChange} />,
    },
    // {
    //   id: 'qa',
    //   name: 'Q & A',
    //   content: <QaContent service={service as Asset} />,
    // },
    // {
    //   id: 'reviews',
    //   name: 'Reviews',
    //   content: (
    //     <ReviewsContainer
    //       assetId={service?.id}
    //       assetName={service?.name}
    //       avgRating={service?.avg_rating ?? 0}
    //       reviewsCount={service?.reviews_count ?? 0}
    //     />
    //   ),
    // },
    // {
    //   id: 'related-products',
    //   name: 'Related Products',
    //   content: <RelatedContent name={service.name} slug={service.slug} />,
    // },
  ]

  return (
    <>
      <DynamicHeader />
      <div className="min-h-full p-4 bg-background-light">
        <div className="max-w-screen-lg mx-auto">
          <ServiceDetailCard
            service={showService}
            editAllowed={editAllowed}
            onChange={(field, value) => {
              const data = { [field]: value }
              handleChange(data)
            }}
          />
          {/* Sidebar will be rendered in Desktop */}
          <ServiceDetailSidebar elements={elements} />
          {/* Tab will be rendered in Mobile */}
          <ServiceDetailTab elements={elements} />
        </div>
      </div>
    </>
  )
}
