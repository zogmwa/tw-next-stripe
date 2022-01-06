import React from 'react'
import { BiDollar } from 'react-icons/bi'
import Markdown from 'marked-react'
import Lowlight from 'react-lowlight'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import javascript from 'highlight.js/lib/languages/javascript'
import { useRouter } from 'next/router'
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
  const router = useRouter()
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
        <h2
          className="text-xl font-bold hover:underline cursor-pointer"
          onClick={() => {
            router.push(`/solution/${contractData.solution.slug}`)
          }}
        >
          {contractData.solution.title}
        </h2>
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
          <b className="mr-2">Started at:</b> {startedDate ? startedDate : 'Not started yet...'}
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
          {contractData.provider_notes ?? `It will tasks ${contractData.solution.eta_days} business days.`}
        </span>
      </div>
      {contractData.solution.type === 'C' && (
        <div className="flex mt-4">
          <span className="flex flexw-full">
            <b className="mr-2">Consultation Link:</b>{' '}
            {contractData.solution?.consultation_scheduling_link ? (
              <a href={contractData.solution?.consultation_scheduling_link} target="_blank">
                {contractData.solution?.consultation_scheduling_link}
              </a>
            ) : (
              'No scheduled yet...'
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
        {contractData.solution.questions.length > 0 && (
          <div style={{ scrollMarginTop: '3rem' }} id="solutions-faq" className="py-4">
            <SolutionFAQ questions={contractData.solution.questions} solutionSlug={contractData.solution.slug} />
          </div>
        )}
      </div>
    </div>
  )
}

export const ContractDetail = ContractDetailComponent
