import clsx from 'clsx'
import React, { useImperativeHandle, useState, forwardRef, Ref, useCallback, ReactNode, SetStateAction } from 'react'
import { DropzoneOptions, DropzoneState, useDropzone } from 'react-dropzone'
import { HiX } from 'react-icons/hi'

export type FilesDropzoneRef = DropzoneState

export type FilesDropzoneProps = {
  className?: string
  cardClassName?: string
  placeholderClassName?: string
  children?: ((state: DropzoneState) => ReactNode) | ReactNode
  previewType?: 'picture-card' | 'none'
  limit?: number
  files?: File[]
  onFilesChange?: (files: File[]) => void
} & DropzoneOptions

function getClassNames({ isFileDialogActive, isDragAccept, isDragReject, isFocused }: DropzoneState) {
  if (isFileDialogActive) {
    return 'border-border-default bg-background-light text-text-secondary'
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
  return 'border-border-default hover:border-primary hover:text-primary text-text-tertiary'
}

function getFilePreview(file: File) {
  const isImage = file.type.split('/')[0] === 'image'
  if (isImage) {
    return URL.createObjectURL(file)
  }
  return null
}

function FilesDropzoneComponent(
  {
    className,
    cardClassName,
    placeholderClassName,
    children,
    previewType = 'picture-card',
    limit: incomingLimit = Infinity,
    files: outerFiles,
    onFilesChange,
    onDrop,
    ...dzOptions
  }: FilesDropzoneProps,
  ref: Ref<FilesDropzoneRef>,
) {
  const [innerFiles, setInnerFiles] = useState<File[]>([])
  const files = outerFiles ?? innerFiles
  const isControlled = outerFiles !== undefined
  const limit = Math.max(1, incomingLimit)
  const showDropzone = files.length < limit || previewType === 'none'

  const setFiles = useCallback(
    (action: SetStateAction<File[]> | File[]) => {
      if (!isControlled) {
        setInnerFiles(action)
      }
      const updatedFiles = typeof action === 'function' ? action(files) : action
      onFilesChange && onFilesChange(updatedFiles)
    },
    [files, isControlled, onFilesChange],
  )

  const handleOnDrop = useCallback(
    (acceptedFiles, rejectedFiles, event) => {
      onDrop && onDrop(acceptedFiles, rejectedFiles, event)
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles.slice(0, Math.max(0, limit - prevFiles.length))])
    },
    [limit, onDrop, setFiles],
  )
  const dz = useDropzone({ onDrop: handleOnDrop, ...dzOptions })

  useImperativeHandle(ref, () => dz)

  function removeFile(index: number) {
    setFiles((prevFiles) => [...prevFiles.slice(0, index), ...prevFiles.slice(index + 1)])
  }

  return (
    <div className={clsx('grid grid-cols-2 sm:flex items-start sm:flex-wrap gap-4', className)}>
      {previewType === 'picture-card' &&
        files.map((file, index) => {
          const preview = getFilePreview(file)
          return (
            <div
              className="aspect-h-1 aspect-w-1 sm:aspect-none"
              key={`${file.name}-${file.size}-${file.lastModified}`}
            >
              <div
                className={clsx(
                  'sm:relative flex-shrink-0 sm:w-32 sm:h-32 h-full w-full rounded-lg bg-cover bg-center bg-background-light',
                  cardClassName,
                )}
              >
                <button
                  className="absolute p-1 text-xs text-red-600 bg-white rounded opacity-50 top-1 right-1 hover:opacity-100 focus-visible:opacity-100"
                  onClick={() => {
                    removeFile(index)
                  }}
                >
                  <HiX />
                </button>
                {preview && <img className="object-cover w-full h-full rounded-[inherit]" src={preview} />}
                {preview === null && (
                  <div className="flex items-center w-full h-full border-2 text-xs text-text-tertiary border-border-light rounded-[inherit] p-2 justify-center">
                    <span className="line-clamp-5">{file.name}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      {showDropzone && (
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
      )}
    </div>
  )
}

export const FilesDropzone = forwardRef(FilesDropzoneComponent)
