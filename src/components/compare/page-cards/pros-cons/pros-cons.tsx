import React, { useState, useEffect } from 'react'
import { Asset } from '../../../../types/asset'
import { ServiceCollapse } from '../../../collapse'
import { ProsCons } from './proscons-component'
import { ProsCard } from './pros-card'
import { ConsCard } from './cons-card'
import { fetchUpvotedAttributes } from '../../../../queries/service'
import { AddPorsConsBar } from './proscons-add-bar'

type CompareServiceProsCons = {
  services: Asset[]
}

const ProsplaceholderComponent = (
  <div className="flex items-center justify-center space-x-2 text-sm">
    <div>Add a Pro</div>
  </div>
)

function CompareServiceProsConsComponent({ services }: CompareServiceProsCons) {
  const [attributesList, setAttributesList] = useState([])

  useEffect(() => {
    async function getServicesAttributes() {
      let tempAttributesList = []

      for (let i = 0; i < services.length; i++) {
        const attributes = await fetchUpvotedAttributes(services[i].slug)
        tempAttributesList.push({
          asset: services[i].id,
          attributes: attributes,
        })
      }
      setAttributesList(tempAttributesList)
    }

    getServicesAttributes()
  }, [])

  const serviceCount = services.length
  const desktopClassName = `hidden md:grid md:grid-flow-col md:grid-cols-${serviceCount} divide-x divide-border-default justify-items-around divide-solid`

  return (
    <ServiceCollapse title="Pros & Cons">
      <div className="grid grid-cols-1 p-1 divide-y md:hidden divide-border-default justify-items-around divide-solid">
        {services.map((service, index) => (
          <ProsCons service={service} key={index} />
        ))}
      </div>
      <div className="hidden md:flex md:flex-col md:divide md:divide-y md:divide-border-default">
        <div className={desktopClassName}>
          {services.map((service, index) => (
            <div className="flex flex-col justify-between p-2" key={index}>
              <ProsCard service={service} attributes={attributesList} />
              <AddPorsConsBar
                className="mt-2"
                onSubmit={(selectedAttribute) => {
                  console.log(selectedAttribute)
                }}
                placeholder={ProsplaceholderComponent}
              />
            </div>
          ))}
        </div>
        <div className={desktopClassName}>
          {services.map((service, index) => (
            <div className="flex flex-col justify-between p-2" key={index}>
              <ConsCard service={service} attributes={attributesList} />
              <AddPorsConsBar
                className="mt-2"
                onSubmit={(selectedAttribute) => {
                  console.log(selectedAttribute)
                }}
                placeholder={ProsplaceholderComponent}
              />
            </div>
          ))}
        </div>
      </div>
    </ServiceCollapse>
  )
}

export const CompareServiceProsCons = CompareServiceProsConsComponent
