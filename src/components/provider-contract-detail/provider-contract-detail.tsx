/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { solutionContract } from '../../types/contracts'
import { contractStatus, makeTitle } from '../contract-detail/status'
import { toggleStartContract, toggleContractPauseOrResume } from '../../queries/user'
import { UsageReport } from '../usage-report'
import { Button } from '../button'

type ProviderContractDetailProps = {
  trackingData: {
    booking_data: solutionContract
    current_period_start?: string
    current_period_end?: string
    tracking_times?: any[]
  }
  bookingId: string
  username: string
}

function ProviderContractDetailComponent({ trackingData, bookingId, username }: ProviderContractDetailProps) {
  const [isStartContract, setIsStartContract] = useState(false)
  const [showTrackingData, setShowTrackingData] = useState(trackingData)
  const [startedDate, setStartedDate] = useState('')
  const [updatedDate, setUpdatedDate] = useState('')
  const [periodStartDate, setPeriodStartDate] = useState('')
  const [periodEndDate, setPeriodEndDate] = useState('')
  const [statusIndex, setStatusIndex] = useState(1)
  const [paymentStatusIndex, setPaymentStatusIndex] = useState(1)
  const [isPauseOrResuem, setIsPauseOrResume] = useState(false)

  const contractStatuses = contractStatus(false)
  const paymentStatuses = contractStatus(trackingData.booking_data.solution.is_metered)
  useEffect(() => {
    contractStatuses.forEach((status, index) => {
      if (status.name === showTrackingData.booking_data.status) setStatusIndex(index + 1)
    })
    paymentStatuses.forEach((status, index) => {
      if (status.name === showTrackingData.booking_data.status) setPaymentStatusIndex(index + 1)
    })

    const started = showTrackingData.booking_data.solution.is_metered
      ? showTrackingData.booking_data.metered_booking_info?.start_date
        ? new Date(showTrackingData.booking_data.metered_booking_info.start_date).toISOString().split('T')[0]
        : ''
      : showTrackingData.booking_data.started_at
      ? new Date(showTrackingData.booking_data.started_at).toISOString().split('T')[0]
      : ''
    const updated = new Date(showTrackingData.booking_data.updated ?? '').toISOString().split('T')[0]
    let currentPeriodStartDate = ''
    let currentPeriodEndDate = ''
    if (showTrackingData.booking_data.solution.is_metered) {
      currentPeriodStartDate = showTrackingData?.current_period_start
        ? new Date(showTrackingData.current_period_start).toISOString().split('T')[0]
        : ''
      currentPeriodEndDate = showTrackingData?.current_period_end
        ? new Date(showTrackingData.current_period_end).toISOString().split('T')[0]
        : ''
    }
    setStartedDate(started)
    setUpdatedDate(updated)
    setPeriodStartDate(currentPeriodStartDate)
    setPeriodEndDate(currentPeriodEndDate)
  }, [showTrackingData])

  const startContract = async () => {
    setIsStartContract(true)
    const data = await toggleStartContract(bookingId, username)
    setShowTrackingData(data)
    setIsStartContract(false)
  }

  const PauseOrResumecontractController = async (pauseStatus) => {
    setIsPauseOrResume(true)
    const data = await toggleContractPauseOrResume(trackingData.booking_data.id, username, pauseStatus, 'provider')
    setShowTrackingData(data)
    setIsPauseOrResume(false)
  }

  return (
    <div className="flex flex-col mt-6">
      <div className="flex flex-row justify-between">
        <div className="items-center hidden space-x-2 md:flex">
          {showTrackingData.booking_data.status === 'Paused' ? (
            <span className="px-2 py-1 text-sm text-white border rounded-xl border-yellow-600 bg-yellow-600">
              {makeTitle(showTrackingData.booking_data.status)}
            </span>
          ) : (
            <Breadcrumbs separator={<MdOutlineKeyboardArrowRight className="text-sm" />} aria-label="breadcrumb">
              {contractStatuses.map((status, index) => {
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
          {contractStatuses.map((status, index) => {
            if (index === statusIndex - 1) {
              return (
                <span className={status.selectedClassName} key={`status${index}`}>
                  {status.name}
                </span>
              )
            }
          })}
        </div>
        {showTrackingData.booking_data.solution.is_metered && showTrackingData.booking_data.status === 'Pending' && (
          <Button
            onClick={startContract}
            disabled={isStartContract}
            loading={isStartContract}
            loadingClassName="text-primary"
          >
            Begin Working
          </Button>
        )}
        {showTrackingData.booking_data.solution.is_metered &&
          showTrackingData.booking_data.status === 'In Progress' &&
          showTrackingData.booking_data.pause_status === null && (
            <Button
              disabled={isPauseOrResuem}
              loading={isPauseOrResuem}
              onClick={() => PauseOrResumecontractController('PROVIDER_PAUSED')}
              loadingClassName="text-primary"
            >
              Pause Contract
            </Button>
          )}
        {showTrackingData.booking_data.solution.is_metered &&
          showTrackingData.booking_data.status === 'Paused' &&
          showTrackingData.booking_data.pause_status === 'PROVIDER_PAUSED' && (
            <Button
              disabled={isPauseOrResuem}
              loading={isPauseOrResuem}
              onClick={() => PauseOrResumecontractController(null)}
              loadingClassName="text-primary"
            >
              Resume Contract
            </Button>
          )}
      </div>
      <div className="flex justify-between my-4">
        <Link href={`/solution/${showTrackingData.booking_data.solution.slug}`} passHref>
          <a>
            <h2 className="text-xl font-bold cursor-pointer hover:underline text-text-primary">
              {showTrackingData.booking_data.solution.title}
            </h2>
          </a>
        </Link>
      </div>
      <div className="flex items-center">
        <div
          className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus-visible:ring-2 !focus:outline-none !shadow-none focus-visible:ring-white focus-visible:ring-opacity-75"
          style={{ boxShadow: 'none !important' }}
        >
          <p>
            {showTrackingData.booking_data.booked_by?.first_name[0] ??
              '' + showTrackingData.booking_data.booked_by?.last_name[0] ??
              ''}
          </p>
        </div>
        <span className="pl-2 text-sm text-text-secondary">
          {showTrackingData.booking_data.booked_by?.first_name ?? ''}{' '}
          {showTrackingData.booking_data.booked_by?.last_name ?? ''}
          {showTrackingData.booking_data.booked_by?.email ? (
            <span className="ml-2">{`Contact email: ${showTrackingData.booking_data.booked_by?.email}`}</span>
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
      {showTrackingData.booking_data.solution.is_metered &&
        showTrackingData.booking_data.status !== 'Pending' &&
        paymentStatuses.map((status, index) => {
          if (index === paymentStatusIndex - 1) {
            return (
              <div className="flex space-x-2 items-center" key={`status${index}`}>
                <span className="text-md font-semibold">Payment Status: </span>
                <span className={clsx(status.selectedClassName, ' self-start')}>{makeTitle(status.name)}</span>
              </div>
            )
          }
          return <></>
        })}
      {showTrackingData.booking_data.solution.is_metered && showTrackingData.booking_data.status !== 'Pending' && (
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
            usage_reports={showTrackingData.tracking_times}
            current_period_start={showTrackingData.current_period_start}
            current_period_end={showTrackingData.current_period_end}
            bookingId={bookingId}
            className="mt-4"
          />
        </>
      )}
    </div>
  )
}

export const ProviderContractDetail = ProviderContractDetailComponent
