import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import clsx from 'clsx'
import { Carousel } from './carousel'
import { CarouselPaging } from './carousel-paging'

export default {
  title: 'General/Carousel',
  component: Carousel,
} as Meta

const images = [
  'https://imgur.com/E5KVyYQ.jpg',
  'https://imgur.com/sQJAoyN.jpg',
  'https://imgur.com/sde7zsn.jpg',
  'https://imgur.com/X3ESO2P.jpg',
]

const AssetImages = [
  {
    asset: 1,
    url: 'https://eep.io/images/yzco4xsimv0y/7eTe0Uq71Y3hG7DsuUg3Uz/7a62f2b25b4e9a28ce25d12b07bbafa7/05_-_Automate_Your_Marketing-min.png',
  },
  {
    asset: 1,
    url: 'https://eep.io/images/yzco4xsimv0y/1CYWQPt3Bn5qxpqfoJIwAQ/a1299c4f4228da786e93ef9dd6a44284/02_-_Market_Your_Business.png',
  },
  {
    asset: 1,
    url: 'https://eep.io/images/yzco4xsimv0y/2N9sFG6PG9HDHwJ4mtvS7k/19f56d3cdae2403d604e65f4b3db3ce7/00_-_Hero.png',
  },
]

export function SimpleImageCarousel() {
  return (
    <Carousel>
      {images.map((url) => (
        <Carousel.Item key={url}>
          <img className="object-contain" src={url} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

const colors = ['bg-red-400', 'bg-green-500', 'bg-blue-400']

export function ControlledCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <Carousel
      className="max-w-max"
      itemsContainerClassName="h-64 w-64 !rounded-none"
      currentIndex={currentIndex}
      onCurrentIndexChange={setCurrentIndex}
    >
      {colors.map((color, index) => (
        <Carousel.Item className="!aspect-w-1 !aspect-h-1" key={color}>
          <div className={clsx('flex items-center justify-center', color)}>
            <span className="text-5xl font-bold text-text-on-surface">{index + 1}</span>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export function SimpleCarouselPaging() {
  return <CarouselPaging images={AssetImages} />
}
