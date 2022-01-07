import React from 'react'
import Link from 'next/link'
import { useProfile } from '@taggedweb/hooks/use-profile'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Profile } from '@taggedweb/types/profile'
import { Breadcrumb } from '@taggedweb/components/breadcrumb'
import { SolutionListingCard } from '@taggedweb/components/solution-listing-card'

export default function BookmarkedSolutionsList() {
  const profile = useProfile()
  const solutionsList = profile && profile.bookmarked_solutions
  const breadcrumbData = [
    {
      name: 'Search',
      url: `${process.env.SITE_BASE_URL}/`,
      is_selected: false,
    },
    {
      name: 'Profile',
      url: `${process.env.SITE_BASE_URL}/profile/`,
      is_selected: false,
    },
    {
      name: 'Bookmarked Solutions',
      url: '#',
      is_selected: true,
    },
  ]
  const copyUrl = process.env.SITE_BASE_URL + '/profile/bookmarked-solutions'

  return (
    <div className="flex flex-col w-3/4 mx-auto xl:w-1/2 my-4 lg:my-8 min-h-[50%]">
      <Breadcrumb breadcrumbs={breadcrumbData} copyUrl={copyUrl} />
      <p className="my-2 text-lg font-bold">Bookmarked Solutions</p>
      <div className="w-full mb-4">
        {solutionsList && solutionsList.length === 0 && (
          <p className="text-center">
            No Bookmarked Solutions yet... Explore some solutions{' '}
            <Link href="/">
              <a className="underline">here</a>
            </Link>
          </p>
        )}
        {solutionsList &&
          solutionsList.map((solution, index) => {
            if (typeof solution === 'undefined') return null
            else return <SolutionListingCard key={`bookmarked-solution-${index}`} listingData={solution.solution} />
          })}
      </div>
    </div>
  )
}
