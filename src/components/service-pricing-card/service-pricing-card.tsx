import React from "react"
import Slider from "react-slick";
import { BiDollar } from 'react-icons/bi'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Plan } from '../../types/price-plan'
import { PricingFeaturesList } from './pricing-features-list'

type ServicePricingProps = { 
  pricePlans: Plan[] 
  selected: number
  onSelected: any
  carousel: any
}

const PrevArrow = (props) => {
  const { className, onClick } = props
  return (
      <div 
          className={`shadow rounded-full ${className}`}
          onClick={onClick}
      >
          <HiChevronLeft className="text-text-secondary hover:text-black" />
      </div>
  );
}
const NextArrow = (props) => {
  const { className, onClick } = props
  return (
      <div 
          className={`shadow rounded-full ${className}`}
          onClick={onClick}
      >
          <HiChevronRight className="text-text-secondary hover:text-black" />
      </div>
  );
}


function ServicePricingCardComponent({ pricePlans, selected, onSelected, carousel }: ServicePricingProps) {
  const isMostPopular = 2 // mockup popular data.
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2.999,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 1.999,
        slidesToScroll: 1,
      }
    }]
  }

  return (
      <div className="px-2 md:border md:border-solid md:rounded-md md:border-text-tertiary md:w-6/12">
        <Slider 
          afterChange={nextIndex => onSelected(nextIndex)}
          ref={carousel}
          {...settings}
          className="mx-6"
        >
          {pricePlans.map((item, index) => {
            return (
              <div key={index} className="relative flex justify-center w-full h-48 mx-2 text-center">
                <div className={index === isMostPopular - 1 ? "flex w-full h-full" : "flex w-full h-full mb-8"}>
                  <div className="flex flex-col self-center w-full">
                    <div className="flex items-center content-center justify-center mb-4">
                      <BiDollar className="text-xl text-text-secondary" />
                      <div className="ml-2 text-3xl">{item.price}</div>
                    </div>
                    <div className="flex items-center justify-center text-text-secondary">per {item.per}</div>
                  </div>
                </div>
                {index === isMostPopular - 1 &&
                  <div className="absolute bottom-0 w-full h-8">
                    <span className="px-2 text-sm border border-solid rounded-2xl bg-secondary text-primary">Most Popular</span>
                  </div>
                }
              </div>
            )
          })}
        </Slider>
        <PricingFeaturesList pricePlans={pricePlans} selected={selected} />
      </div>
  )
}

export const ServicePricingCard = ServicePricingCardComponent
