import React from 'react'
import { MdVerified } from 'react-icons/md'
import Tooltip from '@mui/material/Tooltip'

type ServiceLogo = {
  logoUrl: string | null
  owned?: boolean | null
  className?: string
  imageClassName?: string
  fontClassName?: string
}

function ServiceLogoComponent({
  logoUrl,
  owned = false,
  className = '',
  imageClassName = '',
  fontClassName = 'text-success',
}) {
  return (
    <div className={`relative h-[72px] w-[72px] inline-block ${className}`}>
      <img src={logoUrl} alt="Web Service" className={`object-contain rounded-md ${imageClassName}`} />
      {owned !== null && owned ? (
        <Tooltip title={'Verified'}>
          <MdVerified className={`absolute right-[3px] bottom-[3px] text-xl ${fontClassName}`} />
        </Tooltip>
      ) : null}
    </div>
  )
}

export const ServiceLogo = ServiceLogoComponent
