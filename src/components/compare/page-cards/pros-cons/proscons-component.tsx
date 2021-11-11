/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import { HiChevronUp } from 'react-icons/hi'
import { Asset } from '@taggedweb/types/asset'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { Button } from '../../../button'
import { AddPorsConsBar } from './proscons-add-bar'

type ProsConsComponentProps = {
  service: Asset
}

function ProsConsComponent({ service }: ProsConsComponentProps) {
  const { authVerified } = useUserContext()
  const [showProsList, setShowProsList] = useState([])
  const [showConsList, setShowConsList] = useState([])
  const defaultShowCount = 5

  useEffect(() => {
    const attributes = service.attributes

    if (attributes) {
      setShowProsList(attributes.filter((attribute) => attribute.is_con === false).slice(0, defaultShowCount))
      setShowConsList(attributes.filter((attribute) => attribute.is_con === true).slice(0, defaultShowCount))
    }
  }, [])

  return (
    <div className="flex flex-col md:divide md:divide-y md:divide-border-default">
      <div className="flex flex-col p-2">
        <h2 className="text-black text-md text-semibold">{service.name} Pros</h2>
        {showProsList.map((attribute) => (
          <div className="mt-2 mb-2" key={attribute.name}>
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
          isCon={false}
          asset={service.id}
          placeholder="Add a Pro"
          authVerified={authVerified}
        />
      </div>
      <div className="flex flex-col p-2">
        <h2 className="text-black text-md text-semibold">{service.name} Cons</h2>
        {showConsList.map((attribute) => (
          <div className="mt-2 mb-2" key={attribute.name}>
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
          isCon={true}
          asset={service.id}
          placeholder="Add a Con"
          authVerified={authVerified}
        />
      </div>
    </div>
  )
}

export const ProsCons = ProsConsComponent
