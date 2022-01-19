/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { BiDollar } from 'react-icons/bi'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import ReactTooltip from 'react-tooltip'
import { useRequireLogin } from '@taggedweb/hooks/use-require-login'
import { checkoutSolutionPurchase } from '@taggedweb/queries/solution'
import { fetchPaymentMethodList, togglePaymentSubscribe } from '@taggedweb/queries/user'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { SolutionSidebarType } from '@taggedweb/types/solution'
import { MeteredPaymentMethodConfirm } from '../metered-payment-confirm'
import { Button } from '../button'
import { Modal } from '../Modal'

type SolutionDetailMobileSidebarComponentProps = {
  detailInfo: SolutionSidebarType
  className?: string
  setIsFreshChatShow: React.Dispatch<React.SetStateAction<boolean>>
}

function SolutionDetailMobileSidebarComponent({
  detailInfo,
  className = '',
  setIsFreshChatShow,
}: SolutionDetailMobileSidebarComponentProps) {
  const router = useRouter()
  const { username } = useUserContext()
  const [isShowMore, setIsShowMore] = useState(false)
  const [isshowConfirmModal, setIsShowConfrimModal] = useState(false)
  const [isSubscribe, setIsSubscribe] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState([])
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(false)
  const defaultShowCount = 2
  const [isPurchase, setIsPurchase] = useState(false)
  const { requireLoginBeforeAction } = useRequireLogin()

  const togglePurchase = async () => {
    setIsPurchase(true)
    const referralUserId = (router.query?.r as string) ?? ''
    const data = await checkoutSolutionPurchase(detailInfo.pay_now_price.stripe_price_id, referralUserId)
    if (data) window.location = data.checkout_page_url
    setIsPurchase(false)
  }
  const toggleStartContract = async () => {
    setLoadingPaymentMethods(true)
    const payment = await fetchPaymentMethodList()
    if (payment.has_payment_method) {
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
    router.push(`/users/${username}/bookings/${data.solution_booking_id}`)
    setIsSubscribe(false)
  }

  let showFeatureList = detailInfo.features
  if (!isShowMore) showFeatureList = detailInfo.features.slice(0, defaultShowCount)

  return (
    <div className={clsx('p-2 flex justify-between', className)}>
      <div className="flex flex-col">
        <div className="flex items-center py-2">
          <BiDollar className="text-3xl font-bold text-text-primary" />
          <h4 className="text-3xl font-bold text-text-primary">
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
          {showFeatureList.map((feature, index) => (
            <div key={index} className="cursor-pointer" data-for={feature.id} data-tip>
              <IoIosCheckmarkCircleOutline className="inline text-md text-primary" />
              <span className="inline pl-2 text-sm text-text-secondary">{feature.name}</span>
            </div>
          ))}
          {detailInfo.features.length > 2 &&
            (isShowMore ? (
              <div
                className="flex self-start w-full px-0 mt-4 text-xs border-0 cursor-pointer text-text-secondary"
                onClick={() => setIsShowMore(false)}
              >
                Show Less
                <HiChevronUp className="self-center ml-2 text-text-tertiary" />
              </div>
            ) : (
              <div
                className="flex self-start w-full px-0 mt-4 text-xs border-0 cursor-pointer text-text-secondary"
                onClick={() => setIsShowMore(true)}
              >
                Show More
                <HiChevronDown className="self-center ml-2 text-text-tertiary" />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        {detailInfo.is_metered ? (
          <Button
            className="mt-4 px-[0.5rem] bg-primary"
            textClassName="text-white text-xs"
            loading={isPurchase || loadingPaymentMethods}
            disabled={isPurchase || loadingPaymentMethods}
            loadingClassName="text-background-light"
            onClick={requireLoginBeforeAction(() => toggleStartContract())}
          >
            Start Contract
          </Button>
        ) : (
          <Button
            className="px-[0.5rem] mt-2 bg-primary"
            textClassName="text-white text-xs"
            loading={isPurchase}
            disabled={detailInfo.purchaseDisableOption || isPurchase}
            loadingClassName="text-background-light"
            onClick={requireLoginBeforeAction(() => togglePurchase())}
          >
            {detailInfo.type && detailInfo.type === 'C' ? 'Book Now' : 'Purchase Now'}
          </Button>
        )}
        <Button onClick={() => setIsFreshChatShow(true)} className="px-[0.5rem] mt-2" textClassName="text-xs">
          Ask Questions
        </Button>
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

export const SolutionDetailMobileSidebar = SolutionDetailMobileSidebarComponent
