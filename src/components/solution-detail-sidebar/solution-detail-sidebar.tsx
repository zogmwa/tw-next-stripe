/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { BiDollar } from 'react-icons/bi'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import ReactTooltip from 'react-tooltip'
import { useRequireLogin } from '@taggedweb/hooks/use-require-login'
import { checkoutSolutionPurchase } from '@taggedweb/queries/solution'
import { fetchHasPaymentMethod } from '@taggedweb/queries/user'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { SolutionSidebarType } from '@taggedweb/types/solution'
import { Button } from '../button'

type SolutionDetailSidebarComponentProps = {
  detailInfo: SolutionSidebarType
  className?: string
}

function SolutionDetailSidebarComponent({ detailInfo, className = '' }: SolutionDetailSidebarComponentProps) {
  const router = useRouter()
  const { pk } = useUserContext()
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
    const payment = await fetchHasPaymentMethod()
    if (payment.has_payment_method) {
      console.log('Payment method attached')
    } else {
      router.push(`/add-card-details?slug=${detailInfo.slug}`)
    }
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
              loading={isPurchase}
              disabled={isPurchase}
              loadingClassName="text-background-light"
              onClick={requireLoginBeforeAction(() => toggleStartContract())}
            >
              Start Contract
            </Button>
          ) : (
            <span data-for="purchase-button" data-tip>
              <Button
                className="mt-4 bg-primary"
                textClassName="text-white"
                loading={isPurchase}
                disabled={detailInfo.purchaseDisableOption || isPurchase}
                loadingClassName="text-background-light"
                onClick={requireLoginBeforeAction(() => togglePurchase())}
              >
                {detailInfo.type && detailInfo.type === 'C' ? 'Book Now' : 'Purchase Now'}
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
    </div>
  )
}

export const SolutionDetailSidebar = SolutionDetailSidebarComponent
