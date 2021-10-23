import React, { useState } from 'react'
import { BiDollar } from 'react-icons/bi'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Asset } from '../../../../types/asset'
import { ServiceCollapse } from '../../../collapse'
import { CompareServicePricingCard } from './pricing-card'

type CompareServicePricing = {
  services: Asset[]
}

function CompareServicePricingComponent({ services }: CompareServicePricing) {
  let showPricingData = []
  const serviceCount = services.length

  for (let i = 0; i < services.length; i++) {
    let popularPricing = services[i].price_plans.filter((pricePlan) => pricePlan.most_popular === true)
    if (popularPricing.length > 0) {
      showPricingData.push({
        asset: services[i].id,
        price: popularPricing[0],
      })
    } else {
      showPricingData.push({
        asset: services[i].id,
        price: services[i].price_plans[0],
      })
    }
  }

  console.log(showPricingData)

  return (
    <ServiceCollapse title="Pricing">
      <div className="grid grid-cols-1 divide-y md:hidden divide-border-default justify-items-around divide-solid">
        {services.map((service) => (
          <CompareServicePricingCard service={service} showPricingData={showPricingData} key={service.id} />
        ))}
      </div>
      <div
        className={`hidden md:grid md:grid-flow-col md:grid-cols-${serviceCount} divide-x divide-border-default justify-items-around divide-solid`}
      >
        {services.map((service) => (
          <CompareServicePricingCard service={service} showPricingData={showPricingData} key={service.id} />
        ))}
      </div>
    </ServiceCollapse>
  )
}

export const CompareServicePricing = CompareServicePricingComponent
