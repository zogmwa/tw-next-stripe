import React from 'react'
import { MdVerified } from 'react-icons/md'
import ReactTooltip from 'react-tooltip'
import Image from 'next/image'

type ServiceLogo = {
  serviceId: number
  serviceName?: string
  logoUrl: string | null
  owned?: boolean | null
  className?: string
  imageClassName?: string
  fontClassName?: string
}

function ServiceLogoComponent({
  serviceId,
  serviceName = '',
  logoUrl,
  owned,
  className = '',
  imageClassName = '',
  fontClassName = 'text-success',
}) {
  return (
    <div className={`relative h-[72px] w-[72px] inline-block ${className}`}>
      {logoUrl ? (
        <img src={logoUrl} alt={`Logo for ${serviceName}`} className={`object-contain rounded-md ${imageClassName}`} />
      ) : (
        <Image
          src="/images/default_logo.png"
          alt="Service Logo"
          className={`object-contain rounded-md ${imageClassName}`}
          width="72"
          height="72"
        />
      )}
      {owned !== null && owned ? (
        <>
          <div className="absolute right-[3px] bottom-[3px] cursor-pointer" data-for={`tooltip${serviceId}`} data-tip>
            <MdVerified className={`text-xl ${fontClassName}`} />
          </div>
          <ReactTooltip id={`tooltip${serviceId}`} type="light" place="right" border={true} borderColor="text-grey-200">
            Verified Owner
          </ReactTooltip>
        </>
      ) : null}
    </div>
  )
}

export const ServiceLogo = ServiceLogoComponent
