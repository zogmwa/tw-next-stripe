import React, {useState} from "react"
import Carousel from 'react-elastic-carousel'
import { BiDollar } from 'react-icons/bi'
import { Plan } from '../../types/price-plan'

const breakPoints = [
  { width: 1, itemsToShow: 2, itemsToScroll: 1 },
  { width: 420, itemsToShow: 2, itemsToScroll: 1 },
  { width: 768, itemsToShow: 3, itemsToScroll: 2 },
  { width: 1200, itemsToShow: 4, itemsToScroll: 2 },
  { width: 1450, itemsToShow: 5, itemsToScroll: 3 },
  { width: 1750, itemsToShow: 6, itemsToScroll: 3 },
]

type ServicePricingProps = { 
  pricePlans: Plan[] 
  selected: number
  onSelected: any
}

function ServicePricingCardComponent({ pricePlans, selected, onSelected }: ServicePricingProps) {
  const [showedItems, setShowedItems] = useState(0)
  const isMostPopular = 2 // mockup popular data.

  const nextEventHandler = (selctedTag) => {
    console.log('next:', selctedTag)
    onSelected(selctedTag.index)
  }
  
  const prevEventHandler = (selctedTag) => {
    console.log('prev:', selctedTag)
    onSelected(selctedTag.index)
  }

  const resizeEventHandler = (carouselObject) => {
    console.log('resize:', carouselObject.itemsToShow)
    setShowedItems(carouselObject.itemsToShow)
  }

  return (
    <div className="items-center w-full">
      <Carousel 
        isRTL={false} 
        pagination={false} 
        breakPoints={breakPoints}
        focusOnSelect={true}
        itemsToScroll={selected}
        onNextEnd={(selctedTag) => nextEventHandler(selctedTag)}
        onPrevEnd={(selctedTag) => prevEventHandler(selctedTag)}
        onResize={(carouselObject) => resizeEventHandler(carouselObject)}
      >
        {pricePlans.map((item, index) => {
          return (
            <div key={index} className="relative flex justify-center w-full h-48 mx-2">
              <div className={index === isMostPopular - 1 ? "flex w-full h-full" : "flex w-full h-full mb-8"}>
                <div className={((index > selected - 1) && (index < selected + showedItems - 1)) ? "flex flex-col self-center w-full border-r-2 border-solid" : "flex flex-col self-center w-full"}>
                  <div className="flex items-end justify-center mb-4">
                    <BiDollar className="text-3xl text-text-secondary" />
                    <div className="ml-4 text-5xl">{item.price}</div>
                  </div>
                  <div className="flex items-center justify-center text-text-secondary">per {item.per}</div>
                </div>
              </div>
              {index === isMostPopular - 1 &&
                <div className="absolute bottom-0 flex items-center h-8 px-2 text-sm border border-solid rounded-2xl bg-secondary text-primary">Most Popular</div>
              }
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export const ServicePricingCard = ServicePricingCardComponent
