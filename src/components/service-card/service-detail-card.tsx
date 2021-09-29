import React, { useMemo } from 'react'
import { BsChevronUp } from 'react-icons/bs'
import { AiOutlineInfoCircle, AiOutlineStar } from 'react-icons/ai'
import { GrShare } from 'react-icons/gr'
import { TruncatedDescription } from '../truncated-description'
import { Button } from '../button'
import { Asset } from '../../types/asset'
import numeral from 'numeral'

type ServiceDetailCardProps = {
  service: Asset
}

function ServiceDetailCardComponent({ service }: ServiceDetailCardProps) {
  if (typeof service === 'undefined') return null

  const rating = useMemo(() => {
    let _rating = service.avg_rating
    if (typeof _rating === 'string') {
      _rating = Number.parseFloat(_rating)
    }
    return numeral(_rating ?? 0).format('0.[0]')
  }, [service.avg_rating])

  return (
    <div className="flex flex-col space-y-3 md:flex-row pt-4 md:space-x-8 md:space-y-0 service-detail-card">
      <div className="flex items-start justify-start w-full space-x-4 md:space-x-8">
        <div className="flex flex-col items-center justify-start space-y-3">
          <img src={service.logo_url} alt="Web Service" className="object-contain h-[72px] w-[72px] rounded-md" />
        </div>
        <div className="flex-1">
          <div className="flex justify-start space-x-2">
            <h1 className="text-base font-medium text-text-primary">{service.name}</h1>
            <a href={service.website ?? '#'} target={service.website ? '_blank': ''} className="self-center">
              <Button
                className="hidden md:inline-flex"
                size="small"
                icon={<GrShare className="gr-primary gr-icon-share"/>}
              >
                Visit Website
              </Button>
            </a>
            <div className="hidden md:flex md:items-center md:cursor-pointer md:space-x-2">
              <AiOutlineInfoCircle className="text-primary" />
              <span className="text-primary text-xs">Own this Service?</span>
            </div>
          </div>
          {service.short_description ? <TruncatedDescription description={service.short_description} /> : null}
          <div className="flex space-x-2 text-sm mt-2 sm:space-x-4 md:divide-x">
            <div className="flex items-end space-x-2">
              <AiOutlineStar className="text-primary self-center" />
              <span>{rating}</span>
              <span className="text-text-secondary text-xs">
                {numeral(service.reviews_count).format('0.[0]a')} Reviews
              </span>
            </div>
            <div className="flex items-end space-x-2 md:pl-4">
              <BsChevronUp className="text-primary self-center" />
              <span>{service.upvotes_count}</span>
              <span className="text-text-secondary text-xs">{numeral(service.users_count).format('0.[0]a')} Users</span>
            </div>
          </div>
          <div className="flex flex-row flex-wrap mb-5">
            {service.tags.map((tag) => {
              return (
                <Button key={tag.slug} buttonType="tag" size="small" className="mr-2 mt-2">
                  {tag.name}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 md:flex-col md:justify-start md:items-center md:space-x-0 md:space-y-4">
        <a href={service.website ?? '#'} target={service.website ? '_blank': ''} className="self-center">
          <Button
            className="inline-flex w-40 md:hidden"
            size="small"
            icon={<GrShare className="gr-primary gr-icon-share"/>}
          >
            Visit Website
          </Button>
        </a>
        <div className="flex justify-center items-center cursor-pointer space-x-2 w-40 md:hidden">
          <AiOutlineInfoCircle className="text-primary" />
          <span className="text-primary text-xs">Own this Service?</span>
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-4 md:flex-col md:justify-start md:items-center md:space-x-0 md:space-y-4">
        <Button className="w-40 inline-flex md:hidden">
          I've used this
        </Button>
        <Button className="w-40 space-x-2" buttonType="primary" icon={<BsChevronUp className="text-white self-center" />}>
          {`Upvote ${service.upvotes_count}`}
        </Button>
        <Button className="w-40 hidden md:inline-flex">
          I've used this
        </Button>
      </div>
    </div>
  )
}

export const ServiceDetailCard = ServiceDetailCardComponent
