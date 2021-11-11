import React from 'react'
import clsx from 'clsx'
import { Asset } from '@taggedweb/types/asset'
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
      <div
        className={clsx(
          (() => {
            switch (serviceCount) {
              case 3: {
                return 'md:grid-cols-3'
              }
              default: {
                return 'md:grid-cols-2'
              }
            }
          })(),
          'hidden md:grid md:grid-flow-col',
        )}
      >
        {services.map((service) => (
          <CompareServiceSummaryCardDetail service={service} key={service.id} />
        ))}
      </div>
    </>
  )
}

export const CompareServiceSummaryCard = CompareServiceSummaryCardComponent
