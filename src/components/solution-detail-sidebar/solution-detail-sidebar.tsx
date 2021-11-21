import React, { useState } from 'react'
import clsx from 'clsx'
import { BiDollar } from 'react-icons/bi'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { useRequireLogin } from '@taggedweb/hooks/use-require-login'
import { toggleSolutionPurchase } from '@taggedweb/queries/solution'
import { Button } from '../button'

type SolutionDetailSidebarComponentProps = {
  detailInfo: {
    primary_price: {
      id: number
      solution: number
      stripe_price_id: string
      price: string | number
      currency: string
      is_primary: boolean
    }
    price: number
    features: { name: string }[]
  }
  className?: string
}

function SolutionDetailSidebarComponent({ detailInfo, className = '' }: SolutionDetailSidebarComponentProps) {
  const [isPurchase, setIsPurchase] = useState(false)
  const { requireLoginBeforeAction } = useRequireLogin()

  const togglePurchase = async () => {
    setIsPurchase(true)
    const data = await toggleSolutionPurchase(detailInfo.primary_price.id)
    if (data) window.location = data.checkout_page_url
    setIsPurchase(false)
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
        <h4 className="text-3xl font-bold text-text-primary">{detailInfo.price}</h4>
      </div>
      <div className="flex flex-col p-2 space-y-2">
        {detailInfo.features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <IoIosCheckmarkCircleOutline className="text-md text-primary" />
            <span className="pl-2 text-sm text-text-secondary">{feature.name}</span>
          </div>
        ))}
        <div className="flex flex-col items-center w-full">
          <Button
            className="mt-4 bg-primary"
            textClassName="text-white"
            loading={isPurchase}
            disabled={isPurchase}
            loadingClassName="text-background-light"
            onClick={requireLoginBeforeAction(() => togglePurchase())}
          >
            Purchase Now
          </Button>
          <Button className="mt-2">Ask Questions</Button>
        </div>
      </div>
    </div>
  )
}

export const SolutionDetailSidebar = SolutionDetailSidebarComponent
