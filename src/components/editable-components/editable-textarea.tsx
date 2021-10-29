import React, { useState } from 'react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import ReactTooltip from 'react-tooltip'

type EditableTextareaComponent = {
  textareaName: string
  textareaValue: string | number
  onSubmit: Function
  onCancel: Function
}

function EditableTextareaComponent({ textareaName, textareaValue, onSubmit, onCancel }: EditableTextareaComponent) {
  const [value, setValue] = useState(textareaValue)

  return (
    <div className="relative w-full mt-2">
      <textarea
        className="w-full pl-1 text-sm border border-solid rounded-md pr-[2rem] text-text-primary border-border-default"
        value={value}
        name={textareaName}
        onChange={(event) => setValue(event.target.value)}
      ></textarea>
      <AiOutlineCheck
        className="absolute top-[0.3rem] right-[2rem] text-success text-md cursor-pointer hover:shadow-sm"
        onClick={() => onSubmit(value)}
        data-for="tooltip-save"
        data-tip
      />
      <ReactTooltip id="tooltip-save" type="light" place="right" border={true} borderColor="text-grey-200">
        Save
      </ReactTooltip>
      <AiOutlineClose
        className="absolute top-[0.3rem] right-[1rem] text-red-600 text-md cursor-pointer hover:shadow-sm"
        data-for="tooltip-cancel"
        onClick={() => onCancel()}
        data-tip
      />
      <ReactTooltip id="tooltip-cancel" type="light" place="right" border={true} borderColor="text-grey-200">
        Cancel
      </ReactTooltip>
    </div>
  )
}

export const EditableTextarea = EditableTextareaComponent
