import React, { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsChevronUp } from 'react-icons/bs'
import { AiOutlineCheckCircle, AiFillStar } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { GrShare } from 'react-icons/gr'
import numeral from 'numeral'
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
  const router = useRouter()
  const { search_query } = router
    ? (router.query as { search_query: string })
    : ('' as unknown as { search_query: string })

  const rating = useMemo(() => {
    let _rating = service.avg_rating
    if (typeof _rating === 'string') {
      _rating = Number.parseFloat(_rating)
    }
    return _rating?.toFixed(1)
  }, [service.avg_rating])

  return (
    <div className="flex flex-col pt-4 space-y-3 md:flex-row md:space-x-8 md:space-y-0 service-detail-card">
      <div className="flex items-start justify-start w-full space-x-4 md:space-x-8">
        <div className="flex flex-col items-center justify-start space-y-3">
          <Link href={`/services/${service.slug}/`}>
            <img
              src={service.logo_url}
              alt="Web Service"
              className="object-contain h-[72px] w-[72px] rounded-md cursor-pointer"
            />
          </Link>
          <div className="flex items-center space-x-2">
            <Checkbox onChange={onCompare} />
            <div className="text-xs uppercase text-text-tertiary">Compare</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-start space-x-2">
            <Link href={`/services/${service.slug}/`}>
              <h1 className="text-base font-medium cursor-pointer text-text-primary">{service.name}</h1>
            </Link>
            <a
              href={service.website ?? '#'}
              target={service.website ? '_blank' : ''}
              className="self-center"
              rel="noreferrer"
            >
              <Button
                className="hidden md:inline-flex"
                size="small"
                icon={<GrShare className="gr-primary gr-icon-share" />}
              >
                Visit Website
              </Button>
            </a>
            <Link href={`/services/${service.slug}/`}>
              <div className="flex-1 cursor-pointer" />
            </Link>
          </div>
          <div className="flex-1">
            {service.short_description ? <TruncatedDescription description={service.short_description} /> : null}
            <Link href={`/services/${service.slug}/`}>
              <div className="flex-1 cursor-pointer" />
            </Link>
          </div>
          <div className="flex flex-row flex-wrap mb-5">
            {service.tags.map((tag) => {
              return (
                <Button
                  key={tag.slug}
                  buttonType="tag"
                  size="small"
                  className="mt-2 mr-2"
                  onClick={() => {
                    if (search_query.indexOf(tag.slug) === -1) {
                      router.push(`${search_query},${tag.slug}`)
                    } else {
                      router.push(`/search/${tag.slug}`)
                    }
                  }}
                >
                  {tag.name}
                </Button>
              )
            })}
            <Link href={`/services/${service.slug}/`}>
              <div className="flex-1 cursor-pointer" />
            </Link>
          </div>
          <Link href={`/services/${service.slug}/`}>
            <div className="flex items-center space-x-6 text-sm cursor-pointer">
              <div className="flex items-center space-x-2">
                <BsChevronUp className="text-primary" />
                <p className="text-text-secondary">{numeral(service.upvotes_count).format('0.[0]a')}</p>
              </div>
              <div className="flex items-center space-x-2">
                <FiUsers className="text-primary" />
                <p className="text-text-secondary">{numeral(service.users_count).format('0.[0]a')} Users</p>
              </div>
              {service.has_free_trial === true && (
                <>
                  <div>|</div>
                  <div className="flex items-center space-x-2">
                    <AiOutlineCheckCircle className="text-primary" />
                    <p className="text-text-secondary">Free Trial</p>
                  </div>
                </>
              )}
            </div>
          </Link>
        </div>
      </div>
      <Link href={`/services/${service.slug}/`}>
        <div className="flex flex-row items-center justify-center space-x-4 cursor-pointer md:flex-col md:space-x-0 md:space-y-2">
          <div className="flex items-center space-x-2 md:hidden">
            <AiFillStar className="text-primary" />
            <span className="mr-1 text-2xl font-bold">{rating}</span>
            <span>/ 10</span>
          </div>
          <div className="items-center hidden space-x-2 md:flex md:flex-row">
            <AiFillStar className="text-primary" />
            <div className="flex mr-1 text-2xl font-bold">{rating}</div>
            <div className="text-text-secondary">/10</div>
          </div>
          <div className="flex items-center justify-center text-sm text-text-secondary">
            {service.reviews_count} Reviews
          </div>
        </div>
      </Link>
    </div>
  )
}

export const ServiceCard = ServiceCardComponent
