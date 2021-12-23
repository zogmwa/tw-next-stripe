import React from 'react'
import Link from 'next/link'

export const BookmarkedSolutionsProfile = ({ data }) => {
  return (
    <Link href="profile/bookmarked-solutions">
      <div id="bookmarked-solutions" className="mb-8 border-b border-gray-300 cursor-pointer md:flex">
        <p className="text-base font-bold">Bookmarked Solutions</p>
        <span className="ml-auto">{`${data?.bookmarked_solutions.length ?? 0} Product(s)`}</span>
        {/* <span className="ml-auto">{`${pendingAssets?.length ?? 0} Product(s)`}</span> */}
      </div>
      {/* <div id="bookmarked-solutions" className="mb-8 border border-gray-300 rounded cursor-pointer">
        <p className="text-base font-bold "></p>
      </div> */}
    </Link>
  )
}
