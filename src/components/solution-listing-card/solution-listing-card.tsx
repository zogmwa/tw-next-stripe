import React from 'react'
import Link from '@taggedweb/components/Link'
import { IoIosArrowUp } from 'react-icons/io'
import { BiDollar } from 'react-icons/bi'
import clsx from 'clsx'
import { Solution, SolutionTypes } from '@taggedweb/types/solution'
import { Button } from '../button'
import { ServiceLogo } from '../service-logo'

type SolutionListingCardProps = {
  listingData: Solution
  className?: string
}
const SolutionTypesMap = new Map<string, string>()
const solutionTypeKeys = Object.keys(SolutionTypes)
// eslint-disable-next-line prefer-const
for (let type in solutionTypeKeys) {
  SolutionTypesMap.set(solutionTypeKeys[type], SolutionTypes[solutionTypeKeys[type]])
}

export function SolutionListingCardComponent({ listingData, className = '' }: SolutionListingCardProps) {
  const unitlist = ['', 'K', 'M', 'G']

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
    <Link href={`/solution/${listingData.slug}`} passHref>
      <div
        className={clsx(
          'flex flex-col p-4 m-2 border border-solid rounded border-border-default cursor-pointer',
          className,
        )}
      >
        <div className="flex flex-row">
          <div className="flex flex-col flex-grow">
            <div
              className="flex flex-row flex-wrap"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
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
            <h2 className="mt-2 text-xl text-gray-900">{listingData.title}</h2>
            <div className="flex items-center pt-4 space-x-4 md:hidden">
              <div className="flex items-center space-x-1 text-xs">
                <Button buttonType="tag" size="small" className="mr-1">
                  {SolutionTypesMap.get(listingData.type)}
                </Button>
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
            {listingData.organization ? (
              <>
                {listingData.organization.logo_url ? (
                  <img
                    className="w-[40px] h-[40px] rounded-full"
                    src={listingData.organization.logo_url}
                    alt={listingData.organization.name}
                  />
                ) : (
                  <div className="w-[40px] h-[40px] bg-text-secondary rounded-full" />
                )}
                <span className="pl-2 text-sm text-text-secondary">{listingData.organization.name}</span>
              </>
            ) : (
              <>
                <div
                  className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus-visible:ring-2 !focus:outline-none !shadow-none focus-visible:ring-white focus-visible:ring-opacity-75"
                  style={{ boxShadow: 'none !important' }}
                >
                  <p>{listingData.point_of_contact.first_name[0] + listingData.point_of_contact.last_name[0]}</p>
                </div>
                <span className="pl-2 text-sm text-text-secondary">
                  {listingData.point_of_contact.first_name} {listingData.point_of_contact.last_name}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="hidden md:pr-4 md:text-xs md:items-center md:space-x-1 md:inline-flex">
              <Button buttonType="tag" size="small" className="mr-1">
                {SolutionTypesMap.get(listingData.type)}
              </Button>
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
              {listingData.assets &&
                listingData.assets.slice(0, Math.min(3, listingData.assets.length)).map((asset, key) => (
                  <Link key={`mobileServiceLogo${key}`} href={`/software/${asset.slug}`} passHref>
                    <a>
                      <ServiceLogo
                        serviceName={asset?.name}
                        serviceId={asset.id}
                        logoUrl={asset.logo_url}
                        className="!w-[2rem] !h-[2rem] p-1 border border-solid rounded-md border-border-default cursor-pointer"
                      />
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export const SolutionListingCard = SolutionListingCardComponent
