import React from 'react'
import 'reactjs-freshchat/dist/index.css'
import { withSessionSSR } from '@taggedweb/utils/session'
import { fetchSolutionDetail } from '@taggedweb/solution-queries/fetch-solution-detail'
import { Breadcrumb } from '@taggedweb/components/breadcrumb'
import { SolutionDetailSidebar } from '@taggedweb/components/solution-detail-sidebar'
import { SolutionDetailIntroduction } from '@taggedweb/components/solution-detail-introduction'
import { SolutionDetailRelatedProduct } from '@taggedweb/components/solution-detail-related-product'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'
import { unslugify } from '@taggedweb/utils/unslugify'
import { Solution, SolutionTypes } from '@taggedweb/types/solution'
import slugify from 'slugify'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    params: { slug },
  } = context
  let solutionDetail: Solution
  try {
    solutionDetail = await fetchSolutionDetail(context.req, slug)
  } catch (error) {
    return {
      notFound: true,
    }
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
      url: `${process.env.SITE_BASE_URL}/#solution-search`,
      is_selected: false,
    },
    {
      name: solutionDetail.type ? unslugify(String(SolutionTypes[solutionDetail.type])) : 'Other',
      url: '#',
      is_selected: false,
    },
    {
      name: unslugify(String(solutionDetail.slug)),
      url: '#',
      is_selected: true,
    },
  ]
  const copyUrl = process.env.SITE_BASE_URL + `/solution/${solutionDetail.slug}`
  const price = {
    stripe_price_id: solutionDetail.pay_now_price_stripe_id ?? '',
    price: solutionDetail.pay_now_price_unit_amount ?? 0,
  }

  let primary_tag = solutionDetail.primary_tag
  if (primary_tag?.length === 0) primary_tag = solutionDetail.tags[0]

  const features = []
  let purchaseDisableOption = false
  if (solutionDetail.eta_days) {
    features.push({
      id: 'eta-days',
      name: `Estimated Days to Fulfill: ${solutionDetail.eta_days}`,
      tooltipContent: 'This is an estimate on number of days it will take to deliver.',
    })
  }
  if (solutionDetail.has_free_consultation) {
    features.push({
      id: 'free-trial',
      name: 'Free Trial',
      tooltipContent: 'This Solution has free trial.',
    })
  }
  if (solutionDetail.follow_up_hourly_rate) {
    features.push({
      id: 'hourly-rate',
      name: `$${solutionDetail.follow_up_hourly_rate} per/hour for follow-ups beyond SoW`,
      tooltipContent: 'This is the estimated hourly rate for followup work beyond scope of work.',
    })
  }
  features.push({
    id: 'capacity',
    name: `Only ${
      (solutionDetail?.capacity ?? 0) - (solutionDetail?.capacity_used ?? 0)
    } more slots available at this time`,
    tooltipContent:
      'To prevent overwhelming of the provider we limit the number of active bookings per available capacity.',
  })
  if (solutionDetail.capacity - solutionDetail.capacity_used <= 0 || price.stripe_price_id === '') {
    purchaseDisableOption = true
  }

  const solutionSidebarInfo = {
    pay_now_price: price,
    price: price?.price,
    features: features,
    purchaseDisableOption: purchaseDisableOption,
    type: solutionDetail?.type,
  }
  solutionDetail.tags.push({
    name: solutionDetail.type ? unslugify(String(SolutionTypes[solutionDetail.type])) : 'Other',
    slug: slugify(solutionDetail.type ? SolutionTypes[solutionDetail.type] : 'Other').toLowerCase(),
  })
  const sidebar_info = solutionSidebarInfo
  const relatedProducts = solutionDetail.assets ?? []

  return (
    <>
      <DynamicHeader
        title={`${solutionDetail.title} | ${primary_tag?.name} Solution`}
        description={solutionDetail.description}
      />
      {/* Can also use scope_of_work field on solutionDetail for description */}
      <div className="flex flex-col max-w-screen-lg px-4 mx-auto my-6">
        <Breadcrumb breadcrumbs={breadcrumbData} copyUrl={copyUrl} />
        <div className="flex mt-6">
          <div className="flex w-full border border-solid rounded-md md:p-4 md:mr-4 border-border-default">
            <SolutionDetailIntroduction introductionData={solutionDetail} sidebar_info={sidebar_info} />
          </div>
          <SolutionDetailSidebar
            detailInfo={solutionSidebarInfo}
            className="w-[15rem] h-full sticky top-16 hidden md:flex"
          />
        </div>
        <div id="related-software" className="flex flex-col pb-6 mt-8">
          {relatedProducts.length > 0 && (
            <a href="#related-software">
              <h4 className="pb-4 text-lg font-bold text-black">Related Software</h4>
            </a>
          )}
          <SolutionDetailRelatedProduct relatedProducts={relatedProducts} />
        </div>
      </div>
    </>
  )
}
