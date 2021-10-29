import React from 'react'
import { FiEdit } from 'react-icons/fi'
import ReactTooltip from 'react-tooltip'
import { ServiceLogo } from '../service-logo'

function EditableServiceLogoComponent({ serviceName, serviceId, logoUrl, owned }) {
  return (
    <>
      <ServiceLogo serviceName={serviceName} serviceId={serviceId} logoUrl={logoUrl} owned={owned ?? false} />
      <div className="opacity-0 bg-opacity-0 hover:opacity-100 hover:bg-opacity-70 bg-background-default flex absolute justify-center items-center top-[5px] left-0 w-[72px] h-[72px]">
        <FiEdit className="cursor-pointer text-md text-primary hover:shadow-sm" data-for="tooltip-edit" data-tip />
        <ReactTooltip id="tooltip-edit" type="light" place="right" border={true} borderColor="text-grey-200">
          Edit
        </ReactTooltip>
      </div>
    </>
  )
}

export const EditableServiceLogo = EditableServiceLogoComponent
