import React, { useState } from 'react'
import { ShowEditable } from './show-editable'
import { EditableInput } from './editable-input'

type EditableServiceNameComponent = {
  serviceName: string
  onSubmit: Function
}

function EditableServiceNameComponent({ serviceName, onSubmit }: EditableServiceNameComponent) {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <>
      {isEdit ? (
        <EditableInput
          inputName="serviceName"
          inputValue={serviceName}
          onSubmit={(value) => {
            setIsEdit(false)
            onSubmit('name', value)
          }}
          onCancel={() => setIsEdit(false)}
        />
      ) : (
        <ShowEditable onEdit={() => setIsEdit(true)}>
          <h1 className="text-base font-medium text-text-primary">{serviceName}</h1>
        </ShowEditable>
      )}
    </>
  )
}

export const EditableServiceName = EditableServiceNameComponent
