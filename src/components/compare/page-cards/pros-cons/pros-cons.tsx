import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Asset } from '../../../../types/asset'
import { ServiceCollapse } from '../../../collapse'
import { ProsCons } from './proscons-component'
import { ProsCard } from './pros-card'
import { ConsCard } from './cons-card'
import { AddPorsConsBar } from './proscons-add-bar'
import { useUserContext } from '../../../../hooks/use-user'

type CompareServiceProsCons = {
  services: Asset[]
}

function CompareServiceProsConsComponent({ services }: CompareServiceProsCons) {
  const { authVerified } = useUserContext()
  const [attributesList, setAttributesList] = useState([])

  useEffect(() => {
    let tempAttributesList = []

    for (let i = 0; i < services.length; i++) {
      const attributes = services[i].attributes
      attributes.sort((attributeA, attributeB) => {
        return (Number(attributeA.upvotes_count) - Number(attributeB.upvotes_count)) * -1
      })
      tempAttributesList.push({
        asset: services[i].id,
        attributes: attributes,
      })
    }

    setAttributesList(tempAttributesList)
  }, [])

  const serviceCount = services.length

  return (
    <ServiceCollapse title="Pros & Cons">
      <div className="grid grid-cols-1 p-1 divide-y md:hidden divide-border-default justify-items-around divide-solid">
        {services.map((service, index) => (
          <ProsCons service={service} key={index} />
        ))}
      </div>
      <div className="hidden md:flex md:flex-col md:divide md:divide-y md:divide-border-default">
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
            <div className="flex flex-col justify-between p-2" key={index}>
              <ProsCard service={service} attributes={attributesList} />
              <AddPorsConsBar
                className="mt-2"
                isCon={false}
                asset={service.id}
                placeholder="Add a Pro"
                authVerified={authVerified}
              />
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
            <div className="flex flex-col justify-between p-2" key={index}>
              <ConsCard service={service} attributes={attributesList} />
              <AddPorsConsBar
                className="mt-2"
                isCon={true}
                asset={service.id}
                placeholder="Add a Con"
                authVerified={authVerified}
              />
            </div>
          ))}
        </div>
      </div>
    </ServiceCollapse>
  )
}

export const CompareServiceProsCons = CompareServiceProsConsComponent
