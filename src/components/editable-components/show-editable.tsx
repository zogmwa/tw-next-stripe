import React from 'react'
import ReactTooltip from 'react-tooltip'
import { FiEdit } from 'react-icons/fi'

type ShowEditableComponent = {
  children: React.ReactNode
  onEdit: Function
}

function ShowEditableComponent({ children, onEdit }: ShowEditableComponent) {
  return (
    <>
      {children}
      <FiEdit
        className="cursor-pointer text-md text-primary hover:shadow-sm min-w-[2rem]"
        data-for="tooltip-edit"
        data-tip
        onClick={() => onEdit()}
      />
      <ReactTooltip id="tooltip-edit" type="light" place="right" border={true} borderColor="text-grey-200">
        Edit
      </ReactTooltip>
    </>
  )
}

export const ShowEditable = ShowEditableComponent
