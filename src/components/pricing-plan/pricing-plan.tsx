import React from 'react'
import { BiDollar } from 'react-icons/bi'
import { AiFillCheckCircle } from 'react-icons/ai'
import Carousel from 'react-elastic-carousel'
import './style.css'
import { Plan } from '../../types/price-plan'

const breakPoints = [
  { width: 1, itemsToShow: 1, itemsToScroll: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3, itemsToScroll: 2 },
  { width: 1200, itemsToShow: 4, itemsToScroll: 2 },
  { width: 1450, itemsToShow: 5, itemsToScroll: 3 },
  { width: 1750, itemsToShow: 6, itemsToScroll: 3 },
]

type ServicePricingProps = { priceplans: Plan[] }

function ServicePricingComponent({ priceplans }: ServicePricingProps) {
  return (
    <div className="w-full items-center">
      <Carousel isRTL={false} pagination={false} breakPoints={breakPoints}>
        {priceplans.map((items, index) => {
          return (
            <div key={index} className="flex flex-col rounded border-2 mx-2 h-48 ">
              <div className=" self-center font-bold text-text-primary">
                <h1 className="text-base">{items.name}</h1>
              </div>
              <div className="flex flex-auto justify-evenly">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <BiDollar className="text-text-secondary" />
                    <div className="text-5xl">{items.price}</div>
                  </div>
                  <div className="text-text-secondary">per {items.per}</div>
                </div>
                <div className="flex flex-col px-4 py-2">
                  <div className="font-medium text-text-primary self-center">Plan Features</div>
                  <div className="flex flex-wrap">
                    <div className="flex items-center mr-2 align-center">
                      <AiFillCheckCircle className=" text-primary" />
                      <div>All Basic features</div>
                    </div>
                    <div className="flex items-center mr-2 align-center">
                      <AiFillCheckCircle className=" text-primary" />
                      <div>All Basic features</div>
                    </div>
                    <div className="flex items-center mr-2 align-center">
                      <AiFillCheckCircle className=" text-primary" />
                      <div>All Basic features</div>
                    </div>
                    <div className="flex items-center mr-2 align-center">
                      <AiFillCheckCircle className=" text-primary" />
                      <div>All Basic features</div>
                    </div>
                    <div className="flex items-center mr-2 align-center">
                      <AiFillCheckCircle className=" text-primary" />
                      <div>All Basic features</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export const ServicePricing = ServicePricingComponent
