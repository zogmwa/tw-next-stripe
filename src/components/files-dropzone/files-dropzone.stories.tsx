import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { FilesDropzone } from './files-dropzone'

export default {
  title: 'General/FilesDropzone',
  component: FilesDropzone,
} as Meta

export function ControlledDropzone() {
  const [files, setFiles] = useState<File[]>([])

  return <FilesDropzone files={files} onFilesChange={setFiles} />
}

export function DropzoneWithFilesLimit() {
  return <FilesDropzone limit={2} />
}

export function CustomPlaceholder() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <FilesDropzone files={files} limit={2} onFilesChange={setFiles}>
      <div className="flex flex-col items-center justify-center w-full h-full p-2 space-y-2 text-sm">
        <span className="text-2xl">📂</span>
        <span>Drop Files Here</span>
      </div>
    </FilesDropzone>
  )
}
