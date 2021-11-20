import React, { useState } from 'react'
import Link from 'next/link'
import Pagination from '@mui/material/Pagination'
import { client } from '@taggedweb/utils/client'
import { fetchSolutionList } from '@taggedweb/solution-queries/fetch-solution-list'
import { withSessionSSR } from '@taggedweb/utils/session'
import { SolutionListingCard } from '@taggedweb/components/solution-listing-card'
import { SortServiceList } from '@taggedweb/components/service-list-filter/sort-list'
import { MobileViewSortAndFilterServiceList } from '@taggedweb/components/service-list-filter/mobile-view'
import { FilterServiceList } from '@taggedweb/components/service-list-filter/filter-list'
import { Button } from '@taggedweb/components/button'

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

  let solutionData, defaultUrl, keywords
  try {
    keywords = SplitTheString(search_keywords)
    defaultUrl = '?q=' + keywords.join('&q=')
    const sendUrl = `${defaultUrl}&page=1&offest=0&limit=20`
    solutionData = await fetchSolutionList(context.req.session, sendUrl)
  } catch (error) {
    // eslint-disable-next-line
    // TODO: Redirect to solution search page.
  }
  return {
    props: { solutionData, defaultUrl, keywords },
  }
})

export default function SolutionList({ solutionData, defaultUrl, keywords }) {
  if (typeof solutionData.results === 'undefined') return null

  const [page, setPage] = useState(1)
  const [pageLen, setPageLen] = useState(20)
  const [pageCount, setPageCount] = useState(Math.ceil(solutionData.count / pageLen))
  const [solutionList, setSolutionList] = useState(solutionData.results)
  const [ordering, setOrdering] = useState('')
  const [filtering, setFiltering] = useState('')
  const suggestionTags = []
  for (let i = 0; i < solutionData.results.length; i++) {
    if (solutionData.results[i].tags.length > 0) suggestionTags.push(...solutionData.results[i].tags)
    if (solutionData.results.primary_tag) suggestionTags.push(solutionData.results[i].primary_tag)
  }
  const showSuggestionTags = Array.from(new Set(suggestionTags)).slice(0, 10)

  const fetchSolutionList = async (sendUrl) => {
    try {
      const { data } = await client.get(`/solutions/${sendUrl}`)
      setPageCount(Math.ceil(solutionData.count / pageLen))
      setSolutionList(data.results)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  const handlePagination = async (event, pageValue) => {
    setPage(pageValue)
    const offset = (pageValue - 1) * pageLen
    const sendUrl =
      `${defaultUrl}&page=${page}&offset=${offset}&limit=${pageLen}` +
      (ordering ? `&ordering=${ordering}` : '') +
      (filtering ? `&has_free_trial=${filtering}` : '')
    fetchSolutionList(sendUrl)
  }

  const orderingSolution = async (orderValue) => {
    setOrdering(orderValue)
    const offset = (page - 1) * pageLen
    const sendUrl =
      `${defaultUrl}&page=${page}&offset=${offset}&limit=${pageLen}` +
      (orderValue ? `&ordering=${orderValue}` : '') +
      (filtering ? `&has_free_trial=${filtering}` : '')
    fetchSolutionList(sendUrl)
  }

  const filterSolution = async (filterValue) => {
    setFiltering(filterValue)
    const offset = (page - 1) * pageLen
    const sendUrl =
      `${defaultUrl}&page=${page}&offset=${offset}&limit=${pageLen}` +
      (ordering ? `&ordering=${ordering}` : '') +
      (filterValue ? `&has_free_trial=${filterValue}` : '')
    fetchSolutionList(sendUrl)
  }

  return (
    <div className="flex justify-center">
      <div className="flex max-w-screen-lg pt-4">
        <div className="hidden md:flex flex-col border border-solid divide-y rounded-md border-border-default divide-solid divide-border-default w-[20rem]">
          <SortServiceList onChange={orderingSolution} />
          <FilterServiceList onChange={filterSolution} />
        </div>
        <div className="flex flex-col justify-between w-full p-2 md:ml-6">
          <h1 className="hidden text-xl font-bold md:flex text-text-primary">
            {keywords.map((keyword) => keyword[0].toUpperCase() + keyword.slice(1).toLowerCase()).join(' ')}
          </h1>
          <div className="flex items-center justify-between md:hidden">
            <h1 className="text-xl font-bold text-text-primary">
              {keywords.map((keyword) => keyword[0].toUpperCase() + keyword.slice(1).toLowerCase()).join(' ')}
            </h1>
            <MobileViewSortAndFilterServiceList onSortChange={orderingSolution} onFilterChange={filterSolution} />
          </div>
          <h1 className="mt-4 text-xl font-bold text-text-primary">Tag Suggestions</h1>
          <div className="flex flex-row flex-wrap my-2">
            {showSuggestionTags.map((tag) => {
              return (
                <Link key={tag.slug} prefetch={false} href={'../solutions/' + tag.slug}>
                  <a className="inline-flex mt-2 mr-2">
                    <Button buttonType="tag" size="small" className="mr-1">
                      {tag.name}
                    </Button>
                  </a>
                </Link>
              )
            })}
          </div>
          <div className="flex flex-col">
            {solutionList.map((solution) => (
              <SolutionListingCard listingData={solution} key={solution.slug} />
            ))}
          </div>
          <div className="flex justify-end p-2">
            <Pagination page={page} count={pageCount} onChange={handlePagination} />
          </div>
        </div>
      </div>
    </div>
  )
}
