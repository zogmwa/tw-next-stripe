import React from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import { BiDollar } from 'react-icons/bi'
import clsx from 'clsx'
import { AiFillStar } from 'react-icons/ai'
import numeral from 'numeral'
import { useRouter } from 'next/router'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { ServiceLogo } from '../service-logo'

type ContractCardProps = {
  contractData: {
    solution: {
      assets: any[]
      avg_rating: string | number
      title: string
      organization: any
      upvotes_count: number
      slug: string
      pay_now_price_unit_amount: number
    }
    status: string
    created: string
    updated: string
    price_at_booking: number
  }
  className?: string
}

function ContractCardComponent({ contractData, className }: ContractCardProps) {
  if (typeof contractData.solution?.title === 'undefined') return null

  const router = useRouter()
  const unitlist = ['', 'K', 'M', 'G']
  const rating = numeral(Number(contractData.solution?.avg_rating ?? 0)).format('0.[0]')

  function kFormater(number) {
    const sign = Math.sign(number)
    let unit = 0
    while (Math.abs(number) > 999) {
      unit = unit + 1
      number = Math.floor(Math.abs(number) / 100) / 10
    }
    return sign * number + unitlist[unit]
  }

  const statuses = [
    {
      name: 'Pending',
      defaultClassName: 'px-2 py-1 text-sm text-[#facc15] border rounded-xl border-[#facc15]',
      selectedClassName: 'px-2 py-1 text-sm text-white border rounded-xl border-[#facc15] bg-[#facc15]',
    },
    {
      name: 'In Progress',
      defaultClassName: 'px-2 py-1 text-sm text-[#5eead4] border rounded-xl border-[#5eead4]',
      selectedClassName: 'px-2 py-1 text-sm text-white border rounded-xl border-[#5eead4] bg-[#5eead4]',
    },
    {
      name: 'In Review',
      defaultClassName: 'px-2 py-1 text-sm border text-primary rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm border text-white rounded-xl border-primary bg-primary',
    },
    {
      name: 'Completed',
      defaultClassName: 'px-2 py-1 text-sm border text-[#65a30d] rounded-xl border-[#65a30d]',
      selectedClassName: 'px-2 py-1 text-sm border text-white rounded-xl border-[#65a30d] bg-[#65a30d]',
    },
  ]

  let statusIndex = 1
  statuses.map((status, index) => {
    if (status.name === contractData.status) statusIndex = index + 1
  })

  const openedDate = new Date(contractData.created).toISOString().split('T')[0]
  const updatedDate = new Date(contractData.updated).toISOString().split('T')[0]

  return (
    <div
      className={clsx(
        'flex flex-col p-4 m-2 border border-solid rounded border-border-default cursor-pointer',
        className,
      )}
      onClick={() => router.push(`/solution/${contractData.solution.slug}`)}
    >
      <div className="flex flex-row">
        <div className="flex flex-col flex-grow">
          <div className="items-center hidden space-x-2 md:flex">
            <Breadcrumbs separator={<MdOutlineKeyboardArrowRight className="text-sm" />} aria-label="breadcrumb">
              {statuses.map((status, index) => {
                if (index <= statusIndex - 1) {
                  return <span className={status.selectedClassName}>{status.name}</span>
                } else {
                  return <span className={status.defaultClassName}>{status.name}</span>
                }
              })}
            </Breadcrumbs>
          </div>
          <div className="flex items-center space-x-2 md:hidden">
            {statuses.map((status, index) => {
              if (index === statusIndex - 1) {
                return <span className={status.selectedClassName}>{status.name}</span>
              }
            })}
          </div>
          <h2 className="mt-2 text-xl">{contractData.solution.title}</h2>
          <div className="flex flex-col md:flex-row mt-2 text-xs">
            <span className="w-full">Started at: {openedDate}</span>
            <span className="w-full">Updated at: {updatedDate}</span>
          </div>
          <div className="flex items-center pt-4 space-x-4 md:hidden">
            <div className="flex items-center space-x-1 text-xs">
              <AiFillStar className="self-center text-primary" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <IoIosArrowUp className="text-primary" />
              <span className="text-xs ">{kFormater(contractData.solution?.upvotes_count ?? 0)}</span>
            </div>
          </div>
        </div>
        <div className="items-center self-start flex-none hidden mt-4 mr-2 space-x-0 text-xs md:inline-flex w-[6rem] justify-end">
          <BiDollar className="text-xl font-bold text-text-primary" />
          <h4 className="text-xl font-bold text-text-primary">
            {contractData.price_at_booking ? Number(contractData.price_at_booking) / 100 : 0}
          </h4>
        </div>
      </div>
      <div className="flex flex-col-reverse pt-4 md:items-center md:flex-row md:justify-between">
        <div className="flex items-center pt-4 md:pt-0">
          {contractData.solution.organization?.logo_url ? (
            <img
              className="w-[40px] h-[40px] rounded-full"
              src={contractData.solution.organization.logo_url}
              alt={contractData.solution.organization.name}
            />
          ) : (
            <div className="w-[40px] h-[40px] bg-text-secondary rounded-full" />
          )}
          <span className="pl-2 text-sm text-text-secondary">{contractData.solution.organization?.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="hidden md:pr-4 md:text-xs md:items-center md:space-x-1 md:inline-flex">
            <AiFillStar className="self-center text-primary" />
            <span>{rating}</span>
          </div>
          <div className="hidden md:pr-4 md:text-xs md:items-center md:space-x-1 md:inline-flex">
            <IoIosArrowUp className="text-primary" />
            <span className="text-xs">{kFormater(contractData.solution?.upvotes_count ?? 0)}</span>
          </div>
          <div className="flex items-center space-x-0 text-xs md:self-start md:mt-4 md:hidden">
            <BiDollar className="text-xl font-bold text-text-primary" />
            <h4 className="text-xl font-bold text-text-primary">
              {contractData.price_at_booking ? Number(contractData.price_at_booking) / 100 : 0}
            </h4>
          </div>
          <div className="flex self-start space-x-2">
            {contractData.solution.assets &&
              contractData.solution.assets
                .slice(0, Math.min(3, contractData.solution.assets.length))
                .map((asset, key) => (
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

export const ContractCard = ContractCardComponent
