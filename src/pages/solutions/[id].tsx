import React from 'react'
import { withSessionSSR } from '@taggedweb/utils/session'
import { fetchSolutionDetail } from '@taggedweb/queries/solution'
import { Breadcrumb } from '@taggedweb/components/breadcrumb'
import { SolutionDetailSidebar } from '@taggedweb/components/solution-detail-sidebar'
import { SolutionDetailIntroduction } from '@taggedweb/components/solution-detail-introduction'
import { SolutionDetailRelatedProduct } from '@taggedweb/components/solution-detail-related-product'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    params: { id },
  } = context

  const solutionDetail = await fetchSolutionDetail(id)

  return {
    props: { solutionDetail },
  }
})

export default function SolutionDetail({ solutionDetail }) {
  if (!solutionDetail || typeof solutionDetail === 'undefined') return null
  console.log(solutionDetail)

  const solutionSidebarInfo = {
    price: solutionDetail.price,
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
      name: solutionDetail.type === 'I' ? 'Integrations' : 'Usage Support',
      slug: solutionDetail.type === 'I' ? 'integrations' : 'usage-support',
    },
    title: solutionDetail.name,
    upvoted_count: 324,
    users_count: 1100,
    provide_organization: {
      name: solutionDetail.organization.name,
      logo_url: solutionDetail.organization.logo_url,
      website: solutionDetail.organization.website,
    },
    overview_description: solutionDetail.description ?? '',
    scope_of_work_description: solutionDetail.scope_of_work ?? '',
  }

  return (
    <>
      <div className="flex max-w-screen-lg mx-auto mt-6">
        <div className="flex w-full p-4 mr-4 border border-solid rounded-md border-border-default">
          <SolutionDetailIntroduction introductionData={introductionData} />
        </div>
        <SolutionDetailSidebar detailInfo={solutionSidebarInfo} className="w-[15rem] h-full sticky top-16" />
      </div>
    </>
  )
}
