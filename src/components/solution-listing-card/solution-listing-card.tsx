import React from 'react'
import Link from 'next/link'
import { IoIosArrowUp } from 'react-icons/io'
import { BiDollar } from 'react-icons/bi'
import clsx from 'clsx'
import { AiFillStar } from 'react-icons/ai'
import numeral from 'numeral'
import { useRouter } from 'next/router'
import { Button } from '../button'
import { ServiceLogo } from '../service-logo'

type SolutionListingCardProps = {
  listingData: {
    slug: string
    pay_now_price_stripe_id: string
    pay_now_price_unit_amount: string | number
    assets: any[]
    tags: { name: string; slug: string }[]
    title: string
    upvotes_count: number
    avg_rating?: string | number
    organization: { name: string; logo_url: string | null }
  }
  className?: string
}

export function SolutionListingCardComponent({ listingData, className = '' }: SolutionListingCardProps) {
  const router = useRouter()
  const unitlist = ['', 'K', 'M', 'G']
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

  return (
    <div
      className={clsx(
        'flex flex-col p-4 m-2 border border-solid rounded border-border-default cursor-pointer',
        className,
      )}
      onClick={() => router.push(`/solution/${listingData.slug}`)}
    >
      <div className="flex flex-row">
        <div className="flex flex-col flex-grow">
          <div className="flex flex-row flex-wrap">
            {listingData.tags.map((tag) => {
              return (
                <Link key={tag.slug} prefetch={false} href={'../solutions/' + tag.slug}>
                  <a className="inline-flex mt-2 mr-2">
                    <Button buttonType="tag" size="small" className="mr-1">
                      {tag.name}
                    </Button>
                  </a>
                </Link>
              )
            })}
          </div>
          <h2 className="mt-2 text-xl">{listingData.title}</h2>
          <div className="flex items-center pt-4 space-x-4 md:hidden">
            <div className="flex items-center space-x-1 text-xs">
              <AiFillStar className="self-center text-primary" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <IoIosArrowUp className="text-primary" />
              <span className="text-xs ">{kFormater(listingData.upvotes_count)}</span>
            </div>
          </div>
        </div>
        <div className="items-center self-start flex-none hidden mt-4 mr-2 space-x-0 text-xs md:inline-flex w-[6rem] justify-end">
          <BiDollar className="text-xl font-bold text-text-primary" />
          <h4 className="text-xl font-bold text-text-primary">
            {listingData.pay_now_price_unit_amount ? Number(listingData.pay_now_price_unit_amount) / 100 : 0}
          </h4>
        </div>
      </div>
      <div className="flex flex-col-reverse pt-4 md:items-center md:flex-row md:justify-between">
        <div className="flex items-center pt-4 md:pt-0">
          {listingData.organization?.logo_url ? (
            <img
              className="w-[40px] h-[40px] rounded-full"
              src={listingData.organization.logo_url}
              alt={listingData.organization.name}
            />
          ) : (
            <div className="w-[40px] h-[40px] bg-text-secondary rounded-full" />
          )}
          <span className="pl-2 text-sm text-text-secondary">{listingData.organization?.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="hidden md:pr-4 md:text-xs md:items-center md:space-x-1 md:inline-flex">
            <AiFillStar className="self-center text-primary" />
            <span>{rating}</span>
          </div>
          <div className="hidden md:pr-4 md:text-xs md:items-center md:space-x-1 md:inline-flex">
            <IoIosArrowUp className="text-primary" />
            <span className="text-xs">{kFormater(listingData.upvotes_count)}</span>
          </div>
          <div className="flex items-center space-x-0 text-xs md:self-start md:mt-4 md:hidden">
            <BiDollar className="text-xl font-bold text-text-primary" />
            <h4 className="text-xl font-bold text-text-primary">
              {listingData.pay_now_price_unit_amount ? Number(listingData.pay_now_price_unit_amount) / 100 : 0}
            </h4>
          </div>
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
        </div>
      </div>
    </div>
  )
}

export const SolutionListingCard = SolutionListingCardComponent
