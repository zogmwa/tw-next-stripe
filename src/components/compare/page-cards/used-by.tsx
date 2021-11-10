import React from 'react'
import clsx from 'clsx'
import { Asset } from '@tw/types/asset'
import { ServiceCollapse } from '../../collapse'

type CompareServiceUsedByProps = {
  services: Asset[]
}

function CompareServiceUsedByComponent({ services }: CompareServiceUsedByProps) {
  const serviceCount = services.length

  return (
    <ServiceCollapse title="Used By">
      <div className="grid grid-cols-1 p-1 divide-y md:hidden divide-border-default justify-items-around divide-solid">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col p-2">
            <h2 className="text-black text-md text-semibold">Companies using {service.name}</h2>
            <div className="flex flex-col mt-4">
              {service.customer_organizations.map((customer, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex items-center w-16 h-16 border border-solid rounded-md border-border-default">
                    <img src={customer.logo_url} />
                  </div>
                  <div className="pl-2 text-sm text-semibold">{customer.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        className={clsx(
          'hidden md:grid md:grid-flow-col',
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
          'divide-x divide-border-default justify-items-around divide-solid',
        )}
      >
        {services.map((service, index) => (
          <div key={index} className="flex flex-col p-4">
            <h2 className="text-black text-md text-semibold">Companies using {service.name}</h2>
            <div className="flex flex-col mt-4">
              {service.customer_organizations.map((customer, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex items-center w-16 h-16 border border-solid rounded-md border-border-default">
                    <img src={customer.logo_url} />
                  </div>
                  <div className="pl-2 text-sm text-semibold">{customer.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ServiceCollapse>
  )
}

export const CompareServiceUsedBy = CompareServiceUsedByComponent
