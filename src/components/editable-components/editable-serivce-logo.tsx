import React, { useState, useRef } from 'react'
import { FiEdit } from 'react-icons/fi'
import ReactTooltip from 'react-tooltip'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { ServiceLogo } from '../service-logo'
import { uploadFileToCloudinary } from '../../utils/file'
import { Spinner } from '../spinner'

type EditableServiceLogoComponentProps = {
  serviceName: string
  serviceId: number
  logoUrl: string
  owned: boolean
  onSubmit: Function
}

function EditableServiceLogoComponent({
  serviceName,
  serviceId,
  logoUrl,
  owned,
  onSubmit,
}: EditableServiceLogoComponentProps) {
  const imageFileInput = useRef(null)
  const [showLogoUrl, setShowLogoUrl] = useState(logoUrl)
  const [isChangeLogo, setIsChangeLogo] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const fileOpen = () => {
    imageFileInput.current.click()
  }

  const onFileChange = async (e) => {
    setIsUploading(true)
    const file = e.target.files[0]
    if (file) {
      const isImage = file.type.split('/')[0] === 'image'

      if (isImage) {
        const url = await uploadFileToCloudinary(e.target.files[0])
        imageFileInput.current.value = ''
        setShowLogoUrl(url)
        setIsChangeLogo(true)
      }
    }
    setIsUploading(false)
  }
  const onCancel = () => {
    setShowLogoUrl(logoUrl)
    setIsChangeLogo(false)
  }
  const onConfirme = () => {
    setIsChangeLogo(false)
    onSubmit('logo_url', showLogoUrl)
  }

  return (
    <>
      <ServiceLogo serviceName={serviceName} serviceId={serviceId} logoUrl={showLogoUrl} owned={owned ?? false} />
      <input type="file" className="hidden" ref={imageFileInput} onChange={(event) => onFileChange(event)} />
      {isChangeLogo ? (
        <div className="opacity-100 bg-opacity-70 bg-background-default flex absolute justify-center items-center top-[0px] left-0 w-[72px] h-[72px]">
          <AiOutlineCheck
            className="absolute top-[0.3rem] right-[1.5rem] text-success text-md cursor-pointer"
            onClick={() => onConfirme()}
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
      ) : (
        <>
          {isUploading ? (
            <div className="opacity-100 bg-opacity-70 bg-background-default flex absolute justify-center items-center top-[0px] left-0 w-[72px] h-[72px]">
              <Spinner />
            </div>
          ) : (
            <div className="opacity-0 bg-opacity-0 hover:opacity-100 hover:bg-opacity-70 bg-background-default flex absolute justify-center items-center top-[0px] left-0 w-[72px] h-[72px]">
              <FiEdit
                className="cursor-pointer text-md text-primary hover:shadow-sm"
                data-for="tooltip-edit"
                onClick={() => fileOpen()}
                data-tip
              />
              <ReactTooltip id="tooltip-edit" type="light" place="right" border={true} borderColor="text-grey-200">
                Edit
              </ReactTooltip>
            </div>
          )}
        </>
      )}
    </>
  )
}

export const EditableServiceLogo = EditableServiceLogoComponent
