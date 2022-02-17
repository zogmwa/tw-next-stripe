import React, { useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import { useProfile } from '@taggedweb/hooks/use-profile'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Profile } from '@taggedweb/types/profile'
import { Breadcrumb } from '@taggedweb/components/breadcrumb'
import { SolutionListingCard } from '@taggedweb/components/solution-listing-card'
import { useUserContext } from '@taggedweb/hooks/use-user'
import Page404 from '@taggedweb/pages/404'

export default function BookmarkedSolutionsList() {
  const router = useRouter()
  const session = useUserContext()
  const { isLoggedIn } = session
  const profile = useProfile()
  const solutionsList = profile && profile.bookmarked_solutions
  const breadcrumbData = [
    {
      name: 'Home',
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
  useEffect(() => {
    const { pathname } = Router
    if (!session.isLoggedIn() && pathname === '/profile/bookmarked-solutions') {
      router.replace('/login')
    }
  }, [session, router])

  if (isLoggedIn()) {
    return (
      <div className="max-w-screen-lg px-2 py-10 mx-auto">
        <div className="flex flex-col">
          <Breadcrumb breadcrumbs={breadcrumbData} className="mb-4" copyUrl={copyUrl} />
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
      </div>
    )
  } else {
    return <Page404 />
  }
}
