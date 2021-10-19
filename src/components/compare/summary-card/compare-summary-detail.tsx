import React from 'react'
import { RiShareBoxLine } from 'react-icons/ri'
import { MdStar } from 'react-icons/md'
import numeral from 'numeral'
import { IoIosArrowUp } from 'react-icons/io'
import { Asset } from '../../../types/asset'
import { ServiceLogo } from '../../service-logo'

type SummaryCompareCardDetail = {
  service: Asset
}

function SummaryCompareCardDetailComponent({ service }: SummaryCompareCardDetail) {
  var unitlist = ['', 'K', 'M', 'G']
  function kFormater(number) {
    let sign = Math.sign(number)
    let unit = 0
    while (Math.abs(number) > 999) {
      unit = unit + 1
      number = Math.floor(Math.abs(number) / 100) / 10
    }
    return sign * number + unitlist[unit]
  }

  return (
    <div className="flex justify-around md:flex-col md:p-2 md:m-4 md:border md:border-solid md:border-border-default md:rounded-md">
      <div className="flex flex-col items-center p-2">
        <ServiceLogo serviceName={service.name} serviceId={service.id} logoUrl={service.logo_url} owned={null} />
        <div className="flex items-center mt-4">
          <span className="w-20 text-sm text-center text-semibold md:w-full">{service.name}</span>
          <RiShareBoxLine className="w-5 h-5 text-primary md:ml-2" />
        </div>
      </div>
      <div className="grid items-center grid-cols-2 divide-x divide-solid divide-border-default md:py-4">
        <div className="flex flex-col items-center pr-1">
          <MdStar className="text-primary" />
          <span className="text-md text-text-primary text-bold">{numeral(Number(service.avg_rating ?? 0)).format('0.[0]')}</span>
          <span className="text-xs text-text-secondary">
            {service.reviews_count ? kFormater(service.reviews_count) : 'No'} reviews
          </span>
        </div>
        <div className="flex flex-col items-center pl-1">
          <IoIosArrowUp className="text-primary" />
          <span className="text-md text-text-primary text-bold">{service?.upvotes_count ?? 0}</span>
          <span className="text-xs text-text-secondary">
            {service.users_count ? kFormater(service.users_count) : 'No'} users
          </span>
        </div>
      </div>
    </div>
  )
}

export const SummaryCompareCardDetail = SummaryCompareCardDetailComponent
