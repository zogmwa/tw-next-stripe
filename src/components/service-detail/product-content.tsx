import React from 'react'
import dynamic from 'next/dynamic'
import { Asset } from '../../types/asset'
import { ProductContentCarouselPropsType } from './product-content-carousel'
import { ProductContentCarouselSkeleton } from './product-content-skeleton'

const ProductContentCarousel = dynamic<ProductContentCarouselPropsType>(
  () => import('./product-content-carousel').then((mod) => mod.ProductContentCarousel),
  {
    ssr: false,
    loading: ProductContentCarouselSkeleton,
  },
)
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
      <ProductContentCarousel promo_video={promo_video} images={images} />
      <p className="mt-2 space-y-2 text-sm text-text-secondary">{service.description}</p>
    </div>
  )
}

export const ProductContent = ProductContentComponent
