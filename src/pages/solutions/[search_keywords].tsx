import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import { client } from '@taggedweb/utils/client'
import { fetchSolutionList } from '@taggedweb/solution-queries/fetch-solution-list'
import { withSessionSSR } from '@taggedweb/utils/session'
import { SolutionListingCard } from '@taggedweb/components/solution-listing-card'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    query: { search_keywords },
  } = context

  const SplitTheString = (url) => {
    if (url != null) {
      const SplitChars = '--'
      return url.split(SplitChars)
    }
  }

  let solutionData
  let defaultUrl
  try {
    const keywords = SplitTheString(search_keywords)
    defaultUrl = '?q=' + keywords.join('&q=')
    const sendUrl = `${defaultUrl}&page=1&offest=0&limit=20`
    solutionData = await fetchSolutionList(context.req.session, sendUrl)
  } catch (error) {
    // eslint-disable-next-line
    // TODO: Redirect to solution search page.
  }
  return {
    props: { solutionData, defaultUrl },
  }
})

export default function SolutionList({ solutionData, defaultUrl }) {
  const [page, setPage] = useState(1)
  const [pageLen, setPageLen] = useState(20)
  const [pageCount, setPageCount] = useState(Math.ceil(solutionData.count / pageLen))
  const [solutionList, setSolutionList] = useState(solutionData.results)

  const handlePagination = async (event, pageValue) => {
    const offset = (page - 1) * pageLen
    const sendUrl = `${defaultUrl}&page=${page}&offset=${offset}&limit=${pageLen}`
    try {
      const { data } = await client.get(`/solutions/search${sendUrl}`)
      setPage(pageValue)
      setSolutionList(data.results)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col p-2">
        {solutionList.map((solution) => (
          <SolutionListingCard listingData={solution} key={solution.slug} />
        ))}
      </div>
      <div className="flex justify-end p-2">
        <Pagination page={page} count={pageCount} onChange={handlePagination} />
      </div>
    </div>
  )
}
