import React, { useState, useEffect } from 'react'
import { HiChevronUp } from 'react-icons/hi'
import { Button } from '../../../button'
import { Asset } from '../../../../types/asset'
import { fetchUpvotedAttributes } from '../../../../queries/service'
import { AddPorsConsBar } from './proscons-add-bar'

type ProsConsComponent = {
  service: Asset
}

const ProsplaceholderComponent = (
  <div className="flex items-center justify-center space-x-2 text-sm">
    <div>Add a Pro</div>
  </div>
)

const ConsplaceholderComponent = (
  <div className="flex items-center justify-center space-x-2 text-sm">
    <div>Add a Con</div>
  </div>
)

function ProsConsComponent({ service }: ProsConsComponent) {
  const [prosList, setProsList] = useState([])
  const [consList, setConsList] = useState([])
  const [showProsList, setShowProsList] = useState([])
  const [showConsList, setShowConsList] = useState([])
  const defaultShowCount = 5

  useEffect(() => {
    async function getServicesAttributes() {
      const attributes = await fetchUpvotedAttributes(service.slug)

      if (attributes) {
        setProsList(attributes.filter((attribute) => attribute.is_con === false))
        setConsList(attributes.filter((attribute) => attribute.is_con === true))
        setShowProsList(attributes.filter((attribute) => attribute.is_con === false).slice(0, defaultShowCount))
        setShowConsList(attributes.filter((attribute) => attribute.is_con === true).slice(0, defaultShowCount))
      }
    }

    getServicesAttributes()
  }, [service.id])

  return (
    <div className="flex flex-col md:divide md:divide-y md:divide-border-default">
      <div className="flex flex-col p-2">
        <h2 className="text-black text-md text-semibold">{service.name} Pros</h2>
        {showProsList.map((attribute) => (
          <div className="mt-2" key={attribute.name}>
            <Button
              size="small"
              className={
                typeof attribute?.my_asset_attribute_vote !== 'undefined' && attribute.my_asset_attribute_vote
                  ? 'self-start text-background-light bg-primary'
                  : 'self-start text-text-secondary border-text-tertiary'
              }
              textClassName={
                typeof attribute?.my_asset_attribute_vote !== 'undefined' && attribute.my_asset_attribute_vote
                  ? 'text-background-light'
                  : 'text-text-secondary'
              }
              icon={
                <HiChevronUp
                  className={
                    typeof attribute?.my_asset_attribute_vote !== 'undefined' && attribute.my_asset_attribute_vote
                      ? 'text-background-light'
                      : 'text-text-secondary'
                  }
                />
              }
            >
              {Number(attribute.upvotes_count) ? Number(attribute.upvotes_count) : 0}
            </Button>
            <span className="ml-2 text-sm text-text-secondary">{attribute.name}</span>
          </div>
        ))}
        <AddPorsConsBar
          className="mt-2"
          onSubmit={(selectedAttribute) => {
            console.log(selectedAttribute)
          }}
          placeholder={ProsplaceholderComponent}
        />
      </div>
      <div className="flex flex-col p-2">
        <h2 className="text-black text-md text-semibold">{service.name} Cons</h2>
        {showConsList.map((attribute) => (
          <div className="mt-2" key={attribute.name}>
            <Button
              size="small"
              className={
                typeof attribute?.my_asset_attribute_vote !== 'undefined' && attribute.my_asset_attribute_vote
                  ? 'self-start text-background-light bg-primary'
                  : 'self-start text-text-secondary border-text-tertiary'
              }
              textClassName={
                typeof attribute?.my_asset_attribute_vote !== 'undefined' && attribute.my_asset_attribute_vote
                  ? 'text-background-light'
                  : 'text-text-secondary'
              }
              icon={
                <HiChevronUp
                  className={
                    typeof attribute?.my_asset_attribute_vote !== 'undefined' && attribute.my_asset_attribute_vote
                      ? 'text-background-light'
                      : 'text-text-secondary'
                  }
                />
              }
            >
              {Number(attribute.upvotes_count) ? Number(attribute.upvotes_count) : 0}
            </Button>
            <span className="ml-2 text-sm text-text-secondary">{attribute.name}</span>
          </div>
        ))}
        <AddPorsConsBar
          className="mt-2"
          onSubmit={(selectedAttribute) => {
            console.log(selectedAttribute)
          }}
          placeholder={ConsplaceholderComponent}
        />
      </div>
    </div>
  )
}

export const ProsCons = ProsConsComponent
