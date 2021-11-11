import React from 'react'
import { Plan } from '@taggedweb/types/price-plan'

type ServicePricingProps = {
  pricePlans: Plan[]
  selected: number
  onSelected: any
}

function PricingSelectNameDesktopComponent({ pricePlans, selected, onSelected }: ServicePricingProps) {
  return (
    <div className="hidden md:px-4 md:flex md:flex-col md:w-48">
      {pricePlans.map((item, index) => (
        <div
          className={
            index === selected
              ? 'py-1 my-1 pl-4 bg-primary rounded-md text-white cursor-pointer'
              : 'py-1 my-1 pl-4 cursor-pointer text-text-tertiary'
          }
          key={item.name}
          onClick={() => onSelected(index)}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

export const PricingSelectNameDesktop = PricingSelectNameDesktopComponent
