import React from 'react'
import { HiChevronUp } from 'react-icons/hi'
import { Button } from '../../../button'

function ProsCardComponent({ service, attributes }) {
  const defaultShowCount = 5
  let serviceProsAttributes = []

  if (attributes.length > 0) {
    serviceProsAttributes = attributes
      .filter((attribute) => service.id === attribute.asset)[0]
      .attributes.filter((attribute) => !attribute.is_con)
      .slice(0, defaultShowCount)
  } else return null

  return (
    <div className="flex flex-col">
      <h2 className="text-black text-md text-semibold">{service.name} Pros</h2>
      {serviceProsAttributes.map((attribute) => (
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
    </div>
  )
}

export const ProsCard = ProsCardComponent
