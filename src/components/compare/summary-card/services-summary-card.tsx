import React from 'react'
import { Asset } from '../../../types/asset'
import { CompareServiceSummaryCardDetail } from './compare-summary-detail'

type CompareServiceCard = {
  services: Asset[]
}

function CompareServiceSummaryCardComponent({ services }: CompareServiceCard) {
  const serviceCount = services.length

  return (
    <>
      <div className="grid grid-cols-1 border border-solid divide-y rounded-md md:hidden divide-solid divide-border-default border-border-solid">
        {services.map((service) => (
          <CompareServiceSummaryCardDetail service={service} key={service.id} />
        ))}
      </div>
      <div className={`hidden md:grid md:grid-flow-col md:grid-cols-${serviceCount}`}>
        {services.map((service) => (
          <CompareServiceSummaryCardDetail service={service} key={service.id} />
        ))}
      </div>
    </>
  )
}

export const CompareServiceSummaryCard = CompareServiceSummaryCardComponent
