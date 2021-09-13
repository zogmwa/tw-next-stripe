import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import clsx from 'clsx'
import { Carousel } from './carousel'

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
