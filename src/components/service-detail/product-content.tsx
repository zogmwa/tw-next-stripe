import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Asset } from '@tw/types/asset'
import { ProductContentCarouselPropsType } from './product-content-carousel'
import { ProductContentCarouselSkeleton } from './product-content-skeleton'
import { ShowEditable, EditableCarousel, EditableServiceDescription } from '../editable-components'

const ProductContentCarousel = dynamic<ProductContentCarouselPropsType>(
  () => import('./product-content-carousel').then((mod) => mod.ProductContentCarousel),
  {
    ssr: false,
    loading: ProductContentCarouselSkeleton,
  },
)
type ServiceDetailPriductProps = {
  service: Asset
  editAllowed?: boolean
  onChange?: Function
}

function ProductContentComponent({ service, editAllowed = false, onChange = () => {} }: ServiceDetailPriductProps) {
  if (typeof service === 'undefined') return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [carouselEdit, setCaroselEdit] = useState(false)
  const promo_video = service?.promo_video ?? ''
  const images = service?.snapshots ?? []

  return (
    <div className="ml-3">
      <h1 className="text-base font-medium text-text-primary">What is {service.name}?</h1>
      {editAllowed ? (
        <div className="flex">
          <ShowEditable onEdit={() => setCaroselEdit(true)}>
            <p className="space-y-2 text-sm text-text-secondary">Screenshots</p>
          </ShowEditable>
        </div>
      ) : (
        <p className="space-y-2 text-sm text-text-secondary">Screenshots</p>
      )}
      {editAllowed ? (
        <EditableCarousel
          promo_video={promo_video}
          images={images}
          onChange={onChange}
          isEdit={carouselEdit}
          onEdit={setCaroselEdit}
        />
      ) : (
        <ProductContentCarousel promo_video={promo_video} images={images} />
      )}
      {editAllowed ? (
        <div className="flex items-end">
          <EditableServiceDescription
            serviceDescription={service.description}
            onSubmit={(field, value) => onChange({ [field]: value })}
          />
        </div>
      ) : (
        <p className="mt-2 space-y-2 text-sm text-text-secondary">{service.description}</p>
      )}
    </div>
  )
}

export const ProductContent = ProductContentComponent
