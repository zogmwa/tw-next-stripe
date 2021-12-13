import React, { useState, useRef } from 'react'
import { Asset } from '@taggedweb/types/asset'
import { ServicePricingCard } from '../pricing-components/service-pricing-card/service-pricing-card'
import { PricingSelectNameMobile } from '../pricing-components/service-pricing-card/pricing-select-name-mobile'
import { PricingSelectNameDesktop } from '../pricing-components/service-pricing-card/pricing-select-name-desktop'
import { ShowEditable, EditablePricing } from '../editable-components'
import { Modal } from '../Modal'

type ServiceDetailPricingProps = {
  isShowTitle?: boolean
  service: Asset
  editAllowed?: boolean
  onChange?: Function
  id?: string | ''
}

export function PricingContentComponent({
  isShowTitle = true,
  service,
  editAllowed = false,
  onChange = () => {},
  id,
}: ServiceDetailPricingProps) {
  const [selectedItem, setSelectedItem] = useState(0)
  const carouselSlider = useRef(null)
  const [showPriceEditModal, setPriceShowEditModal] = useState(false)

  if (typeof service === 'undefined') return null
  const { price_plans: plans } = service

  const handleSelectedSlideItem = (index) => {
    setSelectedItem(index)
    carouselSlider.current.slickGoTo(index)
  }

  return (
    <>
      {isShowTitle &&
        (editAllowed ? (
          <div className="flex items-center mt-8">
            <ShowEditable onEdit={() => setPriceShowEditModal(true)}>
              <h1 className="text-base font-medium text-text-primary">Pricing</h1>
            </ShowEditable>
          </div>
        ) : (
          <a href={`#scrollable-${id}`}>
            <h1 className="text-base font-medium text-text-primary md:mt-2">Pricing</h1>
          </a>
        ))}
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
      <Modal isOpen={showPriceEditModal} setIsOpen={setPriceShowEditModal} size="5xl">
        <EditablePricing pricePlans={plans} setEditModal={setPriceShowEditModal} onSubmit={onChange} />
      </Modal>
    </>
  )
}

export const PricingContent = PricingContentComponent
