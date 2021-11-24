import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { ServiceDetailCard } from '@taggedweb/components/service-card'
import { ServiceDetailSidebar } from '@taggedweb/components/service-detail/sidebar'
import { ServiceDetailTab } from '@taggedweb/components/service-detail/tab'
import { HighlightSection } from '@taggedweb/components/service-detail/highlight-content'
import { PricingContent } from '@taggedweb/components/service-detail/pricing-content'
import { ProductContent } from '@taggedweb/components/service-detail/product-content'
import { QaContent } from '@taggedweb/components/service-detail/qa-content'
import { RelatedContent } from '@taggedweb/components/service-detail/related-content'
import { ReviewsContainer } from '@taggedweb/components/service-detail/get-reviews'
import { Asset } from '@taggedweb/types/asset'
import { withSessionSSR } from '@taggedweb/utils/session'
import { fetchServiceServer } from '@taggedweb/server-queries/fetch-service'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'

export default function Service() {
  const { query } = useRouter()
  const { slug } = query as { slug: string }
  // @TODO: Use isLoading, error

  // eslint-disable-next-line
  const { data, error } = useSWR(`/api/assets/${slug}`)

  const elements = [
    {
      id: 'products-information',
      name: 'Product Information',
      content: <ProductContent service={data as Asset} />,
    },
    {
      id: 'features',
      name: 'Features',
      content: <HighlightSection service={data as Asset} />,
    },
    {
      id: 'pricing',
      name: 'Pricing',
      content: <PricingContent service={data as Asset} />,
    },
    {
      id: 'qa',
      name: 'Q & A',
      content: <QaContent service={data as Asset} />,
    },
    {
      id: 'reviews',
      name: 'Reviews',
      content: (
        <ReviewsContainer
          assetId={data?.id}
          assetName={data?.name}
          avgRating={data?.avg_rating ?? 0}
          reviewsCount={data?.reviews_count ?? 0}
        />
      ),
    },
    {
      id: 'related-products',
      name: 'Related Software',
      content: <RelatedContent name={data.name} slug={data.slug} />,
    },
  ]
  const primary_tag = data.tags[0]

  return (
    <>
      <DynamicHeader
        title={`Best ${primary_tag?.name ?? ''} Software and Solutions in ${new Date().getFullYear()}`}
        description={`Best ${primary_tag?.name ?? ''} Software`}
      />
      <div className="min-h-full p-4 bg-background-light">
        <div className="max-w-screen-lg mx-auto">
          <ServiceDetailCard service={data as Asset} />
          {/* Sidebar will be rendered in Desktop */}
          <ServiceDetailSidebar elements={elements} />
          {/* Tab will be rendered in Mobile */}
          <ServiceDetailTab elements={elements} />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    params: { slug },
  } = context
  const data = await fetchServiceServer(context.req.session, slug)
  return {
    props: {
      fallback: {
        [`/api/assets/${slug}`]: data,
      },
    },
  }
})
