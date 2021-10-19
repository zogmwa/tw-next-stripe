import React from 'react'
import { ServicesCompareCard } from '../components/compare/services-detail'
import { ServiceCompareTab } from '../components/compare/tab'
import { CompareSummaryCard } from '../components/compare/summary-card'
import { fetchServicesDetailCompareServer } from '../server-queries/fetch-services-compare-detail'

export const getServerSideProps = async ({ query }) => {
  /*
   ** https://github.com/vercel/next.js/discussions/13301
   ** Because of this I added favicon to /public
   */
  const { services: serviceSlugs } = query
  const servicesUrl = '?asset__slugs=' + serviceSlugs.join('&asset__slugs=')
  const services = await fetchServicesDetailCompareServer(servicesUrl)
  return {
    props: { services },
  }
}

export default function CompareList({ services }) {
  const elements = [
    {
      id: 'products-information',
      name: 'Product Information',
      content: <CompareSummaryCard services={services} />,
    },
    {
      id: 'features',
      name: 'Features',
      content: <div />,
    },
    {
      id: 'pricing',
      name: 'Pricing',
      content: <div />,
    },
    {
      id: 'qa',
      name: 'Q & A',
      content: <div />,
    },
    {
      id: 'reviews',
      name: 'Reviews',
      content: <div />,
    },
    {
      id: 'related-products',
      name: 'Related Products',
      content: <div />,
    },
  ]

  return (
    <div className="min-h-full p-4 bg-background-light">
      <div className="max-w-screen-lg mx-auto">
        <ServicesCompareCard services={services} />
        <ServiceCompareTab elements={elements} />
      </div>
    </div>
  )
}
