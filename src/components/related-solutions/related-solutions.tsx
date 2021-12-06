import React from 'react'
import { Asset } from '@taggedweb/types/asset'
import { ServiceCollapse } from '../collapse'
import { SolutionListingCard } from '../solution-listing-card'

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
          {service.solutions.map((solution, key) => (
            <SolutionListingCard key={`desktopSeviceList${key}`} listingData={solution} />
          ))}
        </ServiceCollapse>
      </div>
      <div className={`block md:hidden ${mobileClassName}`}>
        {service.solutions.map((solution, key) => (
          <SolutionListingCard key={`desktopSeviceList${key}`} listingData={solution} />
        ))}
      </div>
    </>
  )
}

export const RelatedSolutions = RelatedSolutionsComponent
