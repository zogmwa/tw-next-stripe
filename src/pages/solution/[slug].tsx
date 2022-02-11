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
import { formatConsideringPlurality } from '@taggedweb/utils/formatConsideringPlurality'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    params: { slug },
  } = context
  const prevURL = context.req.headers.referer || null
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
    props: { solutionDetail, prevURL },
  }
})

export default function SolutionDetail({ solutionDetail, prevURL }) {
  if (!solutionDetail || typeof solutionDetail === 'undefined') return null
  const prevUrlArr = prevURL ? prevURL.split('/') : []
  const prevUrlSlug =
    prevUrlArr.length >= 2 && prevUrlArr[prevUrlArr.length - 2] === 'solutions'
      ? prevUrlArr[prevUrlArr.length - 1]
      : solutionDetail.slug
  const breadcrumbData = [
    {
      name: 'Search',
      url: `${process.env.SITE_BASE_URL}/#solution-search`,
      is_selected: false,
    },
    {
      name: 'Solutions',
      url: `${process.env.SITE_BASE_URL}/solutions/${prevUrlSlug}`,
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
  if (solutionDetail.is_metered) {
    if (solutionDetail.estimated_hours) {
      features.push({
        id: 'eta-hours',
        name: `Estimated Hours to Fulfill: ${solutionDetail.estimated_hours}`,
        tooltipContent: 'This is an estimate on number of hours it will take to provide.',
      })
    }
    if (solutionDetail.billing_period) {
      features.push({
        id: 'billing_period',
        name: `Billing Period: ${solutionDetail.billing_period}`,
        tooltipContent: 'This is a billing period.',
      })
    }
  } else {
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
        name: 'Free Consultation',
        tooltipContent: 'This Solution has free consultation.',
      })
    }
    if (solutionDetail.follow_up_hourly_rate) {
      features.push({
        id: 'hourly-rate',
        name: `$${solutionDetail.follow_up_hourly_rate} per/hour for follow-ups beyond SoW`,
        tooltipContent: 'This is the estimated hourly rate for followup work beyond scope of work.',
      })
    }
  }
  let currCapacity = (solutionDetail?.capacity ?? 0) - (solutionDetail?.capacity_used ?? 0)
  const getFeatureName = () => {
    const capacity = formatConsideringPlurality(currCapacity, 'more slot')
    if (currCapacity == 0) return 'No slots available at this time'
    return `Only ${capacity} available at this time`
  }
  features.push({
    id: 'capacity',
    name: getFeatureName(),
    tooltipContent:
      'To prevent overwhelming of the provider we limit the number of active bookings per available capacity.',
  })
  if (solutionDetail.capacity - solutionDetail.capacity_used <= 0 || price.stripe_price_id === '') {
    purchaseDisableOption = true
  }

  const solutionSidebarInfo = {
    is_metered: solutionDetail.is_metered,
    slug: solutionDetail.slug,
    pay_now_price: price,
    price: solutionDetail.is_metered ? solutionDetail.blended_hourly_rate ?? 0 : price?.price,
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
        image={solutionDetail.cover_image}
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
