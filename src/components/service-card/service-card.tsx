import React, { useMemo } from 'react'
import { BsChevronUp } from 'react-icons/bs'
import { AiFillStar, AiOutlineCheckCircle } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { TruncatedDescription } from '../truncated-description'
import { Button } from '../button'
import { Asset } from '../../types/asset'
import { Checkbox } from '../checkbox'

type ServiceCardProps = {
  service: Asset
  onToggleCompare?: (bool: any) => void
}

function ServiceCardComponent({ service, onToggleCompare }: ServiceCardProps) {
  const onCompare = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onToggleCompare) {
      onToggleCompare((event.target as HTMLInputElement).checked)
    }
  }

  const rating = useMemo(() => {
    let _rating = service.avg_rating
    if (typeof _rating === 'string') {
      _rating = Number.parseFloat(_rating)
    }
    return _rating?.toFixed(1)
  }, [service.avg_rating])

  return (
    <div className="flex flex-col px-4 py-4 space-y-3 md:flex-row md:space-x-8 md:space-y-0">
      <div className="flex items-start justify-start w-full space-x-8">
        <div className="flex flex-col items-center justify-start space-y-3">
          <img src={service.logo_url} alt="Web Service" className="object-contain h-[72px] w-[72px] rounded-md" />
          <div className="flex items-center space-x-2">
            <Checkbox onChange={onCompare} />
            <div className="text-xs text-text-tertiary uppercase">Compare</div>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-base font-medium text-text-primary">{service.name}</h1>
          <TruncatedDescription description={service.description} className="mb-2" />
          <div className="flex flex-row flex-wrap mb-5 space-x-2">
            {service.tags.map((tag) => {
              return (
                <Button key={tag.slug} buttonType="tag" size="small">
                  {tag.name}
                </Button>
              )
            })}
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <BsChevronUp className="text-primary" />
              <p className="text-text-secondary">{service.upvotes_count}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FiUsers className="text-primary" />
              <p className="text-text-secondary">{service.users_count} Users</p>
            </div>
            {service.has_free_trial === true && (
              <div className="flex items-center space-x-2">
                <AiOutlineCheckCircle className="text-primary" />
                <p className="text-text-secondary">Free Trial</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-start justify-between md:flex-col md:space-y-2 md:items-center md:justify-center">
          <div className="flex items-center space-x-2">
            <AiFillStar className="text-primary" />
            <span className="mr-1 text-2xl font-bold">{rating}</span>
            <span>/ 10</span>
          </div>
          <p className="text-sm text-text-secondary">{service.reviews_count} Reviews</p>
        </div>
      </div>
    </div>
  )
}

export const ServiceCard = ServiceCardComponent
