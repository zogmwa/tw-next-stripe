import React from 'react'

type EmptyServicePricingProps = {
  name: string
  website?: string
  pricing_url?: string
}

function EmptyServicePricingCardComponent({ name, website = '', pricing_url = '' }: EmptyServicePricingProps) {
  return (
    <div className="px-4 py-6 my-2 border-2">
      <div className="text-md">
        <span className="font-semibold text-gray-500">Pricing plans for {name} are currently unavailable.</span> Contact{' '}
        {name} or checkout their{' '}
        {website || pricing_url ? (
          <a href={`${pricing_url || website}`} rel="noreferrer" target="_blank">
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
