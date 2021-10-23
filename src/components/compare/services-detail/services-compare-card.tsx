import React from 'react'
import { Asset } from '../../../types/asset'
import { Button } from '../../button'

type CompareServiceCardProps = {
  services: Asset[]
}

function CompareServiceCardComponent({ services }: CompareServiceCardProps) {
  const serivceCount = services.length

  return (
    <>
      <div className="flex flex-col items-start justify-between mt-2 md:flex-row md:items-center">
        <div className="compare-services-names">
          {services.map((service, index) => (
            <h2 key={index} className="inline-block">
              {service.name}
              {serivceCount - 1 !== index && <span className="px-4 text-sm text-text-secondary">Vs</span>}
            </h2>
          ))}
        </div>
        <Button buttonType="primary" textClassName="text-background-light" className="mt-2 md:mt-0">
          Compare another Product
        </Button>
      </div>
      <div className="mt-4">
        {services.map((service, index) => (
          <p className="inline-block text-sm text-text-secondary" key={index}>
            {service.name}
            {serivceCount - 1 !== index && <span className="px-1 text-sm text-text-secondary">vs</span>}
            {serivceCount - 1 === index && <span className="pr-1 text-sm text-text-secondary">:</span>}
          </p>
        ))}
        <span className="text-sm text-text-secondary">What are the differences?</span>
      </div>
      {services.map((service, index) => (
        <div className="mt-2" key={index}>
          <span className="pr-1 text-sm font-semibold">What is {service.name}?</span>
          <span className="text-sm text-text-secondary">{service.description}</span>
        </div>
      ))}
      <div className="mt-4 text-sm text-text-secondary">
        Both are tools in the
        <span className="font-semibold text-black"> Web </span>
        and
        <span className="font-semibold text-black"> Video Conferencing </span>
        category of a tech stack.
      </div>
    </>
  )
}

export const CompareServiceCard = CompareServiceCardComponent
