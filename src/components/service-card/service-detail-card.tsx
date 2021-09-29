import React, { useMemo } from 'react'
import { BsChevronUp } from 'react-icons/bs'
import { AiOutlineInfoCircle, AiOutlineStar } from 'react-icons/ai'
import { TruncatedDescription } from '../truncated-description'
import { Button } from '../button'
import { Asset } from '../../types/asset'

type ServiceDetailCardProps = {
  service: Asset
}

function ServiceDetailCardComponent({ service }: ServiceDetailCardProps) {
  const rating = useMemo(() => {
    let _rating = service.avg_rating
    if (typeof _rating === 'string') {
      _rating = Number.parseFloat(_rating)
    }
    return _rating?.toFixed(1)
  }, [service.avg_rating])

  return (
    <div className="flex flex-col space-y-3 md:flex-row pt-4 md:px-4 md:py-4 md:space-x-8 md:space-y-0">
      <div className="flex items-start justify-start w-full space-x-4 md:space-x-8">
        <div className="flex flex-col items-center justify-start space-y-3">
          <img src={service.logo_url} alt="Web Service" className="object-contain h-[72px] w-[72px] rounded-md" />
        </div>
        <div className="flex-1">
          <h1 className="text-base font-medium text-text-primary">{service.name}</h1>
          <TruncatedDescription description={service.description} />
          <div className="flex space-x-2 text-sm mt-2 sm:space-x-4">
            <div className="flex items-end space-x-2">
              <AiOutlineStar className="text-primary self-center" />
              <span>{rating}</span>
              <span className="text-text-secondary text-xs">
                {service.reviews_count} Reviews
              </span>
            </div>
            <div className="flex items-end space-x-2">
              <BsChevronUp className="text-primary self-center" />
              <span className="">{service.upvotes_count}</span>
              <span className="text-text-secondary text-xs">{service.users_count} Users</span>
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
      <div className="flex flex-row justify-center space-x-4 md:flex-col md:justify-start md:items-center md:space-x-0 md:space-y-4">
        <Button className="w-40 space-x-2" icon={<AiOutlineInfoCircle className="text-primary" />}>
          Claim this page
        </Button>
        <Button className="w-40" buttonType="primary">
          I have used this
        </Button>
      </div>
    </div>
  )
}

export const ServiceDetailCard = ServiceDetailCardComponent
