import React from 'react'
import Link from 'next/link'
import { BiDollar } from 'react-icons/bi'
import Markdown from 'marked-react'
import Lowlight from 'react-lowlight'
import clsx from 'clsx'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import javascript from 'highlight.js/lib/languages/javascript'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Button } from '../button'
import { solutionContract } from '../../types/contracts'
import { SolutionFAQ } from '../solution-detail-introduction'
import { contractStatus, makeTitle } from './status'

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
  const statuses = contractStatus(contractData.solution.is_metered)

  let statusIndex = 1
  statuses.forEach((status, index) => {
    if (status.name === contractData.status) statusIndex = index + 1
  })

  // const startedDate = contractData.solution.is_metered
  //   ? contractData.metered_booking_info?.start_date
  //     ? new Date(contractData.metered_booking_info.start_date).toISOString().split('T')[0]
  //     : ''
  //   : contractData.started_at
  //   ? new Date(contractData.started_at).toISOString().split('T')[0]
  //   : ''
  const createdDate = new Date(contractData.created ?? '').toISOString().split('T')[0]
  // const updatedDate = new Date(contractData.updated ?? '').toISOString().split('T')[0]

  const nextPaymentDate =
    contractData.solution.is_metered &&
    (contractData?.metered_booking_info?.current_period_end
      ? new Date(contractData?.metered_booking_info?.current_period_end).toISOString().split('T')[0]
      : '')
  return (
    <div className="flex flex-col mx-4 md:mt-6">
      <div className="flex items-center my-2 space-x-2 sm:hidden">
        {statuses.map((status, index) => {
          if (index === statusIndex - 1) {
            return (
              <span className={status.selectedClassName} key={`status${index}`}>
                {status.name}
              </span>
            )
          }
          return <></>
        })}
      </div>
      <div className="flex flex-col justify-between sm:flex-row">
        <Link href={`/solution/${contractData.solution.slug}`} passHref>
          <a className="sm:w-5/6 md:w-3/4">
            <h2 className="text-base font-bold cursor-pointer sm:text-lg md:text-xl hover:underline text-text-primary">
              {contractData.solution.title}
            </h2>
          </a>
        </Link>
        <div className="justify-center justify-end hidden w-1/6 md:w-1/4 sm:flex">
          <BiDollar className="text-xl md:text-2xl font-bold text-text-primary mt-1  md:mt-0.5" />
          <h4 className="text-base font-bold sm:text-lg md:text-xl text-text-primary">
            {contractData.price_at_booking ?? 0}
          </h4>
        </div>
      </div>
      <div className="flex flex-col my-4 space-y-3 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center justify-between">
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
                  {contractData.solution.point_of_contact?.email ? (
                    <span className="ml-2">{`Contact email: ${contractData.solution.point_of_contact?.email}`}</span>
                  ) : (
                    ''
                  )}
                </span>
              </>
            )}
          </div>
          <div className="flex sm:hidden">
            <BiDollar className="text-xl font-bold text-text-primary mt-0.5" />
            <h4 className="text-base font-bold sm:text-xl text-text-primary">{contractData.price_at_booking ?? 0}</h4>
          </div>
        </div>
        <div className="items-center hidden space-x-2 sm:flex">
          {contractData.solution.is_metered ? (
            statuses.map((status, index) => {
              if (index === statusIndex - 1) {
                return (
                  <span className={clsx(status.selectedClassName, ' self-start')} key={`status${index}`}>
                    {makeTitle(status.name)}
                  </span>
                )
              }
              return <></>
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
        {(contractData?.metered_booking_info?.collection_method || nextPaymentDate) && (
          <div className="bg-red-400 md:flex">
            {nextPaymentDate && <b className="mr-2">Next Payment Date:</b>}

            {contractData?.metered_booking_info?.billing_cycle_anchor ? (
              contractData?.metered_booking_info?.collection_method ? (
                <span className="ml-2">
                  {contractData?.metered_booking_info?.collection_method === 'charge_automatically'
                    ? 'We will charge your payment automatically.'
                    : 'We will send an invoice'}
                </span>
              ) : null
            ) : null}
          </div>
        )}
        {contractData.solution.eta_days && (
          <div className="inline md:flex">
            <span className="w-full">
              <b className="mr-2">Provider Notes :</b>
              {contractData.provider_notes ??
                `Estimated time for completion is ${contractData.solution.eta_days} business days.`}
            </span>
          </div>
        )}
        {contractData.solution.description && (
          <div id="solutions-overview" className="flex flex-col">
            <a href="#solutions-overview">
              <h4 className="pb-2 font-bold text-black text-md">Overview :</h4>
            </a>
            <div>
              <Markdown value={contractData.solution.description} renderer={renderer} />
            </div>
          </div>
        )}
        {contractData.solution.scope_of_work && (
          <div style={{ scrollMarginTop: '3rem' }} id="solutions-scope" className="flex flex-col">
            <a href="#solutions-scope">
              <h4 className="pb-2 font-bold text-black text-md">Scope of Contract :</h4>
            </a>
            <div>
              <Markdown value={contractData.solution.scope_of_work} renderer={renderer} />
            </div>
          </div>
        )}
        {contractData.solution.questions
          ? contractData.solution.questions.length > 0 && (
              <div style={{ scrollMarginTop: '3rem' }} id="solutions-faq" className="py-4">
                <SolutionFAQ questions={contractData.solution.questions} solutionSlug={contractData.solution.slug} />
              </div>
            )
          : null}

        {contractData.solution.type === 'C' && contractData.solution?.consultation_scheduling_link && (
          <div className="flex w-full md:flex">
            <a className="" href={contractData.solution?.consultation_scheduling_link} target="_blank" rel="noreferrer">
              <Button buttonType="primary" className="my-2 md:h-12">
                Book your consultation slot
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export const ContractDetail = ContractDetailComponent
