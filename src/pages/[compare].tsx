import React from 'react'
import { CompareServiceCard } from '../components/compare/services-detail'
import { CompareServiceTab } from '../components/compare/tab'
import { CompareServiceSummaryCard } from '../components/compare/summary-card'
import { fetchServicesDetailCompareServer } from '../server-queries/fetch-services-compare-detail'
import { CompareServiceProduct } from '../components/compare/page-cards/product'
import { CompareServiceCarousel } from '../components/compare/page-cards/carousel'
import { CompareServiceProsCons } from '../components/compare/page-cards/pros-cons/pros-cons'
import { CompareServiceRating } from '../components/compare/page-cards/rating'
import { CompareServicePricing } from '../components/compare/page-cards/pricing/pricing'
import { CompareServiceUsedBy } from '../components/compare/page-cards/used-by'
import { withSessionSSR } from '../utils/session'
import { CompareServiceScrollNavbar } from '../components/compare/scroll-navbar'

export const getServerSideProps = withSessionSSR(async (context) => {
  /*
   ** https://github.com/vercel/next.js/discussions/13301
   ** Added favicon to /public
   */
  const serviceSlugs = context.query.services
  let tempServiceSlugs = []
  for (let i = 0; i < serviceSlugs.length; i++) {
    tempServiceSlugs.push(serviceSlugs[i])
  }
  const sendUrl = '?asset__slugs=' + tempServiceSlugs.join('&asset__slugs=')
  const services = await fetchServicesDetailCompareServer(context.req.session, sendUrl)
  return {
    props: { services },
  }
})

export default function CompareList({ services }) {
  const elements = [
    {
      id: 'products-information',
      name: 'Product Information',
      content: (
        <div>
          <CompareServiceSummaryCard services={services} />
          <CompareServiceProduct services={services} />
          <CompareServiceCarousel services={services} />
        </div>
      ),
    },
    {
      id: 'features',
      name: 'Features',
      content: <CompareServiceProsCons services={services} />,
    },
    {
      id: 'pricing',
      name: 'Pricing',
      content: <CompareServicePricing services={services} />,
    },
    {
      id: 'qa',
      name: 'Q & A',
      content: <div />,
    },
    {
      id: 'reviews',
      name: 'Reviews',
      content: <CompareServiceRating services={services} />,
    },
    {
      id: 'related-products',
      name: 'Related Products',
      content: <CompareServiceUsedBy services={services} />,
    },
  ]

  return (
    <div className="min-h-full p-4 bg-background-light">
      <div className="max-w-screen-lg mx-auto">
        <CompareServiceCard services={services} />
        <CompareServiceTab elements={elements} />
        <CompareServiceScrollNavbar elements={elements} />
      </div>
    </div>
  )
}
