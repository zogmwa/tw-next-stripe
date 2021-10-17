import React, { useState } from 'react'
import { MdVerified } from 'react-icons/md'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

const Image = styled.img`
   {
    content: attr(alt);
    display: block;
    font-size: 16px;
    font-style: normal;
    font-family: FontAwesome;
    color: rgb(100, 100, 100);

    position: absolute;
    top: 5px;
    left: 0;
    width: inherit;
    word-wrap: normal;
    text-align: center;
  }
`
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
  const [imgSrc, setImgSrc] = useState<string | undefined>(logoUrl)
  return (
    <div className={`relative h-[72px] w-[72px] inline-block ${className}`}>
      {imgSrc ? (
        <Image
          src={imgSrc}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = imgSrc
            setImgSrc('')
          }}
          alt={`${serviceName}`}
          className={`object-contain rounded-md ${imageClassName}`}
        />
      ) : (
        <Image
          src="/public/images/default_logo.png"
          alt={`${serviceName}`}
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
