import React from 'react'
import clsx from 'clsx'
import { Asset } from '../../../../types/asset'
import { ServiceCollapse } from '../../../collapse'
import { CompareServicePricingCard } from './pricing-card'

type CompareServicePricingProps = {
  services: Asset[]
}

function CompareServicePricingComponent({ services }: CompareServicePricingProps) {
  const showPricingData = []
  const serviceCount = services.length

  for (let i = 0; i < services.length; i++) {
    const popularPricing = services[i].price_plans.filter((pricePlan) => pricePlan.most_popular === true)
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

  return (
    <ServiceCollapse title="Pricing">
      <div className="grid grid-cols-1 divide-y md:hidden divide-border-default justify-items-around divide-solid">
        {services.map((service) => (
          <CompareServicePricingCard service={service} showPricingData={showPricingData} key={service.id} />
        ))}
      </div>
      <div
        className={clsx(
          'hidden md:grid md:grid-flow-col',
          (() => {
            switch (serviceCount) {
              case 3: {
                return 'md:grid-cols-3'
              }
              default: {
                return 'md:grid-cols-2'
              }
            }
          })(),
          'divide-x divide-border-default justify-items-around divide-solid',
        )}
      >
        {services.map((service) => (
          <CompareServicePricingCard service={service} showPricingData={showPricingData} key={service.id} />
        ))}
      </div>
    </ServiceCollapse>
  )
}

export const CompareServicePricing = CompareServicePricingComponent
