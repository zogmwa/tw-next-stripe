import React, { useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { withSessionSSR } from '@taggedweb/utils/session'
import { fetchPartnerPricePlanData } from '@taggedweb/server-queries/fetch-partner-price-plan'
import { fetchPartnerPaymentMethods } from '@taggedweb/server-queries/fetch-partner-payment-methods'
import { toggleAssetPriceSubscribe } from '@taggedweb/queries/user'
import { MeteredPaymentMethodConfirm } from '@taggedweb/components/metered-payment-confirm'
import { ServiceLogo } from '@taggedweb/components/service-logo'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    params: { partner, price_id, customer_uid },
    query: { session_id },
  } = context
  let pageData, paymentList
  try {
    pageData = await fetchPartnerPricePlanData(context.req, customer_uid, price_id, session_id)
    if (pageData?.status === 'None data')
      return {
        notFound: true,
      }
    paymentList = await fetchPartnerPaymentMethods(context.req, customer_uid, session_id)
    if (!paymentList.has_payment_method) {
      return {
        redirect: {
          destination: `/partners/${partner}/${price_id}/${customer_uid}/add-payment-method?session_id=${session_id}`,
          permanent: false,
        },
        props: {},
      }
    }
  } catch (error) {
    return {
      notFound: true,
    }
    // eslint-disable-next-line
    // TODO: Redirect to add card page.
  }
  return {
    props: { pageData, paymentList },
  }
})

export default function AddCardDetailsPage({ pageData, paymentList }) {
  const { query } = useRouter()
  const [isSubscribe, setIsSubscribe] = useState(false)
  const [isshowConfirmModal, setIsShowConfrimModal] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState(paymentList.payment_methods)

  const addPaymentMethodUrl = `/partners/${query.partner}/${query.price_id}/${query.customer_uid}/add-payment-method?session_id=${query.session_id}`

  const toggleSubscribe = async (paymentMethodId) => {
    setIsSubscribe(true)
    const data = await toggleAssetPriceSubscribe(
      paymentMethodId,
      query.customer_uid,
      query.price_id,
      query.session_id as string,
    )
    if (data.status === 'Successfully subscribed') {
      toast.success(data.status)
      window.location.href = pageData.organization.website
    } else {
      toast.error(data.status)
    }
    setIsSubscribe(false)
  }

  return (
    <div className="flex flex-col max-w-screen-lg px-4 mx-auto my-6 md:flex-row divide md:divide-x divide-border-default md:my-24">
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center space-x-2">
          <ServiceLogo logoUrl={pageData.organization.logo_url} />
          <span className="text-lg font-semibold">{pageData.organization.name}</span>
        </div>
        <div className="flex p-4 space-x-2">
          <span className="font-semibold text-md">Software: </span>
          <a href={`/software/${pageData.price_plan.asset.slug}`} className="text-md text-text-primary hover:underline">
            {pageData.price_plan.asset.name}
          </a>
        </div>
        <div className="flex p-4 space-x-2">
          <span className="font-semibold text-md">Price: </span>
          <span className="text-md text-text-primary">{pageData.price_plan.name}</span>
        </div>
        <div className="flex p-4 space-x-2">
          <span className="font-semibold text-md">Currency: </span>
          <span className="text-md text-text-primary">{pageData.price_plan.currency}</span>
        </div>
        <div className="flex p-4 space-x-2">
          <span className="font-semibold text-md">Price: </span>
          <span className="text-md text-text-primary">{`$${pageData.price_plan.price} / ${pageData.price_plan.per}`}</span>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full py-10 border-t md:px-4 md:py-0 border-border-default md:border-0">
        <MeteredPaymentMethodConfirm
          slug=""
          setConfirmModalOpen={setIsShowConfrimModal}
          paymentMethods={paymentMethods}
          toggleSubScribe={toggleSubscribe}
          isSubscribe={isSubscribe}
          partner_customer_uid={query.customer_uid as string}
          session_id={query.session_id as string}
          partner_url={addPaymentMethodUrl}
        />
      </div>
    </div>
  )
}
