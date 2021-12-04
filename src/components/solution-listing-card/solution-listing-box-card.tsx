import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoIosArrowUp } from 'react-icons/io'
import { BiDollar } from 'react-icons/bi'
import clsx from 'clsx'
import { AiFillStar } from 'react-icons/ai'
import numeral from 'numeral'
import { FaChevronRight } from 'react-icons/fa'
import { Button } from '../button'
import { ServiceLogo } from '../service-logo'

type SolutionListingCardProps = {
  listingData: {
    assets: any[]
    tags: { name: string; slug: string }[]
    title: string
    prices: { stripe_price_id: number | string; price: number | string; is_primary: boolean }[]
    upvotes_count: number
    avg_rating?: string | number
    organization?: { name: string; logo_url: string | null }
  }
  className?: string
}

export function SolutionListingBoxCardComponent({ listingData, className = '' }: SolutionListingCardProps) {
  const unitlist = ['', 'K', 'M', 'G']
  const router = useRouter()
  const rating = numeral(Number(listingData.avg_rating ?? 0)).format('0.[0]')
  function kFormater(number) {
    const sign = Math.sign(number)
    let unit = 0
    while (Math.abs(number) > 999) {
      unit = unit + 1
      number = Math.floor(Math.abs(number) / 100) / 10
    }
    return sign * number + unitlist[unit]
  }

  let primaryPrice = listingData.prices.filter((price) => price.is_primary === true)[0]
  if (!primaryPrice) primaryPrice = listingData.prices[0]

  return (
    <div className={clsx('flex flex-col p-4 mt-2 mr-2 border border-solid rounded border-border-default', className)}>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex self-start space-x-2">
            {listingData.assets.slice(0, 3).map((asset, key) => (
              <div key={`mobileServiceLogo${key}`} onClick={() => router.push(`/software/${asset.slug}`)}>
                <ServiceLogo
                  serviceName={asset?.name}
                  serviceId={asset.id}
                  logoUrl={asset.logo_url}
                  className="!w-[2rem] !h-[2rem] p-1 border border-solid rounded-md border-border-default cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center py-2">
            <BiDollar className="text-xl font-bold text-text-primary" />
            <h4 className="text-xl font-bold text-text-primary">{primaryPrice?.price ?? 0}</h4>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap mb-5">
            {listingData.tags.map((tag) => {
              return (
                <Link key={tag.slug} prefetch={false} href={'../solutions/' + tag.slug}>
                  <a className="inline-flex mt-2 mr-2">
                    <Button buttonType="tag" size="small" className="mt-2 mr-1">
                      {tag.name}
                    </Button>
                  </a>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <div>
        <h2 className="mt-2 text-sm text-left text-gray-600">{listingData.title}</h2>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center space-x-1 text-xs">
          <AiFillStar className="self-center text-primary" />
          <span>{rating}</span>
        </div>
        <div className="flex items-center space-x-1 text-xs">
          <IoIosArrowUp className="text-primary" />
          <span className="text-xs ">{kFormater(listingData.upvotes_count)}</span>
        </div>
        <Button
          className="py-2 border-none rounded-md min-w-[5rem] !flex space-x-0.5 bg-primary"
          icon={<FaChevronRight size={10} />}
          buttonType="primary"
          iconPlacement="right"
          textClassName="text-white text-xs"
        >
          View Details
        </Button>
      </div>
    </div>
  )
}

export const SolutionListingBoxCard = SolutionListingBoxCardComponent
