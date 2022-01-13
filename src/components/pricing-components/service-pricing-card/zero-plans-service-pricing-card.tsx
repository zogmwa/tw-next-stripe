import React from 'react'

type EmptyServicePricingProps = {
  name: string
  website?: string
}

function EmptyServicePricingCardComponent({ name, website = '' }: EmptyServicePricingProps) {
  return (
    <div className="px-4 py-6 my-2 border-2">
      <div className="text-md">
        <span className="font-semibold text-gray-500">Pricing plans for {name} are currently unavailable.</span> Contact{' '}
        {name} or checkout their{' '}
        {website ? (
          <a href={`${website}`} rel="noreferrer" target="_blank">
            website
          </a>
        ) : (
          'website'
        )}{' '}
        to obtain current pricing plans.
      </div>
    </div>
  )
}

export const EmptyServicePricingCard = EmptyServicePricingCardComponent
