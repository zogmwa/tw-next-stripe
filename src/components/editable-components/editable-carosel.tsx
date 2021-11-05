import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { ProductContentCarouselPropsType } from '../service-detail/product-content-carousel'
import { ProductContentCarouselSkeleton } from '../service-detail/product-content-skeleton'
import { ShowEditable } from './index'
import { Modal } from '../Modal'
import { ImageUploader } from '../image-uploader'
import { fetchFileFromCloudinary } from '../../utils/file'

export type EditableCarouselComponentType = {
  promo_video: string
  images: {
    asset: number
    url: string
  }[]
}

const ProductContentCarousel = dynamic<ProductContentCarouselPropsType>(
  () => import('../service-detail/product-content-carousel').then((mod) => mod.ProductContentCarousel),
  {
    ssr: false,
    loading: ProductContentCarouselSkeleton,
  },
)

function EditableCarouselComponent({ promo_video, images }: EditableCarouselComponentType) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isUploadinImage, setIsUploadingImage] = useState(false)
  const [loadedFilesList, setLoadedFilesList] = useState([])
  const [loadedFilesUrls, setLoadedFilesUrls] = useState({})
  const [promoVideoUrl, setPromoVideoUrl] = useState(promo_video)

  useEffect(() => {
    async function getImageFilesList() {
      await Promise.all(images.map((image) => fetchFileFromCloudinary(image.url))).then((res) => {
        let loadedFiles = []
        let loadedUrls = {}
        for (let i = 0; i < res.length; i++) {
          let loadedFile: any = res[i] as File
          loadedFile.name = `fake-loaded-file-name-${i}`
          loadedUrls[`fake-loaded-file-name-${i}`] = images[i].url
          loadedFiles.push(loadedFile)
        }

        setLoadedFilesList(loadedFiles)
        setLoadedFilesUrls(loadedUrls)
      })
    }

    getImageFilesList()
  }, [isEditModalOpen])

  return (
    <>
      <div className="flex">
        <ShowEditable onEdit={() => setIsEditModalOpen(true)}>
          <ProductContentCarousel promo_video={promo_video} images={images} />
        </ShowEditable>
      </div>
      <Modal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} size="xl">
        <>
          <ImageUploader
            limit={5}
            defaultUrls={loadedFilesUrls}
            onUploading={setIsUploadingImage}
            onFilesChange={(files) => {
              setLoadedFilesList(files)
            }}
            onChange={(urls) => {
              // setFieldValue(
              //   'snapshots',
              //   urls.map((url) => ({ url })),
              // )
              console.log('urls', urls)
            }}
            files={loadedFilesList}
          />
          <label className="block mb-2 text-sm font-medium lg:text-base text-text-primary" htmlFor="description">
            Video URL
          </label>
          <input
            placeholder="https://example.com/video.mp4"
            name="promo-video"
            value={promo_video}
            onChange={(e) => setPromoVideoUrl(e.target.value)}
          />
        </>
      </Modal>
    </>
  )
}

export const EditableCarousel = EditableCarouselComponent
