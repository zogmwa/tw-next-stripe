import React from 'react'
import { Plan } from '@taggedweb/types/price-plan'
import { PricigDetailCard } from '@taggedweb/components/pricing-components/pricing-card/pricing-detail-card'

type PricingCardComponentProps = {
  pricePlans: Plan[]
}

function PricingCardComponent({ pricePlans }: PricingCardComponentProps) {
  return (
    <>
      <div className="hidden p-2 border border-solid divide-x rounded-md md:flex border-border-default divide-solid divide-border-default">
        {pricePlans.map((price, index) => (
          <PricigDetailCard price={price} key={index} />
        ))}
      </div>
      <div className="flex flex-col p-2 border border-solid divide-y rounded-md md:hidden border-border-default divide-solid divide-border-default">
        {pricePlans.map((price, index) => (
          <PricigDetailCard price={price} key={index} />
        ))}
      </div>
    </>
  )
}

export const PricingCard = PricingCardComponent
