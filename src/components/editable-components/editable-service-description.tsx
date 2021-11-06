import React, { useState } from 'react'
import { ShowEditable } from './show-editable'
import { EditableTextarea } from './editable-textarea'
import { TruncatedDescription } from '../truncated-description'

type EditableServiceDescriptionComponentProps = {
  serviceDescription: string
  onSubmit: Function
}

function EditableServiceDescriptionComponent({
  serviceDescription,
  onSubmit,
}: EditableServiceDescriptionComponentProps) {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <>
      {isEdit ? (
        <EditableTextarea
          textareaName="serviceDescription"
          textareaValue={serviceDescription}
          onSubmit={(value) => {
            setIsEdit(false)
            onSubmit('description', value)
          }}
          onCancel={() => setIsEdit(false)}
        />
      ) : (
        <ShowEditable onEdit={() => setIsEdit(true)}>
          <TruncatedDescription description={serviceDescription} />
        </ShowEditable>
      )}
    </>
  )
}

export const EditableServiceDescription = EditableServiceDescriptionComponent
