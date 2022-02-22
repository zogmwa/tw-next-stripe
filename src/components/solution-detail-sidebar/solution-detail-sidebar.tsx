/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { BiDollar } from 'react-icons/bi'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import ReactTooltip from 'react-tooltip'
import { useRequireLogin } from '@taggedweb/hooks/use-require-login'
import { checkoutSolutionPurchase } from '@taggedweb/queries/solution'
import { fetchPaymentMethodList, togglePaymentSubscribe } from '@taggedweb/queries/user'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { SolutionSidebarType } from '@taggedweb/types/solution'
import { MeteredPaymentMethodConfirm } from '../metered-payment-confirm'
import { Button } from '../button'
import { Modal } from '../Modal'
import { RequestConsultation } from '../request-consultation'

type SolutionDetailSidebarComponentProps = {
  detailInfo: SolutionSidebarType
  className?: string
}

function SolutionDetailSidebarComponent({ detailInfo, className = '' }: SolutionDetailSidebarComponentProps) {
  const router = useRouter()
  const { username } = useUserContext()
  const [isPurchase, setIsPurchase] = useState(false)
  const [isSubscribe, setIsSubscribe] = useState(false)
  const [isshowConfirmModal, setIsShowConfrimModal] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState([])
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(false)
  const { requireLoginBeforeAction } = useRequireLogin()

  const togglePurchase = async () => {
    setIsPurchase(true)
    const referralUserId = (router.query?.r as string) ?? ''
    const data = await checkoutSolutionPurchase(detailInfo.stripe_primary_price.stripe_price_id, referralUserId)
    if (data) window.location = data.checkout_page_url
    setIsPurchase(false)
  }
  const toggleStartContract = async () => {
    setLoadingPaymentMethods(true)
    const payment = await fetchPaymentMethodList()
    if (payment.has_payment_method) {
      if (payment.payment_methods.length === 0) router.push(`/add-card-details?slug=${detailInfo.slug}`)
      setPaymentMethods(payment.payment_methods)
      setIsShowConfrimModal(true)
    } else {
      router.push(`/add-card-details?slug=${detailInfo.slug}`)
    }
    setLoadingPaymentMethods(false)
  }

  const toggleSubscribe = async (paymentMethodId) => {
    setIsSubscribe(true)
    const referralUserId = (router.query?.r as string) ?? null
    const data = await togglePaymentSubscribe(paymentMethodId, detailInfo.slug, referralUserId)
    router.push(`/profile/contracts/${data.solution_booking_id}`)
    setIsSubscribe(false)
  }

  return (
    <div
      className={clsx(
        'p-2 flex flex-col border border-solid border-border-default rounded-md divide-y divide-solid divide-border-default',
        className,
      )}
    >
      <div className="flex items-center py-2">
        <BiDollar className="text-3xl font-bold text-text-primary" />
        <h4 className="text-3xl font-bold text-text-primary" data-for="show-price-detail" data-tip>
          {detailInfo.is_metered ? `${detailInfo.price}/hr` : detailInfo.price ? detailInfo.price / 100 : 0}
        </h4>
        {detailInfo.is_metered && (
          <ReactTooltip
            id="show-price-detail"
            className="w-[200px]"
            type="light"
            place="top"
            border={true}
            borderColor="text-grey-200"
            multiline={true}
          >
            Estimated price means that the solution may take longer to deliver
          </ReactTooltip>
        )}
      </div>
      <div className="flex flex-col p-2 space-y-2">
        {detailInfo.features.map((feature, index) => (
          <div key={index} className="cursor-pointer" data-for={feature.id} data-tip>
            <IoIosCheckmarkCircleOutline className="inline text-md text-primary" />
            <span className="inline pl-2 text-sm text-text-secondary">{feature.name}</span>
          </div>
        ))}
        <div className="flex flex-col items-center w-full">
          {detailInfo.is_metered ? (
            <Button
              className="mt-4 bg-primary"
              textClassName="text-white"
              loading={isPurchase || loadingPaymentMethods}
              disabled={isPurchase || loadingPaymentMethods}
              loadingClassName="text-background-light"
              onClick={requireLoginBeforeAction(() => toggleStartContract())}
            >
              Start Contract
            </Button>
          ) : (
            <span data-for="purchase-button" data-tip>
              <Button
                className="w-32 mt-4 bg-primary"
                textClassName="text-white"
                loading={isPurchase}
                disabled={detailInfo.purchaseDisableOption || isPurchase}
                loadingClassName="text-background-light"
                onClick={requireLoginBeforeAction(() => togglePurchase())}
              >
                Book Now
              </Button>
              {detailInfo.purchaseDisableOption && (
                <ReactTooltip
                  id="purchase-button"
                  className="w-[200px]"
                  type="light"
                  place="top"
                  border={true}
                  borderColor="text-grey-200"
                  multiline={true}
                >
                  Capacity currently unavailable.
                </ReactTooltip>
              )}
            </span>
          )}
          {detailInfo.has_free_consultation && detailInfo.consultation_scheduling_link ? (
            <RequestConsultation detailInfo={detailInfo} />
          ) : null}
          <Button
            onClick={() => {
              // @ts-ignore
              window.fcWidget.open()
            }}
            className="mt-2"
          >
            Ask Questions
          </Button>
        </div>
      </div>
      {detailInfo.features.map((feature) => (
        <ReactTooltip
          id={feature.id}
          key={feature.id}
          className="w-[200px]"
          type="light"
          place="top"
          border={true}
          borderColor="text-grey-200"
          multiline={true}
        >
          {feature.tooltipContent}
        </ReactTooltip>
      ))}
      {detailInfo.is_metered && (
        <Modal isOpen={isshowConfirmModal} setIsOpen={setIsShowConfrimModal} size="2xl" dialogTitle="Terms of service">
          <MeteredPaymentMethodConfirm
            slug={detailInfo.slug}
            setConfirmModalOpen={setIsShowConfrimModal}
            paymentMethods={paymentMethods}
            toggleSubScribe={toggleSubscribe}
            isSubscribe={isSubscribe}
          />
        </Modal>
      )}
    </div>
  )
}

export const SolutionDetailSidebar = SolutionDetailSidebarComponent
