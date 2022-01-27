import React from 'react'
import Link from 'next/link'
import { BiDollar } from 'react-icons/bi'
import Lowlight from 'react-lowlight'
import clsx from 'clsx'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import javascript from 'highlight.js/lib/languages/javascript'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { solutionContract } from '../../types/contracts'
import { contractStatus, makeTitle } from '../contract-detail/status'
import { UsageReport } from '../usage-report'

Lowlight.registerLanguage('js', javascript)

const renderer = {
  // eslint-disable-next-line react/display-name
  code: (snippet, lang) => {
    return <Lowlight language={lang} value={snippet} />
  },
}

type ProviderContractDetailProps = {
  trackingData: {
    booking_data: solutionContract
    current_period_start: string
    current_period_end: string
    tracking_times: any[]
  }
  bookingId: string
}

function ProviderContractDetailComponent({ trackingData, bookingId }: ProviderContractDetailProps) {
  const contractData = trackingData.booking_data
  const statuses = contractStatus(contractData.solution.is_metered)

  let statusIndex = 1
  statuses.forEach((status, index) => {
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
  const periodStartDate = new Date(trackingData.current_period_start).toISOString().split('T')[0]
  const periodEndDate = new Date(trackingData.current_period_end).toISOString().split('T')[0]

  return (
    <div className="flex flex-col mt-6">
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
      <div className="flex justify-between my-4">
        <Link href={`/solution/${contractData.solution.slug}`} passHref>
          <a>
            <h2 className="text-xl font-bold cursor-pointer hover:underline text-text-primary">
              {contractData.solution.title}
            </h2>
          </a>
        </Link>
        <div className="flex">
          <BiDollar className="text-2xl font-bold text-text-primary mt-0.5" />
          <h4 className="text-xl font-bold text-text-primary">{contractData.price_at_booking ?? 0}</h4>
        </div>
      </div>
      <div className="flex items-center">
        <div
          className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus-visible:ring-2 !focus:outline-none !shadow-none focus-visible:ring-white focus-visible:ring-opacity-75"
          style={{ boxShadow: 'none !important' }}
        >
          <p>{contractData.booked_by?.first_name[0] ?? '' + contractData.booked_by?.last_name[0] ?? ''}</p>
        </div>
        <span className="pl-2 text-sm text-text-secondary">
          {contractData.booked_by?.first_name ?? ''} {contractData.booked_by?.last_name ?? ''}
          {contractData.booked_by?.email ? (
            <span className="ml-2">{`Contact email: ${contractData.booked_by?.email}`}</span>
          ) : (
            ''
          )}
        </span>
      </div>
      <div className="inline my-4 md:flex">
        <span className="w-full">
          <b className="mr-2">Contract Started at:</b> {startedDate || 'Not started yet...'}
        </span>
        {startedDate ? (
          <span className="w-full ml-2">
            <b className="mr-2">Contract Updated at:</b> {updatedDate}
          </span>
        ) : null}
      </div>
      {contractData.solution.is_metered && (
        <>
          <div className="inline my-4 md:flex">
            <span className="w-full">
              <b className="mr-2">Current Period Start:</b> {periodStartDate}
            </span>
            {startedDate ? (
              <span className="w-full ml-2">
                <b className="mr-2">Current Period End:</b> {periodEndDate}
              </span>
            ) : null}
          </div>
          <UsageReport
            usage_reports={trackingData.tracking_times}
            current_period_start={trackingData.current_period_start}
            current_period_end={trackingData.current_period_end}
            bookingId={bookingId}
            className="mt-4"
          />
        </>
      )}
    </div>
  )
}

export const ProviderContractDetail = ProviderContractDetailComponent
