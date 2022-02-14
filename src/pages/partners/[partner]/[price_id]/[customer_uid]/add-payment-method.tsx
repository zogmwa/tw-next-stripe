import React, { useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { withSessionSSR } from '@taggedweb/utils/session'
import { fetchPartnerPricePlanData } from '@taggedweb/server-queries/fetch-partner-price-plan'
import {
  attachPaymentMethodForPartner,
  fetchPaymentMethodList,
  toggleAssetPriceSubscribe,
} from '@taggedweb/queries/user'
import { AddPaymentCardDetail } from '@taggedweb/components/add-payment-card-detail'
import { MeteredPaymentMethodConfirm } from '@taggedweb/components/metered-payment-confirm'
import { ServiceLogo } from '@taggedweb/components/service-logo'
import { Modal } from '@taggedweb/components/Modal'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    params: { price_id, customer_uid },
  } = context
  let pageData
  try {
    pageData = await fetchPartnerPricePlanData(context.req, customer_uid, price_id)
  } catch (error) {
    return {
      notFound: true,
    }
    // eslint-disable-next-line
    // TODO: Redirect to solution search page.
  }
  return {
    props: { pageData },
  }
})

export default function AddCardDetailsPage({ pageData }) {
  const { query } = useRouter()
  const [isSubscribe, setIsSubscribe] = useState(false)
  const [isshowConfirmModal, setIsShowConfrimModal] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState([])

  const addCard = async (paymentMethod) => {
    const data = await attachPaymentMethodForPartner(paymentMethod, query.customer_uid, query.partner)
    console.log(data)
    if (
      data.status === 'payment method associated successfully' ||
      data.status === 'You have already attached this payment.'
    ) {
      const payment = await fetchPaymentMethodList(query.customer_uid as string)
      console.log(payment)
      if (payment.has_payment_method) {
        setPaymentMethods(payment.payment_methods)
        setIsShowConfrimModal(true)
      }
    } else {
      // Show alert message.
      toast.error(data.status)
    }
  }

  const toggleSubscribe = async () => {
    setIsSubscribe(true)
    const data = await toggleAssetPriceSubscribe(query.customer_uid, query.price_id)
    if (data.status === 'Successfully subscribed') {
      toast.success(data.status)
      window.location.href = pageData.organization.website
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
        <AddPaymentCardDetail addCard={addCard} />
      </div>
      <Modal isOpen={isshowConfirmModal} setIsOpen={setIsShowConfrimModal} size="2xl" dialogTitle="Terms of service">
        <MeteredPaymentMethodConfirm
          slug=""
          setConfirmModalOpen={setIsShowConfrimModal}
          paymentMethods={paymentMethods}
          toggleSubScribe={toggleSubscribe}
          isSubscribe={isSubscribe}
          partner_customer_uid={query.customer_uid as string}
        />
      </Modal>
    </div>
  )
}
