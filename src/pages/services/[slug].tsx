import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import Error from 'next/error'
import { fetchService } from '../../queries/service'
import { ServiceDetailCard } from '../../components/service-card'
import { ServiceDetailSidebar } from '../../components/service-detail/sidebar'
import { ServiceDetailTab } from '../../components/service-detail/tab'
import { HighlightContent } from '../../components/service-detail/highlight-content'
import { PricingContent } from '../../components/service-detail/pricing-content'
import { ProductContent } from '../../components/service-detail/product-content'
import { QaContent } from '../../components/service-detail/qa-content'
import { RelatedContent } from '../../components/service-detail/related-content'
import { ReviewsContainer } from '../../components/service-detail/get-reviews'
import { Asset } from '../../types/asset'

export default function Service({ errorCode, initialData }: { errorCode?: number; initialData?: Asset }) {
  const { query } = useRouter()
  const { slug } = query as { slug: string }

  const {
    isLoading, // eslint-disable-line @typescript-eslint/no-unused-vars
    data,
    error, // eslint-disable-line @typescript-eslint/no-unused-vars
  } = useQuery(['services', `${slug}?asset=${slug}`], () => fetchService(`${slug}?asset=${slug}`), {
    enabled: !errorCode,
  })

  const elements = [
    {
      id: 'products-information',
      name: 'Product Information',
      content: <ProductContent service={data as Asset} />,
    },
    {
      id: 'features',
      name: 'Features',
      content: <HighlightContent service={data as Asset} />,
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
      content: <ReviewsContainer />,
    },
    {
      id: 'related-products',
      name: 'Related Products',
      content: <RelatedContent />,
    },
  ]

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <div className="min-h-full p-4 bg-background-light">
      <div className="max-w-screen-lg mx-auto">
        <ServiceDetailCard service={data as Asset} />
        {/* Sidebar will be rendered in Desktop */}
        <ServiceDetailSidebar elements={elements} />
        {/* Tab will be rendered in Mobile */}
        <ServiceDetailTab elements={elements} />
      </div>
    </div>
  )
}
