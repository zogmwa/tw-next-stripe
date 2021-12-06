import React from 'react'
import { Asset } from '@taggedweb/types/asset'
import { ServiceCollapse } from '../collapse'
import { SolutionList } from './solution-list'

type RelatedSolutionsComponentProps = {
  service: Asset
  desktopClassName?: string
  mobileClassName?: string
}

function RelatedSolutionsComponent({ service, desktopClassName, mobileClassName }: RelatedSolutionsComponentProps) {
  if (typeof service === 'undefined') return null

  return (
    <>
      <div className={`hidden md:block ${desktopClassName}`}>
        <ServiceCollapse title="Related Solutions">
          <SolutionList solutions={service.solutions} />
        </ServiceCollapse>
      </div>
      <div className={`block md:hidden ${mobileClassName}`}>
        <SolutionList solutions={service.solutions} />
      </div>
    </>
  )
}

export const RelatedSolutions = RelatedSolutionsComponent
