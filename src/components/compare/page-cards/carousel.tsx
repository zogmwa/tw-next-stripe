import React from 'react'
import { Asset } from '../../../types/asset'
import { ServiceCollapse } from '../../collapse'
import { CarouselPaging } from '../../carousel/carousel-paging'

type CompareServiceCarousel = {
  services: Asset[]
}

function CompareServiceCarouselComponent({ services }: CompareServiceCarousel) {
  const serviceCount = services.length

  return (
    <ServiceCollapse title="Screenshoots">
      <div className="grid grid-cols-1 p-1 divide-y md:hidden divide-border-default justify-items-around divide-solid">
        {services.map((service, index) => (
          <div className="flex flex-col p-2" key={index}>
            <h2 className="text-black text-md text-semibold">{service.name}</h2>
            <CarouselPaging images={service.snapshots} />
          </div>
        ))}
      </div>
      <div
        className={`hidden md:grid md:grid-flow-col md:grid-cols-${serviceCount} divide-x divide-border-default justify-items-around divide-solid`}
      >
        {services.map((service, index) => (
          <div className="flex flex-col pt-6 pb-4 pl-4 pr-4" key={index}>
            <h2 className="text-black text-md text-semibold">{service.name}</h2>
            <CarouselPaging images={service.snapshots} />
          </div>
        ))}
      </div>
    </ServiceCollapse>
  )
}

export const CompareServiceCarousel = CompareServiceCarouselComponent
