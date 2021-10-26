import React from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Asset } from '../../../types/asset'
import { ServiceCollapse } from '../../collapse'
import { Button } from '../../button'

type CompareServiceProductProps = {
  services: Asset[]
}

function CompareServiceProductComponent({ services }: CompareServiceProductProps) {
  const router = useRouter()
  const serviceCount = services.length

  return (
    <ServiceCollapse title="Product Description">
      <div className="grid grid-cols-1 p-1 divide-y md:hidden divide-border-default justify-items-around divide-solid">
        {services.map((service, index) => (
          <div className="flex flex-col p-2" key={index}>
            <h2 className="text-black text-md text-semibold">{service.name}</h2>
            <span className="mt-2 text-sm text-text-secondary">{service.description}</span>
            <div>
              {service.tags.map((tag) => {
                return (
                  <Button
                    key={tag.slug}
                    buttonType="tag"
                    size="small"
                    className="mt-2 mr-2"
                    onClick={() => {
                      router.push(`/search/${tag.slug}`)
                    }}
                  >
                    {tag.name}
                  </Button>
                )
              })}
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
          <div className="flex flex-col pt-6 pb-4 pl-4 pr-4" key={index}>
            <h2 className="text-black text-md text-semibold">{service.name}</h2>
            <span className="mt-2 text-sm text-text-secondary">{service.description}</span>
            <div>
              {service.tags.map((tag) => {
                return (
                  <Button
                    key={tag.slug}
                    buttonType="tag"
                    size="small"
                    className="mt-2 mr-2"
                    onClick={() => {
                      router.push(`/search/${tag.slug}`)
                    }}
                  >
                    {tag.name}
                  </Button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </ServiceCollapse>
  )
}

export const CompareServiceProduct = CompareServiceProductComponent
