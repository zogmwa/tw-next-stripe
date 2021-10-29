import React, { useState } from 'react'
import { ShowEditable } from './show-editable'
import { EditableInput } from './editable-input'

function EditableServiceNameComponent({ serviceName, handleSubmit }) {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <>
      {isEdit ? (
        <EditableInput
          inputName="serviceName"
          inputValue={serviceName}
          handleSubmit={(value) => {
            setIsEdit(false)
            handleSubmit('name', value)
          }}
          handleCancel={() => setIsEdit(false)}
        />
      ) : (
        <ShowEditable handleEdit={() => setIsEdit(true)}>
          <h1 className="text-base font-medium text-text-primary">{serviceName}</h1>
        </ShowEditable>
      )}
    </>
  )
}

export const EditableServiceName = EditableServiceNameComponent
