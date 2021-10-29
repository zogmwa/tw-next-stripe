import React, { useState } from 'react'
import { ShowEditable } from './show-editable'
import { EditableTextarea } from './editable-textarea'
import { TruncatedDescription } from '../truncated-description'

function EditableServiceDescriptionComponent({ serviceDescription, handleSubmit }) {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <>
      {isEdit ? (
        <EditableTextarea
          textareaName="serviceDescription"
          textareaValue={serviceDescription}
          handleSubmit={(value) => {
            setIsEdit(false)
            handleSubmit('description', value)
          }}
          handleCancel={() => setIsEdit(false)}
        />
      ) : (
        <ShowEditable handleEdit={() => setIsEdit(true)}>
          <TruncatedDescription description={serviceDescription} />
        </ShowEditable>
      )}
    </>
  )
}

export const EditableServiceDescription = EditableServiceDescriptionComponent
