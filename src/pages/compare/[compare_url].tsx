import React from 'react'
import { CompareServiceCard } from '@taggedweb/components/compare/services-detail'
// import { CompareServiceTab } from '@taggedweb/components/compare/tab'
import { CompareServiceSummaryCard } from '@taggedweb/components/compare/summary-card'
import { fetchServicesDetailCompareServer } from '@taggedweb/server-queries/fetch-services-compare-detail'
import { CompareServiceProduct } from '@taggedweb/components/compare/page-cards/product'
import { CompareServiceCarousel } from '@taggedweb/components/compare/page-cards/carousel'
import { CompareServiceProsCons } from '@taggedweb/components/compare/page-cards/pros-cons/pros-cons'
import { CompareServiceRating } from '@taggedweb/components/compare/page-cards/rating'
import { CompareServicePricing } from '@taggedweb/components/compare/page-cards/pricing/pricing'
import { CompareServiceUsedBy } from '@taggedweb/components/compare/page-cards/used-by'
import { withSessionSSR } from '@taggedweb/utils/session'
import { CompareServiceScrollNavbar } from '@taggedweb/components/compare/scroll-navbar'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'
import { Asset } from '@taggedweb/types/asset'

export const getServerSideProps = withSessionSSR(async (context) => {
  /*
   ** https://github.com/vercel/next.js/discussions/13301
   ** Added favicon to /public
   */
  const {
    params: { compare_url },
  } = context

  const SplitTheString = (url) => {
    if (url != null) {
      const SplitChars = '-vs-'
      return url.split(SplitChars)
    }
  }

  const tempServiceSlugs = SplitTheString(compare_url)
  const sendUrl = '?asset__slugs=' + tempServiceSlugs.join('&asset__slugs=')
  const tempServices = await fetchServicesDetailCompareServer(context.req, sendUrl)
  const services = []
  for (let serviceSlugIndex = 0; serviceSlugIndex < tempServiceSlugs.length; serviceSlugIndex++) {
    for (let serviceIndex = 0; serviceIndex < tempServices.length; serviceIndex++) {
      if (tempServiceSlugs[serviceSlugIndex] === tempServices[serviceIndex].slug) {
        services.push(tempServices[serviceIndex])
      }
    }
  }

  return {
    props: { services },
  }
})

type CompareServiceCardProps = {
  services: Asset[]
}

export default function CompareList({ services }: CompareServiceCardProps) {
  const elements = [
    {
      id: 'products-information',
      name: 'Product Information',
      content: (
        <div className="space-y-10">
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
    // {
    //   id: 'qa',
    //   name: 'Q & A',
    //   content: <div />,
    // },
    {
      id: 'reviews',
      name: 'Reviews',
      content: <CompareServiceRating services={services} />,
    },
    {
      id: 'organisations',
      name: 'Organisations',
      content: <CompareServiceUsedBy services={services} />,
    },
  ]
  return (
    <>
      <DynamicHeader
        title={`${services[0]?.name ?? ''} vs ${services[1]?.name ?? ''}${
          services[2] ? ' vs ' + services[2].name : ''
        } [${new Date().getFullYear()}] | Taggedweb`}
        description={`Trying to choose between ${services[0]?.name ?? ''} and ${services[1]?.name ?? ''}${
          services[2] ? ' and ' + services[2].name : ''
        }? Want to compare across features, pricing, customer organisations? Look no further. We’ve compared these ${
          services[0].tags[0].name ? services[0]?.tags[0].name + ' ' : '' ?? ''
        }tools to help you make the best choice for your business.`}
      />
      <div className="min-h-full p-4 bg-background-light">
        <div className="max-w-screen-lg mx-auto">
          <CompareServiceCard services={services} />
          {/* <CompareServiceTab elements={elements} /> */}
          <CompareServiceScrollNavbar elements={elements} />
        </div>
      </div>
    </>
  )
}
