import React from 'react'
import { Asset } from '../../../types/asset'
import { SummaryCompareCardDetail } from './compare-summary-detail'

type CompareCard = {
  services: Asset[]
}

function CompareSummaryCardComponent({ services }: CompareCard) {
  const serviceCount = services.length

  return (
    <>
      <div className="grid grid-cols-1 border border-solid divide-y rounded-md md:hidden divide-solid divide-border-default border-border-solid">
        {services.map((service) => (
          <SummaryCompareCardDetail service={service} key={service.id} />
        ))}
      </div>
      <div className={`hidden md:grid md:grid-cols-${serviceCount}`}>
        {services.map((service) => (
          <SummaryCompareCardDetail service={service} key={service.id} />
        ))}
      </div>
    </>
  )
}

export const CompareSummaryCard = CompareSummaryCardComponent
