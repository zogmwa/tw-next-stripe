import React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Plan } from '@taggedweb/types/price-plan'

type ServicePricingFeaturesListProps = {
  pricePlans: Plan[]
  selected: number
}

function PricingFeaturesListComponent({ pricePlans, selected }: ServicePricingFeaturesListProps) {
  const featuresString = pricePlans[selected]?.features ?? ''
  const features = featuresString.split('\n')

  return (
    <div className="mt-4 border border-solid rounded-md md:border-0 border-border-default">
      <h1 className="mt-2 ml-2 text-base font-medium text-text-primary">Selected Plan Features</h1>
      <div className="grid mt-4 md:grid-cols-2">
        {features
          .filter((feature) => feature !== '')
          .map((feature) => (
            <div className="items-center my-2 ml-2 text-sm text-md" key={feature}>
              <AiFillCheckCircle className="inline mr-2 text-primary" />
              <div className="inline text-text-secondary">{feature}</div>
            </div>
          ))}
      </div>
    </div>
  )
}

export const PricingFeaturesList = PricingFeaturesListComponent
