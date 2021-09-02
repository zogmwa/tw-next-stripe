import clsx from 'clsx'
import React, { useImperativeHandle, useState, forwardRef, Ref, useEffect, ReactNode } from 'react'
import { DropzoneOptions, DropzoneState, useDropzone } from 'react-dropzone'
import { HiX } from 'react-icons/hi'

export type FilesDropzoneRef = DropzoneState

export type FilesDropzoneProps = {
  className?: string
  cardClassName?: string
  placeholderClassName?: string
  children?: ((state: DropzoneState) => ReactNode) | ReactNode
} & DropzoneOptions

function getClassNames({ isFileDialogActive, isDragAccept, isDragReject, isFocused }: DropzoneState) {
  if (isFileDialogActive) {
    return 'border-gray-300 bg-gray-50 text-gray-500'
  }
  if (isDragAccept) {
    return 'border-primary bg-secondary text-primary'
  }
  if (isDragReject) {
    return 'border-red-400 bg-red-50 text-red-400'
  }
  if (isFocused) {
    return 'ring-2 ring-offset-1 ring-primary/70 outline-none text-primary'
  }
  return 'border-gray-200 hover:border-primary hover:text-primary text-gray-400'
}

function getFilePreview(file: File) {
  const isImage = file.type.split('/')[0] === 'image'
  if (isImage) {
    return URL.createObjectURL(file)
  }
  return null
}

function FilesDropzoneComponent(
  { className, cardClassName, placeholderClassName, children, ...dzOptions }: FilesDropzoneProps,
  ref: Ref<FilesDropzoneRef>,
) {
  const dz = useDropzone(dzOptions)
  const [files, setFiles] = useState<File[]>(dz.acceptedFiles)

  useEffect(() => {
    setFiles((prev) => [...prev, ...dz.acceptedFiles])
  }, [dz.acceptedFiles])

  useImperativeHandle(ref, () => dz)

  function removeFile(index: number) {
    setFiles((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
  }

  return (
    <div className={clsx('grid grid-cols-2 sm:flex items-start sm:flex-wrap gap-4', className)}>
      {files.map((file, index) => {
        const preview = getFilePreview(file)

        return (
          <div className="aspect-h-1 aspect-w-1 sm:aspect-none" key={`${file.name}-${index}`}>
            <div
              className={clsx(
                'sm:relative flex-shrink-0 sm:w-32 sm:h-32 h-full w-full rounded-lg bg-cover bg-center bg-gray-50',
                cardClassName,
              )}
            >
              <button
                className="absolute p-1 text-xs text-red-600 bg-white rounded opacity-50 top-1 right-1 hover:opacity-100 focus-visible:opacity-100"
                onClick={() => removeFile(index)}
              >
                <HiX />
              </button>
              {preview && <img className="object-cover w-full h-full rounded-[inherit]" src={preview} />}
              {preview === null && (
                <div className="flex items-center w-full h-full border-2 text-xs text-gray-400 border-gray-100 rounded-[inherit] p-2 justify-center">
                  <span className="line-clamp-5">{file.name}</span>
                </div>
              )}
            </div>
          </div>
        )
      })}
      <div className="aspect-h-1 aspect-w-1 sm:aspect-none">
        <div
          className={clsx(
            'sm:w-32 sm:h-32 h-full w-full flex-shrink-0 rounded-lg border-dashed transition-all ease-in duration-75 border-2',
            getClassNames(dz),
            placeholderClassName,
          )}
          {...dz.getRootProps()}
        >
          {children === undefined && (
            <div className="flex items-center justify-center w-full h-full p-4 text-xs text-center">
              <span>Drag file(s) to upload</span>
            </div>
          )}
          {typeof children === 'function' ? children(dz) : children}
          <input {...dz.getInputProps()} />
        </div>
      </div>
    </div>
  )
}

export const FilesDropzone = forwardRef(FilesDropzoneComponent)
