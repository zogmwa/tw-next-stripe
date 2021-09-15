import React, { useState, useRef, useEffect } from 'react'
import { uploadFileToCloudinary } from '../../utils/file'
import { FilesDropzone } from '../files-dropzone'

type ImageUploaderProps = React.ComponentProps<typeof FilesDropzone> & {
  onUploading?: (uploading: boolean) => void
  onChange?: (urls: string[]) => void
}

export function ImageUploader({ onChange, onUploading, onFilesChange, ...restProps }: ImageUploaderProps) {
  const [urls, setUrls] = useState<{ [name: string]: string }>({})

  const onChangeCb = useRef(onChange)

  useEffect(() => {
    onChangeCb.current?.(Object.values(urls))
  }, [urls])

  return (
    <FilesDropzone
      onFilesChange={async (files) => {
        onFilesChange?.(files)
        const filesChanged = files.filter((file) => !urls[file.name])
        onUploading?.(true)
        try {
          const uploadedUrls = await Promise.all(filesChanged.map(uploadFileToCloudinary))
          setUrls((prevState) =>
            files.reduce((acc, file) => {
              const uploadedUrl = prevState[file.name] ?? uploadedUrls[filesChanged.indexOf(file)]
              if (uploadedUrl) {
                return {
                  ...acc,
                  [file.name]: uploadedUrl,
                }
              }
              return acc
            }, {}),
          )
        } catch (error) {
          // @TODO: Update error handling
        } finally {
          onUploading?.(false)
        }
      }}
      {...restProps}
    />
  )
}
