import React from 'react'
import Link from 'next/link'
import { IoIosArrowUp } from 'react-icons/io'
import { BiDollar } from 'react-icons/bi'
import clsx from 'clsx'
import { AiFillStar } from 'react-icons/ai'
import numeral from 'numeral'
import { Button } from '../button'

type SolutionListingCardProps = {
  listingData: {
    tags: { name: string; slug: string }[]
    title: string
    price: number
    upvoted_count: number
    avg_rating?: string | number
    provide_organization: { name: string; logo_url: string | null }
  }
  className?: string
}

export function SolutionListingCardComponent({ listingData, className = '' }: SolutionListingCardProps) {
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
    <div className={clsx('flex flex-col p-4 mt-2 mr-2 border border-solid rounded border-border-default', className)}>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap">
            {listingData.tags.map((tag) => {
              return (
                <Link key={tag.slug} prefetch={false} href={'../search/' + tag.slug}>
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
              <span className="text-xs ">{kFormater(listingData.upvoted_count)}</span>
            </div>
          </div>
        </div>
        <div className="items-center self-start hidden mt-4 space-x-0 text-xs md:inline-flex">
          <BiDollar className="text-xl font-bold text-text-primary" />
          <h4 className="text-xl font-bold text-text-primary">{listingData.price}</h4>
        </div>
      </div>
      <div className="flex flex-col-reverse pt-4 md:items-center md:flex-row md:justify-between">
        <div className="flex items-center pt-4 md:pt-0">
          {listingData.provide_organization.logo_url ? (
            <img
              className="w-[40px] h-[40px] rounded-full"
              src={listingData.provide_organization.logo_url}
              alt={listingData.provide_organization.name}
            />
          ) : (
            <div className="w-[40px] h-[40px] bg-text-secondary rounded-full" />
          )}
          <span className="pl-2 text-sm text-text-secondary">{listingData.provide_organization.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="hidden md:pr-4 md:text-xs md:items-center md:space-x-1 md:inline-flex">
            <AiFillStar className="self-center text-primary" />
            <span>{rating}</span>
          </div>
          <div className="hidden md:pr-4 md:text-xs md:items-center md:space-x-1 md:inline-flex">
            <IoIosArrowUp className="text-primary" />
            <span className="text-xs">{kFormater(listingData.upvoted_count)}</span>
          </div>
          <div className="flex items-center space-x-0 text-xs md:self-start md:mt-4 md:hidden">
            <BiDollar className="text-xl font-bold text-text-primary" />
            <h4 className="text-xl font-bold text-text-primary">{listingData.price}</h4>
          </div>
          <div className="flex self-start space-x-2">
            <div className="p-1 border border-solid rounded-md border-border-default">
              <img
                src="https://s3-alpha-sig.figma.com/img/439e/fbad/d7071737e5895ae4fc5638fce3ef9d7d?Expires=1637539200&Signature=Z4Zxj2A8~d-~jzhWTQHMlbrjY8X3PxwvJ-YvhooQ90OQeYSoZWUDxsWlCgZvtl1dhJ7~stlijY9cic~BrnD0Uqdmz~~1MwMEgQsqrcs1Oz6Gi~Yc4hssrMNvpg2elR4ItWu349hWWwI~-mUlTv6YugkxaU3AuzROJtlKAoDfX8dXvmZvCYFenzEhK-k3tTTSviW2ynIAVzBDCFBlt9QqA0SWFS6by65ff7NilgzUbsryJCsLlbqmrsHcODbqxWoICPW9oQ09C3o48-sb60LEWl-w2hbaE2mkYvLVQdpCg7zXwd878AN~Tz3ebm5C0WFbjK9gjtkLARBxLg3ykHIfuA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                alt="diamond"
                className="w-8 h-8"
              />
            </div>
            <div className="p-1 border border-solid rounded-md border-border-default">
              <img
                src="https://s3-alpha-sig.figma.com/img/c955/3ecf/e57798dfb2637c0280d36e30d747befc?Expires=1637539200&Signature=VPWp5Nb2vNzRd2tth4B9~X9R2MOxmVxVu9orXKRI0BLAPXChgrExUYcksMn6exW6C-6q47NOa2QXcDCc8dGrDwoRGwye19BK5oPRVCwLie9Rm3cAonu0MA3npHwSuFzJZKbAknMraHr1sk5OSZicnjHbpnKWi3JyzB6KeF8-qPN2Sf0aJGDMpJoDy3Hk~IsfbbBge7NdEZJkItFyqeCp7QHwMq7aWFXhDPP-Xt440CFVk-fWG7hLcBO6NgdKCIZGrhcVdBIdkrbZAGbFsVNqQ9Y~7GcEkzn2T7xT31SbQb3LqE1Z9o35r-mOBl08X~MIeuMgqHebLoi7MnjQgvNUXA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                alt="webflow"
                className="w-8 h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SolutionListingCard = SolutionListingCardComponent
