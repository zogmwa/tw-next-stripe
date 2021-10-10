import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { ServiceDetailCard } from '../../components/service-card'
import { ServiceDetailSidebar } from '../../components/service-detail/sidebar'
import { ServiceDetailTab } from '../../components/service-detail/tab'
import { HighlightSection } from '../../components/service-detail/highlight-content'
import { PricingContent } from '../../components/service-detail/pricing-content'
import { ProductContent } from '../../components/service-detail/product-content'
import { QaContent } from '../../components/service-detail/qa-content'
import { RelatedContent } from '../../components/service-detail/related-content'
import { ReviewsContainer } from '../../components/service-detail/get-reviews'
import { Asset } from '../../types/asset'
import { withSessionSSR } from '../../utils/session'
import { fetchServiceServer } from '../../server-queries/fetch-service'

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
      content: <ReviewsContainer />,
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
      </div>
    </div>
  )
}

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    params: { slug },
  } = context

  try {
    const data = await fetchServiceServer(context.req.session, slug)
    return {
      props: {
        fallback: {
          [`/api/assets/${slug}`]: data,
        },
      },
    }
  } catch (error) {
    const errorCode = error?.response?.status
    return {
      props: {
        errorCode: errorCode ?? 503,
      },
    }
  }
})
