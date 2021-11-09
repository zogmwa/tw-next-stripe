import React, { useState } from 'react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import ReactTooltip from 'react-tooltip'

type EditableInputComponentProps = {
  inputName: string
  inputValue: string | number
  onSubmit: Function
  onCancel: Function
}

function EditableInputComponent({ inputName, inputValue, onSubmit, onCancel }: EditableInputComponentProps) {
  const [value, setValue] = useState(inputValue)

  return (
    <div className="relative w-full md:w-auto">
      <input
        className="w-full pl-1 pr-[2.5rem] text-base font-medium border border-solid rounded-md md:w-auto text-text-primary border-border-default"
        value={value}
        name={inputName}
        onChange={(event) => setValue(event.target.value)}
      />
      <AiOutlineCheck
        className="absolute top-[0.3rem] right-[1.5rem] text-success text-md cursor-pointer"
        onClick={() => onSubmit(value)}
        data-for="tooltip-save"
        data-tip
      />
      <ReactTooltip id="tooltip-save" type="light" place="right" border={true} borderColor="text-grey-200">
        Save
      </ReactTooltip>
      <AiOutlineClose
        className="absolute top-[0.3rem] right-[0.5rem] text-red-600 text-md cursor-pointer"
        onClick={() => onCancel()}
        data-for="tooltip-cancel"
        data-tip
      />
      <ReactTooltip id="tooltip-cancel" type="light" place="right" border={true} borderColor="text-grey-200">
        Cancel
      </ReactTooltip>
    </div>
  )
}

export const EditableInput = EditableInputComponent
