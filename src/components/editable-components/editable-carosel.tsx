import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { ProductContentCarouselPropsType } from '../service-detail/product-content-carousel'
import { ProductContentCarouselSkeleton } from '../service-detail/product-content-skeleton'
import { Modal } from '../Modal'
import { ImageUploader } from '../image-uploader'
import { fetchFileFromCloudinary } from '../../utils/file'
import { Button } from '../button'

export type EditableCarouselComponentType = {
  promo_video: string
  images: {
    asset: number
    url: string
  }[]
  onChange: Function
  isEdit: boolean
  onEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductContentCarousel = dynamic<ProductContentCarouselPropsType>(
  () => import('../service-detail/product-content-carousel').then((mod) => mod.ProductContentCarousel),
  {
    ssr: false,
    loading: ProductContentCarouselSkeleton,
  },
)

function EditableCarouselComponent({ promo_video, images, onChange, isEdit, onEdit }: EditableCarouselComponentType) {
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [loadedFilesList, setLoadedFilesList] = useState([])
  const [loadedFilesUrls, setLoadedFilesUrls] = useState({})
  const [updateUrls, setUpdateUrls] = useState([])
  const [promoVideoUrl, setPromoVideoUrl] = useState('')
  const [defaultImages, setDefaultImages] = useState([])

  useEffect(() => {
    let defaultUpdateUrl = []
    for (let i = 0; i < images.length; i++) defaultUpdateUrl.push({ url: images[i].url })
    setDefaultImages(images)
    setUpdateUrls(defaultUpdateUrl)
    setPromoVideoUrl(promo_video)
  }, [images, promo_video])

  useEffect(() => {
    async function getImageFilesList() {
      await Promise.all(defaultImages.map((image) => fetchFileFromCloudinary(image.url))).then((res) => {
        let loadedFiles = []
        let loadedUrls = {}
        for (let i = 0; i < res.length; i++) {
          let loadedFile: any = res[i] as File
          loadedFile.name = `fake-loaded-file-name-${i}`
          loadedUrls[`fake-loaded-file-name-${i}`] = defaultImages[i].url
          loadedFiles.push(loadedFile)
        }

        setLoadedFilesList(loadedFiles)
        setLoadedFilesUrls(loadedUrls)
      })
    }

    getImageFilesList()
  }, [isEdit, images])

  const handleSubmit = () => {
    const updateData = {
      snapshots: updateUrls,
      promo_video: promoVideoUrl,
    }

    onChange(updateData)
    onEdit(false)
  }

  return (
    <>
      <ProductContentCarousel promo_video={promoVideoUrl} images={defaultImages} />
      <Modal isOpen={isEdit} setIsOpen={onEdit} size="xl">
        <>
          <div className="flex items-center pb-2">
            <label className="pr-2 text-sm font-medium text-text-primary">Video URL</label>
            <input
              className="px-2 border border-solid rounded-md border-border-default focus:ring-0"
              placeholder="https://example.com/video.mp4"
              name="promo-video"
              value={promoVideoUrl}
              onChange={(e) => setPromoVideoUrl(e.target.value)}
            />
          </div>
          <label className="text-sm font-medium text-text-primary">Snapshots</label>
          <ImageUploader
            limit={5}
            defaultUrls={loadedFilesUrls}
            onUploading={setIsUploadingImage}
            onFilesChange={(files) => {
              setLoadedFilesList(files)
            }}
            onChange={(urls) => {
              setUpdateUrls(urls.map((url) => ({ url })))
            }}
            files={loadedFilesList}
          />
          <div className="flex flex-row-reverse mt-2">
            <Button className="mr-2" disabled={isUploadingImage} onClick={() => onEdit(false)}>
              Cancel
            </Button>
            <Button
              className="mr-2 bg-primary"
              textClassName="text-white"
              disabled={isUploadingImage}
              loading={isUploadingImage}
              loadingClassName="text-background-light"
              onClick={() => handleSubmit()}
            >
              Save
            </Button>
          </div>
        </>
      </Modal>
    </>
  )
}

export const EditableCarousel = EditableCarouselComponent
