import React from 'react'
import Link from 'next/link'
import { BiDollar } from 'react-icons/bi'
import Markdown from 'marked-react'
import Lowlight from 'react-lowlight'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import javascript from 'highlight.js/lib/languages/javascript'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { solutionContract } from '../../types/contracts'
import style from '../solution-detail-introduction/style.module.scss'
import { SolutionFAQ } from '../solution-detail-introduction'

Lowlight.registerLanguage('js', javascript)

const renderer = {
  code: (snippet, lang) => {
    return <Lowlight language={lang} value={snippet} />
  },
}

type ContractDetailProps = {
  contractData: solutionContract
}

function ContractDetailComponent({ contractData }: ContractDetailProps) {
  const statuses = [
    {
      name: 'Pending',
      defaultClassName: 'px-2 py-1 text-sm text-primary border rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm text-white border rounded-xl border-primary bg-primary',
    },
    {
      name: 'In Progress',
      defaultClassName: 'px-2 py-1 text-sm text-primary border rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm text-white border rounded-xl border-primary bg-primary',
    },
    {
      name: 'In Review',
      defaultClassName: 'px-2 py-1 text-sm border text-primary rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm border text-white rounded-xl border-primary bg-primary',
    },
    {
      name: 'Completed',
      defaultClassName: 'px-2 py-1 text-sm border text-primary rounded-xl border-primary',
      selectedClassName: 'px-2 py-1 text-sm border text-white rounded-xl border-primary bg-primary',
    },
  ]

  let statusIndex = 1
  statuses.forEach((status, index) => {
    if (status.name === contractData.status) statusIndex = index + 1
  })

  const startedDate = contractData.started_at ? new Date(contractData.started_at).toISOString().split('T')[0] : ''
  const updatedDate = new Date(contractData.updated ?? '').toISOString().split('T')[0]

  return (
    <div className="flex flex-col mt-6">
      <Breadcrumbs separator={<MdOutlineKeyboardArrowRight className="text-sm" />} aria-label="breadcrumb">
        {statuses.map((status, index) => {
          if (index <= statusIndex - 1) {
            return (
              <span className={status.selectedClassName} key={index}>
                {status.name}
              </span>
            )
          } else {
            return (
              <span className={status.defaultClassName} key={index}>
                {status.name}
              </span>
            )
          }
        })}
      </Breadcrumbs>
      <div className="flex my-4 justify-between">
        <Link href={`/solution/${contractData.solution.slug}`} passHref>
          <a>
            <h2 className="text-xl font-bold hover:underline cursor-pointer">{contractData.solution.title}</h2>
          </a>
        </Link>
        <div className="flex">
          <BiDollar className="text-2xl font-bold text-text-primary mt-0.5" />
          <h4 className="text-xl font-bold text-text-primary">{contractData.price_at_booking ?? 0}</h4>
        </div>
      </div>
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
      <div className="flex my-4">
        <span className="w-full">
          <b className="mr-2">Started at:</b> {startedDate || 'Not started yet...'}
        </span>
        {startedDate ? (
          <span className="w-full">
            <b className="mr-2">Updated at:</b> {updatedDate}
          </span>
        ) : null}
      </div>
      <div className="flex">
        <span className="w-full">
          <b className="mr-2">Provider Notes:</b>{' '}
          {contractData.provider_notes ??
            `Estimated time to completion is ${contractData.solution.eta_days} business days.`}
        </span>
      </div>
      {contractData.solution.type === 'C' && (
        <div className="flex mt-4">
          <span className="flex flexw-full">
            <b className="mr-2">Consultation Link:</b>{' '}
            {contractData.solution?.consultation_scheduling_link && (
              <a href={contractData.solution?.consultation_scheduling_link} target="_blank" rel="noreferrer">
                {contractData.solution?.consultation_scheduling_link}
              </a>
            )}
          </span>
        </div>
      )}
      <div className="flex flex-col p-4 md:p-0">
        <div id="solutions-overview" className="flex flex-col pt-2 md:pt-6">
          <a href="#solutions-overview">
            <h4 className="font-bold text-black text-md">Overview</h4>
          </a>
          <div className={style.unsetTailwind}>
            <Markdown value={contractData.solution.description} renderer={renderer} />
          </div>
        </div>
        <div style={{ scrollMarginTop: '3rem' }} id="solutions-scope" className="flex flex-col pt-2 md:pt-6">
          <a href="#solutions-scope">
            <h4 className="font-bold text-black text-md">Scope of Work</h4>
          </a>
          <div className={style.unsetTailwind}>
            <Markdown value={contractData.solution.scope_of_work} renderer={renderer} />
          </div>
        </div>
        {contractData.solution.questions
          ? contractData.solution.questions.length > 0 && (
              <div style={{ scrollMarginTop: '3rem' }} id="solutions-faq" className="py-4">
                <SolutionFAQ questions={contractData.solution.questions} solutionSlug={contractData.solution.slug} />
              </div>
            )
          : null}
      </div>
    </div>
  )
}

export const ContractDetail = ContractDetailComponent
