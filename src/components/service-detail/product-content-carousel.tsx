import React from 'react'
import ReactPlayer from 'react-player'
import { Carousel } from '../carousel/carousel'

export type ProductContentCarouselPropsType = {
  promo_video: string
  images: {
    asset: number
    url: string
  }[]
}
export function ProductContentCarousel({ promo_video, images }: ProductContentCarouselPropsType) {
  return (
    <>
      {(promo_video !== '' || images.length > 0) && (
        <Carousel className="mt-2">
          {promo_video !== '' && (
            <Carousel.Item>
              <div className="promo-video-wrapper">
                <ReactPlayer className="promo-video" url={promo_video} width="100%" height="100%" />
              </div>
            </Carousel.Item>
          )}
          {images.map((image) => (
            <Carousel.Item key={image.url}>
              <img className="object-contain" src={image.url} alt="Snapshots Of Software" />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  )
}
