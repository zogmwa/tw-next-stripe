import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { withSessionSSR } from '@taggedweb/utils/session'
import { fetchSolutionDetail } from '@taggedweb/solution-queries/fetch-solution-detail'
import { AddPaymentCardDetail } from '@taggedweb/components/add-payment-card-detail'
import { Solution } from '@taggedweb/types/solution'
import { fetchPaymentMethodList, PaymentMethodAttachToUser, togglePaymentSubscribe } from '@taggedweb/queries/user'
import { MeteredPaymentMethodConfirm } from '@taggedweb/components/metered-payment-confirm'
import { Modal } from '@taggedweb/components/Modal'

export const getServerSideProps = withSessionSSR(async (context) => {
  const { query } = context
  if (!query?.slug) {
    return {
      props: {
        notFound: true,
      },
    }
  }

  const slug = query?.slug
  let solutionDetail: Solution
  try {
    solutionDetail = await fetchSolutionDetail(context.req, slug)
  } catch (error) {
    return {
      props: {
        notFound: true,
      },
    }
    // eslint-disable-next-line
    // TODO: Redirect to solution search page.
  }
  return {
    props: {
      solutionDetail,
    },
  }
})

export default function AddCardDetailsPage({ solutionDetail }) {
  const router = useRouter()
  const { authVerified, username } = useUserContext()
  const [isSubscribe, setIsSubscribe] = useState(false)
  const [isshowConfirmModal, setIsShowConfrimModal] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState([])
  if (!solutionDetail || typeof solutionDetail === 'undefined' || !solutionDetail.is_metered) return null

  const addCard = async (paymentMethod) => {
    const data = await PaymentMethodAttachToUser(paymentMethod.id)
    if (data) {
      const payment = await fetchPaymentMethodList()
      if (payment.has_payment_method) {
        setPaymentMethods(payment.payment_methods)
        setIsShowConfrimModal(true)
      }
    }
  }

  const toggleSubscribe = async (paymentMethodId) => {
    setIsSubscribe(true)
    const referralUserId = (router.query?.r as string) ?? null
    const data = await togglePaymentSubscribe(paymentMethodId, solutionDetail.slug, referralUserId)
    router.push(`/users/${username}/bookings/${data.solution_booking_id}`)
    setIsSubscribe(false)
  }

  if (!authVerified) return null

  return (
    <div className="flex flex-col max-w-screen-lg px-4 mx-auto my-6 md:flex-row divide md:divide-x divide-border-default md:my-24">
      <div className="flex flex-col w-full">
        <div
          className="flex items-center space-x-2 cursor-pointer hover:underline"
          onClick={() => {
            router.push(`/solution/${solutionDetail.slug}`)
          }}
        >
          <BsArrowLeftCircle className="text-lg border rounded-full border-border-default text-text-primary" />
          <span className="text-sm text-text-primary">Go back</span>
        </div>
        <h2 className="py-4 text-lg font-semibold text-text-primary md:p-2">{solutionDetail.title}</h2>
        <div className="flex py-2 md:p-2">
          <span className="ml-2 text-sm text-text-primary">Team size: </span>
          <span className="ml-2 text-sm font-semibold">{solutionDetail.team_size}</span>
        </div>
        <div className="flex py-2 md:p-2">
          <span className="ml-2 text-sm text-text-primary">Estimated hours: </span>
          <span className="ml-2 text-sm font-semibold">{solutionDetail.estimated_hours}</span>
        </div>
        <div className="flex py-2 md:p-2">
          <span className="ml-2 text-sm text-text-primary">Blended hourly rate: </span>
          <span className="ml-2 text-sm font-semibold">{`$ ${solutionDetail.blended_hourly_rate}`}</span>
        </div>
        <div className="flex py-2 md:p-2">
          <span className="ml-2 text-sm text-text-primary">Billing period: </span>
          <span className="ml-2 text-sm font-semibold">{solutionDetail.billing_period}</span>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full py-10 border-t md:px-4 md:py-0 border-border-default md:border-0">
        <span className="font-semibold text-text-primary text-md">Add Card Info</span>
        <AddPaymentCardDetail addCard={addCard} />
      </div>
      <Modal isOpen={isshowConfirmModal} setIsOpen={setIsShowConfrimModal} size="2xl" dialogTitle="Terms of service">
        <MeteredPaymentMethodConfirm
          setConfirmModalOpen={setIsShowConfrimModal}
          paymentMethods={paymentMethods}
          toggleSubScribe={toggleSubscribe}
          isSubscribe={isSubscribe}
        />
      </Modal>
    </div>
  )
}
