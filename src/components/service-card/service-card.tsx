import React, { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsChevronUp } from 'react-icons/bs'
import { AiOutlineCheckCircle, AiFillStar } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { GrShare } from 'react-icons/gr'
import numeral from 'numeral'
import { Asset } from '@taggedweb/types/asset'
import { TruncatedDescription } from '../truncated-description'
import { Button } from '../button'
import { Checkbox } from '../checkbox'
import { ServiceLogo } from '../service-logo'

type ServiceCardProps = {
  service: Asset
  onToggleCompare?: (bool: any, service: Asset) => void
  isChecked?: boolean
}

function ServiceCardComponent({ service, onToggleCompare, isChecked }: ServiceCardProps) {
  const onCompare = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onToggleCompare) {
      onToggleCompare((event.target as HTMLInputElement).checked, service)
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
          <Link href={`/software/${service.slug}/`}>
            <a>
              <ServiceLogo
                serviceName={service?.name}
                serviceId={service.id}
                logoUrl={service.logo_url}
                owned={service?.is_owned ?? false}
              />
            </a>
          </Link>
          <div className="flex items-center space-x-2">
            <Checkbox onChange={onCompare} checked={isChecked} />
            <div className="text-xs uppercase text-text-tertiary">Compare</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-start space-x-2">
            <Link href={`/software/${service.slug}/`}>
              <a>
                <h1 className="text-base font-medium cursor-pointer text-text-primary">{service.name}</h1>
              </a>
            </Link>
            <a
              href={service.affiliate_link ? service.affiliate_link : service.website ?? '#'}
              target={service.affiliate_link || service.website ? '_blank' : ''}
              className="self-center"
              rel="noreferrer nofollow"
            >
              <GrShare className="md:hidden sm:inline-flex gr-primary gr-icon-share" />
              <Button
                className="hidden md:inline-flex"
                size="small"
                icon={<GrShare className="gr-primary gr-icon-share" />}
              >
                Visit Website
              </Button>
            </a>
            <Link href={`/software/${service.slug}/`}>
              <a>
                <div className="flex-1 cursor-pointer" />
              </a>
            </Link>
          </div>
          <div className="flex-1">
            {service.short_description ? (
              <TruncatedDescription description={service.short_description} />
            ) : service.description ? (
              <TruncatedDescription description={service.description.substring(0, 200)} />
            ) : null}
            <Link href={`/software/${service.slug}/`}>
              <a>
                <div className="flex-1 cursor-pointer" />
              </a>
            </Link>
          </div>
          <div className="flex flex-row flex-wrap mb-5">
            {service.tags.map((tag, index) => {
              return (
                <Link
                  key={tag.slug}
                  href={
                    search_query.indexOf(tag.slug) === -1
                      ? `/softwares/${search_query},${tag.slug}`
                      : `/softwares/${tag.slug}`
                  }
                  passHref
                  key={index}
                >
                  <Button key={tag.slug} buttonType="tag" size="small" className="mt-2 mr-2">
                    {tag.name}
                  </Button>
                </Link>
              )
            })}
            <Link href={`/software/${service.slug}/`}>
              <a>
                <div className="flex-1 cursor-pointer" />
              </a>
            </Link>
          </div>
          <Link href={`/software/${service.slug}/`}>
            <a>
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
            </a>
          </Link>
        </div>
      </div>
      <Link href={`/software/${service.slug}/`}>
        <a>
          <div className="flex flex-row items-center justify-center space-x-4 cursor-pointer md:pr-2 md:flex-col md:space-x-0 md:space-y-2">
            <div className="flex items-center space-x-2 md:hidden">
              <AiFillStar className="text-primary" />
              <span className="mr-1 text-2xl font-bold">{rating}</span>
              <div className="text-text-secondary">/10</div>
            </div>
            <div className="items-center hidden space-x-2 md:justify-center md:flex md:flex-row">
              <AiFillStar className="text-primary" />
              <div className="flex mr-1 text-2xl font-bold">{rating}</div>
              <div className="text-text-secondary">/10</div>
            </div>
            <div className="flex items-center justify-center text-sm text-text-secondary">
              {service.reviews_count} Reviews
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export const ServiceCard = ServiceCardComponent
