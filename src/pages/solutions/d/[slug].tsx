import React from 'react'
import { withSessionSSR } from '@taggedweb/utils/session'
import { fetchSolutionDetail } from '@taggedweb/solution-queries/fetch-solution-detail'
import { Breadcrumb } from '@taggedweb/components/breadcrumb'
import { SolutionDetailSidebar } from '@taggedweb/components/solution-detail-sidebar'
import { SolutionDetailIntroduction } from '@taggedweb/components/solution-detail-introduction'
import { SolutionDetailRelatedProduct } from '@taggedweb/components/solution-detail-related-product'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    params: { slug },
  } = context
  let solutionDetail
  try {
    solutionDetail = await fetchSolutionDetail(context.req.session, slug)
  } catch (error) {
    // eslint-disable-next-line
    // TODO: Redirect to solution search page.
  }
  return {
    props: { solutionDetail },
  }
})

export default function SolutionDetail({ solutionDetail }) {
  if (!solutionDetail || typeof solutionDetail === 'undefined') return null

  const breadcrumbData = [
    {
      name: 'Search',
      url: '#',
      is_selected: false,
    },
    {
      name: solutionDetail.type === 'I' ? 'Integrations' : solutionDetail.type === 'U' ? 'Usage Support' : 'Other',
      url: '#',
      is_selected: false,
    },
    {
      name:
        solutionDetail.primary_tag?.name ||
        (solutionDetail?.tags && solutionDetail?.tags?.length > 0 ? solutionDetail?.tags[0]?.name : ''),
      url: '#',
      is_selected: true,
    },
  ]
  let price = solutionDetail.prices.filter((price) => price.is_primary === true)[0]
  if (price?.length === 0) price = solutionDetail.prices[0]

  const solutionSidebarInfo = {
    price: price?.price,
    features: [
      { name: '10 Ready Capacity' },
      { name: '14 Eta Days' },
      { name: 'Free Trial' },
      { name: 'Benefit 4' },
      { name: 'Benefit 5' },
    ],
  }

  const introductionData = {
    tag: {
      name: solutionDetail.type === 'I' ? 'Integrations' : solutionDetail.type === 'U' ? 'Usage Support' : 'Other',
      slug: solutionDetail.type === 'I' ? 'integrations' : solutionDetail.type === 'U' ? 'ssage-support' : 'other',
    },
    title: solutionDetail.title,
    upvoted_count: 324,
    users_count: 1100,
    provide_organization: {
      name: solutionDetail.organization.name,
      logo_url: solutionDetail.organization.logo_url,
      website: solutionDetail.organization.website,
    },
    overview_description: solutionDetail.description ?? '',
    scope_of_work_description: solutionDetail.scope_of_work ?? '',
    sidebar_info: solutionSidebarInfo,
  }
  const relatedProducts = solutionDetail.assets ?? []

  return (
    <div className="flex flex-col max-w-screen-lg px-4 mx-auto my-6">
      <Breadcrumb breadcrumbs={breadcrumbData} />
      <div className="flex mt-6">
        <div className="flex w-full border border-solid rounded-md md:p-4 md:mr-4 border-border-default">
          <SolutionDetailIntroduction introductionData={introductionData} />
        </div>
        <SolutionDetailSidebar
          detailInfo={solutionSidebarInfo}
          className="w-[15rem] h-full sticky top-16 hidden md:flex"
        />
      </div>
      <div className="flex flex-col pb-6 mt-8">
        {relatedProducts.length > 0 && <h4 className="pb-4 text-lg font-bold text-black">Related SaaS Products</h4>}
        <SolutionDetailRelatedProduct relatedProducts={relatedProducts} />
      </div>
    </div>
  )
}
