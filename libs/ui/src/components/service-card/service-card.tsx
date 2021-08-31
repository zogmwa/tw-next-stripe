import React, { useMemo } from 'react'
import { BsChevronUp } from 'react-icons/bs'
import { AiFillStar, AiOutlineCheckCircle } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { TruncatedDescription } from '../tuncated-description'
import { Button } from '../button'
import { Asset } from '../../types/asset'
import { MAX_DESCRIPTION_LENGTH } from '../../utils/constants'
// import { string } from 'yup/lib/locale'

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

  const description = useMemo(() => {
    const _description = service.short_description || service.description
    if (_description.length > MAX_DESCRIPTION_LENGTH) {
      return <TruncatedDescription description={_description} />
    }
    return _description
  }, [service.description, service.short_description])

  const rating = useMemo(() => {
    let _rating = service.avg_rating
    if (typeof _rating === 'string') {
      _rating = Number.parseFloat(_rating)
    }
    return _rating?.toFixed(1)
  }, [service.avg_rating])

  return (
    <div className="flex flex-col w-full px-4 py-4 space-y-3 md:flex-row md:space-x-8 md:space-y-0">
      <div className="flex items-start justify-start space-x-4">
        <div className="flex flex-col items-center justify-start w-20 space-y-2 md:w-28">
          <img src={service.logo_url} alt="Web Service" className="object-contain w-full max-w-2xl rounded-md" />
          <div className="flex items-center space-x-2">
            <input type="checkbox" id={service.id.toString()} onChange={onCompare} />
            <p>Compare</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-left md:hidden">
          <h1 className="text-xl font-bold">{service.name}</h1>
          <div className="text-base text-gray-600 dark:text-gray-200">{description}</div>
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-left">
        <div className="flex-col hidden md:flex justify-left">
          <h1 className="text-xl md:font-bold">{service.name}</h1>
          <div className="text-gray-600 md:text-base">{description}</div>
        </div>
        <div className="flex flex-row flex-wrap mb-3">
          {service.tags.map((tag) => {
            return (
              <Button key={tag.slug} buttonType="tag" className="mt-2 mr-2">
                {tag.name}
              </Button>
            )
          })}
        </div>
        <div className="flex items-center justify-between md:justify-start md:space-x-6">
          <div className="items-center hidden space-x-1 md:flex">
            <BsChevronUp className="text-primary" />
            <p className="text-gray-500">{service.upvotes_count}</p>
          </div>
          <div className="flex items-center space-x-1">
            <FiUsers className="text-primary" />
            <p className="pl-0.5 text-gray-500">{service.users_count} Users</p>
          </div>
          {service.has_free_trial === 'true' && (
            <div className="flex items-center space-x-1">
              <AiOutlineCheckCircle className="text-primary" />
              <p className="pl-0.5 text-gray-500">Free Trial</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-start justify-between md:flex-col md:space-y-2 md:items-center md:justify-center">
        <div className="flex items-center space-x-2">
          <AiFillStar className="text-primary" />
          <p className="pl-0.5">
            <span className="text-xl font-bold">{rating}</span> /10
          </p>
        </div>
        <p className="text-gray-500">{service.reviews_count} Reviews</p>
      </div>
    </div>
  )
}

export const ServiceCard = ServiceCardComponent
