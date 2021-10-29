import React from 'react'
import ReactTooltip from 'react-tooltip'
import { FiEdit } from 'react-icons/fi'

function ShowEditableComponent({ children, handleEdit }) {
  return (
    <>
      {children}
      <FiEdit
        className="cursor-pointer text-md text-primary hover:shadow-sm min-w-[2rem]"
        data-for="tooltip-edit"
        data-tip
        onClick={() => handleEdit()}
      />
      <ReactTooltip id="tooltip-edit" type="light" place="right" border={true} borderColor="text-grey-200">
        Edit
      </ReactTooltip>
    </>
  )
}

export const ShowEditable = ShowEditableComponent
