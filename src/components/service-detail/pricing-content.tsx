import React, { useState, useRef } from 'react'
import { ServicePricingCard } from '../service-pricing-card/service-pricing-card'
import { PricingSelectNameMobile } from '../service-pricing-card/pricing-select-name-mobile'
import { PricingSelectNameDesktop } from '../service-pricing-card/pricing-select-name-desktop'
import { Asset } from '../../types/asset'

type ServiceDetailPricingProps = {
  isShowTitle?: boolean
  service: Asset
}

export function PricingContentComponent({ isShowTitle = true, service }: ServiceDetailPricingProps) {
  const [selectedItem, setSelectedItem] = useState(0)
  const carouselSlider = useRef(null)

  if (typeof service === 'undefined') return null
  const { price_plans: plans } = service

  const handleSelectedSlideItem = (index) => {
    setSelectedItem(index)
    carouselSlider.current.slickGoTo(index)
  }

  return (
    <>
      {isShowTitle && <h1 className="text-base font-medium text-text-primary md:mt-2">Pricing</h1>}
      {plans.length > 0 && (
        <div className="grid grid-cols-1 md:flex md:justify-start">
          <PricingSelectNameDesktop pricePlans={plans} selected={selectedItem} onSelected={handleSelectedSlideItem} />
          <PricingSelectNameMobile pricePlans={plans} selected={selectedItem} onSelected={handleSelectedSlideItem} />
          <ServicePricingCard
            pricePlans={plans}
            selected={selectedItem}
            onSelected={handleSelectedSlideItem}
            carousel={carouselSlider}
          />
        </div>
      )}
    </>
  )
}

export const PricingContent = PricingContentComponent
