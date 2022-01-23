/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Link from 'next/link'
import { IoIosArrowUp } from 'react-icons/io'
import { BiDollar } from 'react-icons/bi'
import clsx from 'clsx'
import { AiFillStar } from 'react-icons/ai'
import numeral from 'numeral'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { solutionContract } from '@taggedweb/types/contracts'
import { SAD_FACE_RATING, NEUTRAL_FACE_RATING, HAPPY_FACE_RATING } from '@taggedweb/utils/constants'
import { ServiceLogo } from '../service-logo'
import { ReviewReaction } from '../review-reaction'
import { toggleUpdateSolutionBookingRating } from '../../queries/solution'
import { contractStatus, makeTitle } from '../contract-detail/status'

type ContractCardProps = {
  contractData: solutionContract
  className?: string
  redirectUrl?: string
}

function ContractCardComponent({ contractData, className, redirectUrl }: ContractCardProps) {
  if (typeof contractData.solution?.title === 'undefined') return null
  const unitlist = ['', 'K', 'M', 'G']
  const rating = numeral(Number(contractData.solution?.avg_rating ?? 0) / 3).format('0.[0]')
  const [bookingRating, setBookingRating] = useState(contractData.rating)
  const [avgRating, setAvgRating] = useState(contractData.solution.avg_rating)
  const [isLoading, setIsLoading] = useState(false)

  function kFormater(number) {
    const sign = Math.sign(number)
    let unit = 0
    while (Math.abs(number) > 999) {
      unit = unit + 1
      number = Math.floor(Math.abs(number) / 100) / 10
    }
    return sign * number + unitlist[unit]
  }

  const onChangeStatus = async (rating) => {
    setIsLoading(true)
    if (rating === SAD_FACE_RATING || rating === NEUTRAL_FACE_RATING || rating === HAPPY_FACE_RATING) {
      const solutionBookingData = await toggleUpdateSolutionBookingRating(contractData.id, rating)
      setBookingRating(solutionBookingData.rating)
      setAvgRating(solutionBookingData.solution.avg_rating)
    }
    setIsLoading(false)
  }

  const statuses = contractStatus(contractData.solution.is_metered)

  let statusIndex = 1
  statuses.map((status, index) => {
    if (status.name === contractData.status) statusIndex = index + 1
  })

  const startedDate = contractData.solution.is_metered
    ? contractData.metered_booking_info?.start_date
      ? new Date(contractData.metered_booking_info.start_date).toISOString().split('T')[0]
      : ''
    : contractData.started_at
    ? new Date(contractData.started_at).toISOString().split('T')[0]
    : ''
  const updatedDate = new Date(contractData.updated ?? '').toISOString().split('T')[0]

  return (
    <div className={clsx('flex flex-col p-4 m-2 border border-solid rounded border-border-default', className)}>
      <div className="flex flex-row">
        <div className="flex flex-col flex-grow">
          <div className="items-center hidden space-x-2 md:flex">
            {contractData.solution.is_metered ? (
              statuses.map((status, index) => {
                if (index === statusIndex - 1) {
                  return (
                    <span className={clsx(status.selectedClassName, ' self-start')} key={`status${index}`}>
                      {makeTitle(status.name)}
                    </span>
                  )
                }
              })
            ) : (
              <Breadcrumbs separator={<MdOutlineKeyboardArrowRight className="text-sm" />} aria-label="breadcrumb">
                {statuses.map((status, index) => {
                  if (index <= statusIndex - 1) {
                    return (
                      <span className={status.selectedClassName} key={index}>
                        {makeTitle(status.name)}
                      </span>
                    )
                  } else {
                    return (
                      <span className={status.defaultClassName} key={index}>
                        {makeTitle(status.name)}
                      </span>
                    )
                  }
                })}
              </Breadcrumbs>
            )}
          </div>
          <div className="flex items-center space-x-2 md:hidden">
            {statuses.map((status, index) => {
              if (index === statusIndex - 1) {
                return (
                  <span className={status.selectedClassName} key={`status${index}`}>
                    {status.name}
                  </span>
                )
              }
            })}
          </div>
          <Link href={redirectUrl || `/solution/${contractData.solution.slug}`}>
            <a className="mt-2 text-xl cursor-pointer text-text-primary">{contractData.solution.title}</a>
          </Link>
          <div className="flex flex-col mt-2 text-xs md:flex-row">
            <span className="w-full">
              Started at: <b>{startedDate}</b>
            </span>
            {startedDate ? (
              <span className="w-full">
                Updated at: <b>{updatedDate}</b>
              </span>
            ) : null}
          </div>
          <div className="flex items-center pt-4 space-x-4 md:hidden">
            <div className="flex items-center space-x-1 text-xs">
              <AiFillStar className="self-center text-primary" />
              <span>{rating < 0 ? 0 : rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <IoIosArrowUp className="text-primary" />
              <span className="text-xs ">{kFormater(contractData.solution?.upvotes_count ?? 0)}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[6rem] mt-4 mr-2 space-y-2">
          <div className="items-center self-start self-end justify-end flex-none hidden space-x-0 md:inline-flex">
            <BiDollar className="text-xl font-bold text-text-primary" />
            <h4 className="text-xl font-bold text-text-primary">
              {contractData.price_at_booking ? Number(contractData.price_at_booking) : 0}
            </h4>
          </div>
          <ReviewReaction
            avgRating={avgRating}
            statusType={bookingRating}
            className="self-end hidden md:flex"
            popupClassName="space-x-2"
            onChangeStatus={(type) => onChangeStatus(type)}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className="flex flex-col-reverse pt-4 md:items-center md:flex-row md:justify-between">
        <div className="flex items-center">
          {contractData.solution.organization ? (
            <>
              {contractData.solution.organization.logo_url ? (
                <img
                  className="w-[40px] h-[40px] rounded-full"
                  src={contractData.solution.organization.logo_url}
                  alt={contractData.solution.organization.name}
                />
              ) : (
                <div className="w-[40px] h-[40px] bg-text-secondary rounded-full" />
              )}
              <span className="pl-2 text-sm text-text-secondary">{contractData.solution.organization.name}</span>
            </>
          ) : (
            <>
              <div
                className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus-visible:ring-2 !focus:outline-none !shadow-none focus-visible:ring-white focus-visible:ring-opacity-75"
                style={{ boxShadow: 'none !important' }}
              >
                <p>
                  {contractData.solution.point_of_contact?.first_name[0] ??
                    '' + contractData.solution.point_of_contact?.last_name[0] ??
                    ''}
                </p>
              </div>
              <span className="pl-2 text-sm text-text-secondary">
                {contractData.solution.point_of_contact?.first_name ?? ''}{' '}
                {contractData.solution.point_of_contact?.last_name ?? ''}
              </span>
            </>
          )}
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
          <div className="flex items-center justify-center space-x-0 text-xs md:self-start md:mt-4 md:hidden">
            <BiDollar className="text-xl font-bold text-text-primary" />
            <h4 className="text-xl font-bold text-text-primary">
              {contractData.price_at_booking ? Number(contractData.price_at_booking) : 0}
            </h4>
            <ReviewReaction
              avgRating={avgRating}
              statusType={bookingRating}
              className="self-end md:hidden flex !ml-4"
              popupClassName="space-x-2"
              onChangeStatus={(type) => onChangeStatus(type)}
              isLoading={isLoading}
            />
          </div>
          <div className="flex self-start space-x-2">
            {contractData.solution.assets &&
              contractData.solution.assets
                .slice(0, Math.min(3, contractData.solution.assets.length))
                .map((asset, key) => (
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
  )
}

export const ContractCard = ContractCardComponent
