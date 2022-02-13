import React, { useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { attachPaymentMethodForPartner, fetchPaymentMethodList } from '@taggedweb/queries/user'
import { AddPaymentCardDetail } from '@taggedweb/components/add-payment-card-detail'
import { MeteredPaymentMethodConfirm } from '@taggedweb/components/metered-payment-confirm'
import { Modal } from '@taggedweb/components/Modal'

export default function AddCardDetailsPage() {
  const { query } = useRouter()
  const { authVerified } = useUserContext()
  const [isSubscribe, setIsSubscribe] = useState(false)
  const [isshowConfirmModal, setIsShowConfrimModal] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState([])

  const addCard = async (paymentMethod) => {
    const data = await attachPaymentMethodForPartner(paymentMethod, query.customer_id)

    if (data.status === 'payment method associated successfully') {
      const payment = await fetchPaymentMethodList(query.customer_id as string)
      if (payment.has_payment_method) {
        setPaymentMethods(payment.payment_methods)
        setIsShowConfrimModal(true)
      } else {
        // Show alert message.
        toast.error(data.status)
      }
    }
  }

  const toggleSubscribe = async (paymentMethodId) => {
    setIsSubscribe(true)
    // TODO: Subscribe price plan
    setIsSubscribe(false)
  }

  return (
    <div className="flex flex-col max-w-screen-lg px-4 mx-auto my-6 md:flex-row divide md:divide-x divide-border-default md:my-24">
      <div className="flex flex-col w-full"></div>
      <div className="flex flex-col justify-center w-full py-10 border-t md:px-4 md:py-0 border-border-default md:border-0">
        <AddPaymentCardDetail addCard={addCard} isShowEmail={!authVerified} />
      </div>
      <Modal isOpen={isshowConfirmModal} setIsOpen={setIsShowConfrimModal} size="2xl" dialogTitle="Terms of service">
        <MeteredPaymentMethodConfirm
          slug=""
          setConfirmModalOpen={setIsShowConfrimModal}
          paymentMethods={paymentMethods}
          toggleSubScribe={toggleSubscribe}
          isSubscribe={isSubscribe}
          partner_customer_id={query.customer_id as string}
        />
      </Modal>
    </div>
  )
}
