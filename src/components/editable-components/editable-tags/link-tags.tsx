import React, { useState, useEffect } from 'react'
import { Tag } from '@tw/types/tag'
import { Button } from '../../button'
import { EditableTagsTable } from '../editable-table'

type LinkTagsComponentProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: Function
  tags: Tag[]
}

function LinkTagsComponent({ setIsOpen, onSubmit, tags }: LinkTagsComponentProps) {
  const [editTags, setEditTags] = useState(tags ?? [])
  const [isSubmit, setIsSubmit] = useState(false)
  const defaultTagData = {
    name: '',
    slug: '',
    description: null,
  }

  useEffect(() => {
    if (isSubmit) {
      let isSend = true
      for (let i = 0; i < editTags.length; i++) {
        if (editTags[i].name === '') isSend = false
      }
      if (isSend) {
        onSubmit('tags', editTags)
        setIsOpen(false)
      }
      setIsSubmit(false)
    }
  }, [isSubmit])

  return (
    <div className="space-y-4">
      <EditableTagsTable
        editTags={editTags}
        defaultTagData={defaultTagData}
        setEditTags={setEditTags}
        isSubmit={isSubmit}
      />
      <div className="flex flex-row-reverse">
        <Button className="ml-4" buttonType="primary" type="submit" onClick={() => setIsSubmit(true)}>
          Save
        </Button>
        <Button
          buttonType="default"
          type="submit"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export const LinkTags = LinkTagsComponent
