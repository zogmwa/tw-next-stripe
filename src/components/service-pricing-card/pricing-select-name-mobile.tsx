import React from 'react'
import { Plan } from '../../types/price-plan'

type ServicePricingProps = { 
  pricePlans: Plan[] 
  selected: number
  onSelected: any 
}

function PricingSelectNameMobileComponent({ pricePlans, selected, onSelected }: ServicePricingProps) {
  return (
    <div className="block md:hidden">
      <div className="flex justify-around h-8 py-1 my-1 mb-2 bg-gray-100 rounded-xl md:hidden">
        {pricePlans.map((item, index) => (
          <div 
            className={selected === index ? "flex items-center h-full px-4 bg-white rounded-lg" : "flex items-center h-full px-4 cursor-pointer"}
            key={item.name}
            onClick={() => onSelected(index)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export const PricingSelectNameMobile = PricingSelectNameMobileComponent
