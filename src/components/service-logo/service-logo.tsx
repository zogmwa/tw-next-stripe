import React, { useState, useEffect } from 'react'
import { MdVerified } from 'react-icons/md'
import ReactTooltip from 'react-tooltip'

const ImageStyle: any = {
  display: 'block',
  fontSize: '16px',
  fontStyle: 'normal',
  fontFamily: 'FontAwesome',
  color: 'rgb(100, 100, 100)',
  position: 'absolute',
  top: '0',
  left: '0',
  width: 'inherit',
  wordWrap: 'normal',
  textAlign: 'center',
}

type ServiceLogoProps = {
  serviceId?: number
  serviceSlug?: string
  serviceName?: string
  logoUrl: string | null
  owned?: boolean | null
  className?: string
  imageClassName?: string
  fontClassName?: string
}

function ServiceLogoComponent({
  serviceId = 0,
  serviceSlug = '',
  serviceName = '',
  logoUrl,
  owned,
  className = '',
  imageClassName = '',
  fontClassName = 'text-success',
}: ServiceLogoProps) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(logoUrl)

  useEffect(() => {
    setImgSrc(logoUrl)
  }, [logoUrl])

  return (
    <div className={`relative h-[72px] w-[72px] inline-block ${className}`}>
      {imgSrc ? (
        <img
          style={ImageStyle}
          src={imgSrc}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = imgSrc
            setImgSrc('')
          }}
          alt={`${serviceName}`}
          className={`object-contain rounded-md ${imageClassName} logo-img`}
        />
      ) : (
        <img
          style={ImageStyle}
          src="/public/images/default_logo.png"
          alt={`${serviceName}`}
          className={`object-contain rounded-md ${imageClassName} logo-img`}
          width="72"
          height="72"
        />
      )}
      {owned !== null && owned ? (
        <>
          <div
            className="absolute right-[3px] bottom-[3px] cursor-pointer"
            data-for={`tooltip${serviceSlug}${serviceId}`}
            data-tip
          >
            <MdVerified className={`text-xl ${fontClassName}`} />
          </div>
          <ReactTooltip
            id={`tooltip${serviceSlug}${serviceId}`}
            type="light"
            place="right"
            border={true}
            borderColor="text-grey-200"
          >
            Verified Owner
          </ReactTooltip>
        </>
      ) : null}
    </div>
  )
}

export const ServiceLogo = ServiceLogoComponent
