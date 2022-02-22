import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Markdown from 'marked-react'
import Lowlight from 'react-lowlight'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import javascript from 'highlight.js/lib/languages/javascript'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Button } from '../button'
import { solutionContract } from '../../types/contracts'
import { SolutionFAQ } from '../solution-detail-introduction'
import { contractStatus, makeTitle } from './status'
import { toggleContractPauseOrResume } from '../../queries/user'
import { Invoice } from '../contract-invoice/invoice'
import ReactToPrint from 'react-to-print'

Lowlight.registerLanguage('js', javascript)

const renderer = {
  // eslint-disable-next-line react/display-name
  code: (snippet, lang) => {
    return <Lowlight language={lang} value={snippet} />
  },
}

type ContractDetailProps = {
  contractData: solutionContract
}

function ContractDetailComponent({ contractData }: ContractDetailProps) {
  const childRef = useRef()
  const [showContractData, setShowContractData] = useState(contractData)
  const [isPauseOrResuem, setIsPauseOrResume] = useState(false)
  const statuses = contractStatus(false)

  let statusIndex = 1
  statuses.forEach((status, index) => {
    if (status.name === showContractData.status) statusIndex = index + 1
  })

  const PauseOrResumecontractController = async (pauseStatus) => {
    setIsPauseOrResume(true)
    const data = await toggleContractPauseOrResume(showContractData.id, '', pauseStatus, 'customer')
    setShowContractData(data[0])
    setIsPauseOrResume(false)
  }

  const createdDate = new Date(showContractData.created ?? '').toISOString().split('T')[0]

  const nextPaymentDate =
    showContractData.solution.is_metered &&
    (showContractData?.metered_booking_info?.current_period_end
      ? new Date(showContractData?.metered_booking_info?.current_period_end).toISOString().split('T')[0]
      : '')
  return (
    <div className="flex flex-col mx-4 md:mt-6">
      <div className="flex items-center my-2 space-x-2 sm:hidden">
        {showContractData.status === 'Paused' ? (
          <span className="px-2 py-1 text-sm text-white bg-yellow-600 border border-yellow-600 rounded-xl">
            {makeTitle(showContractData.status)}
          </span>
        ) : (
          statuses.map((status, index) => {
            if (index === statusIndex - 1) {
              return (
                <span className={status.selectedClassName} key={`status${index}`}>
                  {status.name}
                </span>
              )
            }
            return <></>
          })
        )}
      </div>
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <Link href={`/solution/${showContractData.solution.slug}`} passHref>
          <a className="sm:w-5/6 md:w-3/4">
            <h2 className="text-base font-bold cursor-pointer sm:text-lg md:text-xl hover:underline text-text-primary">
              {showContractData.solution.title}
            </h2>
          </a>
        </Link>
        <div className="mt-4 md:mt-0">
          {/* <BiDollar className="text-xl md:text-2xl font-bold text-text-primary mt-1  md:mt-0.5" />
          <h4 className="text-base font-bold sm:text-lg md:text-xl text-text-primary">
            {showContractData.price_at_booking ?? 0}
          </h4> */}
          {showContractData.solution.is_metered &&
            showContractData.status === 'In Progress' &&
            showContractData.pause_status === null && (
              <Button
                disabled={isPauseOrResuem}
                loading={isPauseOrResuem}
                onClick={() => PauseOrResumecontractController('CUSTOMER_PAUSED')}
                loadingClassName="text-primary"
              >
                Pause Contract
              </Button>
            )}
          {showContractData.solution.is_metered &&
            showContractData.status === 'Paused' &&
            showContractData.pause_status === 'CUSTOMER_PAUSED' && (
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
      </div>
      <div className="flex flex-col my-4 space-y-3 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {showContractData.solution.organization ? (
              <>
                {showContractData.solution.organization.logo_url ? (
                  <img
                    className="w-[40px] h-[40px] rounded-full"
                    src={showContractData.solution.organization.logo_url}
                    alt={showContractData.solution.organization.name}
                  />
                ) : (
                  <div className="w-[40px] h-[40px] bg-text-secondary rounded-full" />
                )}
                <span className="pl-2 text-sm text-text-secondary">{showContractData.solution.organization.name}</span>
              </>
            ) : (
              <>
                <div
                  className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus-visible:ring-2 !focus:outline-none !shadow-none focus-visible:ring-white focus-visible:ring-opacity-75"
                  style={{ boxShadow: 'none !important' }}
                >
                  <p>
                    {showContractData.solution.point_of_contact?.first_name[0] ??
                      '' + showContractData.solution.point_of_contact?.last_name[0] ??
                      ''}
                  </p>
                </div>
                <span className="pl-2 text-sm text-text-secondary">
                  {showContractData.solution.point_of_contact?.first_name ?? ''}{' '}
                  {showContractData.solution.point_of_contact?.last_name ?? ''}
                  {showContractData.solution.point_of_contact?.email ? (
                    <span className="ml-2">{`Contact email: ${showContractData.solution.point_of_contact?.email}`}</span>
                  ) : (
                    ''
                  )}
                </span>
              </>
            )}
          </div>
          {/* <div className="flex sm:hidden">
            <BiDollar className="text-xl font-bold text-text-primary mt-0.5" />
            <h4 className="text-base font-bold sm:text-xl text-text-primary">{showContractData.price_at_booking ?? 0}</h4>
          </div> */}
        </div>
        <div className="items-center hidden space-x-2 sm:flex">
          {showContractData.status === 'Paused' ? (
            <span className="px-2 py-1 text-sm text-white bg-yellow-600 border border-yellow-600 rounded-xl">
              {makeTitle(showContractData.status)}
            </span>
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
      </div>
      <div className="flex flex-col p-2 space-y-3 sm:p-4">
        {createdDate ? (
          <div className="inline md:flex">
            <span className="w-full">
              <b className="mr-2">Booked date :</b> {createdDate}
            </span>
            {/* {createdDate && updatedDate ? (
            <span className="w-full ml-2">
            <b className="mr-2">Updated at:</b> {updatedDate}
            </span>
          ) : null} */}
          </div>
        ) : null}
        {(showContractData?.metered_booking_info?.collection_method || nextPaymentDate) && (
          <div className="md:flex">
            {nextPaymentDate && <b className="mr-2">Next Payment Date:</b>}

            {showContractData?.metered_booking_info?.billing_cycle_anchor ? (
              showContractData?.metered_booking_info?.collection_method ? (
                <span className="ml-2">
                  {showContractData?.metered_booking_info?.collection_method === 'charge_automatically'
                    ? 'Your card will be charged automatically at the end of the billing period, for provider logged hours only.'
                    : 'We will send an invoice'}
                </span>
              ) : null
            ) : null}
          </div>
        )}
        {showContractData.solution.eta_days && (
          <div className="inline md:flex">
            <span className="w-full">
              <b className="mr-2">Provider Notes :</b>
              {showContractData.provider_notes ??
                `Estimated time for completion is ${showContractData.solution.eta_days} business days.`}
            </span>
          </div>
        )}
        {showContractData.solution.description && (
          <div id="solutions-overview" className="flex flex-col">
            <a href="#solutions-overview">
              <h4 className="pb-2 font-bold text-black text-md">Overview :</h4>
            </a>
            <div>
              <Markdown value={showContractData.solution.description} renderer={renderer} />
            </div>
          </div>
        )}
        {showContractData.solution.scope_of_work && (
          <div style={{ scrollMarginTop: '3rem' }} id="solutions-scope" className="flex flex-col">
            <a href="#solutions-scope">
              <h4 className="pb-2 font-bold text-black text-md">Scope of Contract :</h4>
            </a>
            <div>
              <Markdown value={showContractData.solution.scope_of_work} renderer={renderer} />
            </div>
          </div>
        )}
        {showContractData.solution.questions
          ? showContractData.solution.questions.length > 0 && (
              <div style={{ scrollMarginTop: '3rem' }} id="solutions-faq" className="py-4">
                <SolutionFAQ
                  questions={showContractData.solution.questions}
                  solutionSlug={showContractData.solution.slug}
                />
              </div>
            )
          : null}

        {showContractData.solution.type === 'C' && showContractData.solution?.consultation_scheduling_link && (
          <div className="flex w-full md:flex">
            <a
              className=""
              href={showContractData.solution?.consultation_scheduling_link}
              target="_blank"
              rel="noreferrer"
            >
              <Button buttonType="primary" className="my-2 md:h-12">
                Book your consultation slot
              </Button>
            </a>
          </div>
        )}
      </div>

      <div className="hidden flex flex-col items-center justify-center bg-bg_invoice h-screen">
        <Invoice ref={childRef} contractData={showContractData} />
      </div>
      {showContractData.is_payment_completed && (
        <div className="ml-4 text-left my-3">
          <ReactToPrint
            documentTitle={`taggedweb-invoice`}
            content={() => childRef.current}
            trigger={() => <Button buttonType="primary"> Print Invoice</Button>}
          />
        </div>
      )}
    </div>
  )
}

export const ContractDetail = ContractDetailComponent
