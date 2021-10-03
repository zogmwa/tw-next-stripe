import React from 'react'
import { Plan } from '../../types/price-plan'
import { AiFillCheckCircle } from 'react-icons/ai'

type ServicePricingFeaturesListProps = {
  pricePlans: Plan[]
  selected: number
}

function PricingFeaturesListComponent({ pricePlans, selected }: ServicePricingFeaturesListProps) {
  const features = pricePlans[selected].features.split('\r\n')

  return (
    <div className="mt-4 border border-solid rounded-md md:border-0 border-text-tertiary">
      <h1 className="mt-2 ml-2 text-base font-medium text-text-primary">Selected Plan Features</h1>
      <div className="grid pl-2 mt-4 md:grid-cols-2">
        {features
          .filter((feature) => feature !== '')
          .map((feature) => (
            <div className="items-center my-2 ml-2 text-md" key={feature}>
              <AiFillCheckCircle className="inline mr-2 text-primary" />
              <div className="inline">{feature}</div>
            </div>
          ))}
      </div>
    </div>
  )
}

export const PricingFeaturesList = PricingFeaturesListComponent
