import React from 'react'
import { Asset } from '../../../types/asset'
import { CompareCardDetail } from './compare-card-detail'

type CompareCard = {
  services: Asset[]
}

function CompareCardComponent({ services }: CompareCard) {
  const serivceCount = services.length

  return (
    <>
      <div className="grid grid-cols-1 border border-solid divide-y rounded-md md:hidden divide-solid divide-border-default border-border-solid">
        {services.map((service) => (
          <CompareCardDetail service={service} key={service.id} />
        ))}
      </div>
      <div className={`hidden md:grid md:grid-cols-${serivceCount}`}>
        {services.map((service) => (
          <CompareCardDetail service={service} key={service.id} />
        ))}
      </div>
    </>
  )
}

export const CompareCard = CompareCardComponent
