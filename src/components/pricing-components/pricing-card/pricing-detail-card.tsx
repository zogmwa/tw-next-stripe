import React, { useState } from 'react'
import { BiDollar } from 'react-icons/bi'
import clsx from 'clsx'
import { AiFillCheckCircle } from 'react-icons/ai'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { Plan } from '@taggedweb/types/price-plan'

type PricingDetailCardComponentProps = {
  price: Plan
}

function PricingDetailCardComponent({ price }: PricingDetailCardComponentProps) {
  const [isShowMore, setIsShowMore] = useState(false)
  const defaultShowCount = 4
  let featureString = price.features ?? ''
  const featuresList = featureString.split('\r\n')

  let showFeatureList = featuresList
  if (!isShowMore) showFeatureList = featuresList.slice(0, defaultShowCount)

  return (
    <div className="flex flex-col w-full px-2 pt-4">
      <div className={clsx('flex flex-col items-center', !price.most_popular ? 'pt-[1.1rem]' : '')}>
        {price.most_popular && (
          <span className="text-center min-w-[4rem] min-h-[1.1rem] px-2 ml-2 text-xs border border-solid rounded-2xl bg-secondary text-primary">
            Most Popular
          </span>
        )}
        <h4 className="text-lg font-bold text-text-primary">{price.name}</h4>
      </div>
      <div className="flex items-center justify-center mb-4">
        <BiDollar className="text-2xl font-bold text-text-primary" />
        <span className="pt-1 text-2xl font-bold text-text-primary">{price.price}</span>
      </div>
      <div className="flex flex-col p-2 border-t border-solid border-border-default">
        {price.features.length > 0 && <h4>Features</h4>}
        {showFeatureList.map((feature, index) => (
          <div className="pt-2" key={index}>
            {feature && <AiFillCheckCircle className="inline text-sm text-primary" />}
            {feature && <div className="inline pl-2 text-sm text-text-secondary">{feature}</div>}
          </div>
        ))}
        {price.features.length > 0 &&
          (isShowMore ? (
            <div
              className="flex self-start w-full px-0 mt-4 text-xs border-0 cursor-pointer text-text-secondary"
              onClick={() => setIsShowMore(false)}
            >
              Show Less
              <HiChevronUp className="self-center ml-2 text-text-tertiary" />
            </div>
          ) : (
            <div
              className="flex self-start w-full px-0 mt-4 text-xs border-0 cursor-pointer text-text-secondary"
              onClick={() => setIsShowMore(true)}
            >
              Show More
              <HiChevronDown className="self-center ml-2 text-text-tertiary" />
            </div>
          ))}
      </div>
    </div>
  )
}

export const PricigDetailCard = PricingDetailCardComponent
