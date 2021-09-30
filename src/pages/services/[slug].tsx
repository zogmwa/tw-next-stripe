import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { fetchService } from '../../queries/service'
import { ServiceDetailCard } from '../../components/service-card'
import { ServiceDetailSidebar } from '../../components/service-detail/sidebar'
import { ServiceDetailTab } from '../../components/service-detail/tab'
import { FeaturesContent } from '../../components/service-detail/features-content'
import { PricingContent } from '../../components/service-detail/pricing-content'
import { ProductContent } from '../../components/service-detail/product-content'
import { QaContent } from '../../components/service-detail/qa-content'
import { RelatedContent } from '../../components/service-detail/related-content'
import { ReviewsContent } from '../../components/service-detail/reviews-content'
import { Asset } from '../../types/asset'

export default function Service() {
  const { query } = useRouter()
  const { slug } = query as { slug: string }
  // @TODO: Use isLoading, error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, data, error } = useQuery(['services', slug], () => fetchService(slug))
  const elements = [
    {
      id: 'products-information',
      name: 'Product Information',
      content: <ProductContent />,
    },
    {
      id: 'features',
      name: 'Features',
      content: <FeaturesContent />,
    },
    {
      id: 'pricing',
      name: 'Pricing',
      content: <PricingContent />,
    },
    {
      id: 'qa',
      name: 'Q & A',
      content: <QaContent />,
    },
    {
      id: 'reviews',
      name: 'Reviews',
      content: <ReviewsContent />,
    },
    {
      id: 'related-products',
      name: 'Related Products',
      content: <RelatedContent />,
    },
  ]

  return (
    <div className="min-h-full p-4 bg-background-light">
      <div className="max-w-screen-lg mx-auto">
        <ServiceDetailCard service={data as Asset} />
        {/* Sidebar will be rendered in Desktop */}
        <ServiceDetailSidebar elements={elements} />
        {/* Tab will be rendered in Mobile */}
        <ServiceDetailTab elements={elements} />

        {/* <pre>
          <code className="text-xs whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</code>
        </pre> */}
      </div>
    </div>
  )
}
