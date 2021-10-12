import React from 'react'
import ReactPlayer from 'react-player'
import { Carousel } from '../carousel/carousel'
import { Asset } from '../../types/asset'

type ServiceDetailPriductProps = {
  service: Asset
}

function ProductContentComponent({ service }: ServiceDetailPriductProps) {
  if (typeof service === 'undefined') return null

  const promo_video = service?.promo_video ?? ''
  const images = service?.snapshots ?? []

  return (
    <div className="ml-3">
      <h1 className="text-base font-medium text-text-primary">What is {service.name}?</h1>
      <p className="space-y-2 text-sm text-text-secondary">Screenshots</p>
      {(promo_video !== '' || images.length > 0) && (
        <Carousel className="mt-2">
          {promo_video !== '' && (
            <Carousel.Item>
              <div className="promo-video-wrapper">
                <ReactPlayer
                  className="promo-video"
                  url={promo_video}
                  width="100%"
                  height="100%"
                />
              </div>
            </Carousel.Item>
          )}
          {images.map((image) => (
            <Carousel.Item key={image.url}>
              <img className="object-contain" src={image.url} />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      <p className="mt-2 space-y-2 text-sm text-text-secondary">{service.description}</p>
    </div>
  )
}

export const ProductContent = ProductContentComponent
