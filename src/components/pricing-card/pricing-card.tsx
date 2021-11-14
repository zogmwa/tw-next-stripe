import React from 'react'
import { BiDollar } from 'react-icons/bi'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Plan } from '@taggedweb/types/price-plan'

type PricingCardComponentProps = {
  pricePlans: Plan[]
}

function PricingCardComponent({ pricePlans }: PricingCardComponentProps) {
  const featuresList = []
  for (let i = 0; i < pricePlans.length; i++) {
    let featureString = pricePlans[i].features ?? ''
    featuresList.push(featureString.split('\r\n'))
  }

  return (
    <>
      <div className="hidden p-2 border border-solid divide-x rounded-md md:flex border-border-default divide-solid divide-border-default">
        {pricePlans.map((price, index) => (
          <div className="flex flex-col w-full px-2 pt-4" key={price.name}>
            <div className="flex justify-start">
              <h4 className="text-lg font-bold text-text-primary">{price.name}</h4>
              {price.most_popular && (
                <span className="self-center px-2 ml-2 text-xs border border-solid rounded-2xl bg-secondary text-primary">
                  Most Popular
                </span>
              )}
            </div>
            <div className="flex items-center mb-4">
              <BiDollar className="text-2xl font-bold text-text-primary" />
              <span className="pt-1 text-2xl font-bold text-text-primary">{price.price}</span>
            </div>
            <div className="flex flex-col p-2 border-t border-solid border-border-default">
              {price.features.length > 0 && <h4>Features</h4>}
              {featuresList[index].map((feature, index) => (
                <div className="pt-2" key={index}>
                  {feature && <AiFillCheckCircle className="inline text-sm text-primary" />}
                  {feature && <div className="inline pl-2 text-sm text-text-secondary">{feature}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col p-2 border border-solid divide-y rounded-md md:hidden border-border-default divide-solid divide-border-default">
        {pricePlans.map((price, index) => (
          <div className="flex flex-col w-full px-2 pt-4" key={price.name}>
            <div className="flex justify-start">
              <h4 className="text-lg font-bold text-text-primary">{price.name}</h4>
              {price.most_popular && (
                <span className="self-center px-2 ml-2 text-xs border border-solid rounded-2xl bg-secondary text-primary">
                  Most Popular
                </span>
              )}
            </div>
            <div className="flex items-center mb-4">
              <BiDollar className="text-2xl font-bold text-text-primary" />
              <span className="pt-1 text-2xl font-bold text-text-primary">{price.price}</span>
            </div>
            <div className="flex flex-col p-2 border-t border-solid border-border-default">
              {price.features.length > 0 && <h4>Features</h4>}
              {featuresList[index].map((feature, index) => (
                <div className="pt-2" key={index}>
                  {feature && <AiFillCheckCircle className="inline text-sm text-primary" />}
                  {feature && <div className="inline pl-2 text-sm text-text-secondary">{feature}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export const PricingCard = PricingCardComponent
