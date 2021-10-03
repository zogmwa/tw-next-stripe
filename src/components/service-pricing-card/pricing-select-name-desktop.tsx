import React from 'react'
import { Plan } from '../../types/price-plan'

type ServicePricingProps = {
  pricePlans: Plan[]
  selected: number
  onSelected: any
}

function PricingSelectNameDesktopComponent({ pricePlans, selected, onSelected }: ServicePricingProps) {
  return (
    <div className="hidden md:px-4 md:flex md:flex-col md:w-48 md:justify-center">
      {pricePlans.map((item, index) => (
        <div
          className={
            index === selected
              ? 'py-1 my-1 pl-4 bg-primary rounded-md text-border-default cursor-pointer'
              : 'py-1 my-1 pl-4 cursor-pointer'
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
