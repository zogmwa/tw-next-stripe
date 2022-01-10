/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
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
import { DynamicHeader } from '@taggedweb/components/dynamic-header'
import { unslugify } from '@taggedweb/utils/unslugify'
import * as Sentry from '@sentry/nextjs'
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

  let solutionData, defaultUrl, keywords, pageTitle
  try {
    pageTitle = unslugify(String(search_keywords))
    keywords = SplitTheString(search_keywords)
    defaultUrl = '?q=' + keywords.join('&q=')
    const sendUrl = `${defaultUrl}&page=1&offest=0&limit=20`
    solutionData = await fetchSolutionList(context.req.session, sendUrl)
  } catch (error) {
    Sentry.captureException(error)
    // eslint-disable-next-line
    // TODO: Redirect to solution search page.
  }
  return {
    props: { solutionData, defaultUrl, pageTitle },
  }
})

export default function SolutionList({ solutionData, defaultUrl, pageTitle }) {
  if (typeof solutionData.results === 'undefined') return null

  const [page, setPage] = useState(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageLen, setPageLen] = useState(20)
  const [pageCount, setPageCount] = useState(Math.ceil(solutionData.count / pageLen))
  const [solutionList, setSolutionList] = useState(solutionData.results)
  const [ordering, setOrdering] = useState('')
  const [filtering, setFiltering] = useState('')
  const [minPriceFilter, setMinPriceFilter] = useState('')
  const [maxPriceFilter, setMaxPriceFilter] = useState('')
  const [showClearFilter, setShowClearFilter] = useState(false)

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
      Sentry.captureException(error)
      // eslint-disable-next-line
      console.log(error)
    }
  }

  const handlePagination = (event, pageValue) => {
    setPage(pageValue)
    const offset = (pageValue - 1) * pageLen
    const sendUrl =
      `${defaultUrl}&page=${page}&offset=${offset}&limit=${pageLen}` +
      (ordering ? `&ordering=${ordering}` : '') +
      (minPriceFilter ? `&pay_now_price__unit_amount__gte=${minPriceFilter}` : '') +
      (maxPriceFilter ? `&pay_now_price__unit_amount__lte=${maxPriceFilter}` : '') +
      (filtering ? `&has_free_consultation=${filtering}` : '')
    fetchSolutionList(sendUrl)
  }

  const orderingSolution = (orderValue) => {
    setOrdering(orderValue)
    const offset = (page - 1) * pageLen
    const sendUrl =
      `${defaultUrl}&page=${page}&offset=${offset}&limit=${pageLen}` +
      (orderValue ? `&ordering=${orderValue}` : '') +
      (minPriceFilter ? `&pay_now_price__unit_amount__gte=${minPriceFilter}` : '') +
      (maxPriceFilter ? `&pay_now_price__unit_amount__lte=${maxPriceFilter}` : '') +
      (filtering ? `&has_free_consultation=${filtering}` : '')
    fetchSolutionList(sendUrl)
  }

  const filterSolution = (filterValue) => {
    setFiltering(filterValue)
    const offset = (page - 1) * pageLen
    const sendUrl =
      `${defaultUrl}&page=${page}&offset=${offset}&limit=${pageLen}` +
      (ordering ? `&ordering=${ordering}` : '') +
      (minPriceFilter ? `&pay_now_price__unit_amount__gte=${minPriceFilter}` : '') +
      (maxPriceFilter ? `&pay_now_price__unit_amount__lte=${maxPriceFilter}` : '') +
      (filterValue ? `&has_free_consultation=${filterValue}` : '')

    fetchSolutionList(sendUrl)
  }

  const filterByPrice = (minPrice, maxPrice) => {
    minPrice = minPrice ? minPrice * 100 : ''
    maxPrice = maxPrice ? maxPrice * 100 : ''
    setMinPriceFilter(minPrice)
    setMaxPriceFilter(maxPrice)

    const offset = (page - 1) * pageLen
    const sendUrl =
      `${defaultUrl}&page=${page}&offset=${offset}&limit=${pageLen}` +
      (ordering ? `&ordering=${ordering}` : '') +
      (minPrice ? `&pay_now_price__unit_amount__gte=${minPrice}` : '') +
      (maxPrice ? `&pay_now_price__unit_amount__lte=${maxPrice}` : '') +
      (filtering ? `&has_free_consultation=${filtering}` : '')

    fetchSolutionList(sendUrl)
  }

  const clearAllPriceFilter = () => {
    setMinPriceFilter('')
    setMaxPriceFilter('')
    setFiltering('')
    if (minPriceFilter || maxPriceFilter || filtering) {
      const offset = (page - 1) * pageLen
      const sendUrl =
        `${defaultUrl}&page=${page}&offset=${offset}&limit=${pageLen}` + (ordering ? `&ordering=${ordering}` : '')
      fetchSolutionList(sendUrl)
    }
    setShowClearFilter(false)
  }

  const [error, setError] = useState('')
  useEffect(() => {
    if (solutionList.length === 0) {
      setError(
        'No Results Found. Try again or reach us out directly at contact@taggedweb.com with your problem statement.',
      )
    } else {
      setError('')
    }
  }, [solutionList])

  useEffect(() => {
    if (minPriceFilter || maxPriceFilter || filtering === 'true') {
      setShowClearFilter(true)
    } else {
      setShowClearFilter(false)
    }
  }, [minPriceFilter, maxPriceFilter, filtering])

  return (
    <>
      <DynamicHeader />
      <div className="flex max-w-screen-lg px-2 mx-auto my-10">
        <div className="flex-col hidden w-1/4 space-y-4 md:flex">
          <div className="border rounded">
            <SortServiceList onChange={orderingSolution} />{' '}
          </div>
          <div className="border rounded">
            <FilterServiceList
              onChange={filterSolution}
              filterByPrice={filterByPrice}
              showClearFilter={showClearFilter}
              clearAllPriceFilter={clearAllPriceFilter}
              label="Consultation"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between w-full p-2 md:w-3/4 md:ml-3">
          <h1 className="hidden text-xl font-bold text-black md:flex">All &#8220;{pageTitle}&#8221; Solutions</h1>
          <div className="flex items-center justify-between md:hidden">
            <h1 className="text-xl font-bold text-black">All &#8220;{pageTitle}&#8221; Solutions</h1>
            <MobileViewSortAndFilterServiceList
              onSortChange={orderingSolution}
              onFilterChange={filterSolution}
              filterByPrice={filterByPrice}
              showClearFilter={showClearFilter}
              clearAllPriceFilter={clearAllPriceFilter}
              filterLabel="Consultation"
            />
          </div>
          <h1 className="mt-4 text-xl font-medium text-text-primary">Tag Suggestions</h1>
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
          {error && <div className="font-medium text-center text-red-500">{error}</div>}
          {!error && (
            <div>
              <div className="flex flex-col">
                {solutionList.map((solution) => (
                  <SolutionListingCard listingData={solution} key={solution.slug} />
                ))}
              </div>
              <div className="flex justify-end p-2">
                <Pagination page={page} count={pageCount} onChange={handlePagination} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
