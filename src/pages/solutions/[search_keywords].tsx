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
import { Modal } from '@taggedweb/components/Modal/modal'
import { Formik } from 'formik'
import { Textarea } from '@taggedweb/components/textarea'
import * as yup from 'yup'
import { Input } from '@taggedweb/components/input'
import toast from 'react-hot-toast'
import { submitUserProblems } from '@taggedweb/queries/service'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { useRouter } from 'next/router'

const UserProblemFormSchema = yup.object().shape({
  email: yup.string().email().required('Please enter a valid email'),
  description: yup.string().required('Please share some details'),
})
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
    solutionData = await fetchSolutionList(context.req, sendUrl)
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
  const [isOpenUserProblemModal, setIsOpenUserProblemModal] = useState(false)
  const user = useUserContext()
  const { isLoggedIn } = useUserContext()
  const router = useRouter()
  const { search_keywords } = router?.query

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
  }

  const orderingSolution = (orderValue) => {
    setOrdering(orderValue)
  }

  const filterSolution = (filterValue) => {
    setFiltering(filterValue)
  }

  const filterByPrice = (minPrice, maxPrice) => {
    minPrice = minPrice ? minPrice * 100 : ''
    maxPrice = maxPrice ? maxPrice * 100 : ''
    setMinPriceFilter(minPrice)
    setMaxPriceFilter(maxPrice)
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
        'No results found. Please describe your problem below. (If you would like to partner with us on offering a solution, kindly reach out to us at contact@taggedweb.com)',
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

  useEffect(() => {
    const offset = (page - 1) * pageLen

    const sendUrl =
      `${defaultUrl}&page=${page}&offset=${offset}&limit=${pageLen}` +
      (ordering ? `&ordering=${ordering}` : '') +
      (minPriceFilter ? `&stripe_primary_price__unit_amount__gte=${minPriceFilter}` : '') +
      (maxPriceFilter ? `&stripe_primary_price__unit_amount__lte=${maxPriceFilter}` : '') +
      (filtering ? `&has_free_consultation=${filtering}` : '')

    fetchSolutionList(sendUrl)
  }, [page, ordering, minPriceFilter, maxPriceFilter, filtering])

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
                {pageCount > 1 && <Pagination page={page} count={pageCount} onChange={handlePagination} />}
              </div>
            </div>
          )}
          <div className="flex flex-col p-4 m-2 border border-solid rounded cursor-pointer border-border-default">
            <p>
              Couldn&apos;t find a listed solution for your problem? Please tell us about it. We&apos;d love to help.
            </p>
            <a
              href="#"
              id="userProblem"
              onClick={() => setIsOpenUserProblemModal(!isOpenUserProblemModal)}
              className="md:items-center md:cursor-pointer md:space-x-2"
            >
              <Button size="small">Describe your Problem</Button>
            </a>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpenUserProblemModal} setIsOpen={setIsOpenUserProblemModal}>
        <>
          <Formik
            initialValues={{ email: user?.email, description: '' }}
            validationSchema={UserProblemFormSchema}
            onSubmit={async (values) => {
              const data = isLoggedIn
                ? await submitUserProblems(String(search_keywords), user, values.description, values.email)
                : await submitUserProblems(String(search_keywords), null, values.description, values.email)
              if (data) {
                toast.success('Claim submitted for review.')
              }
              setIsOpenUserProblemModal(false)
            }}
          >
            {({ handleSubmit, values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <label className="block mb-2 text-sm text-text-primary" htmlFor="email">
                    Email Id
                  </label>
                  <Input
                    placeholder="Enter your email"
                    id="email"
                    className="mb-4"
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    errorMessage={touched.email ? errors.email : undefined}
                    success={touched.email && !errors.email}
                  />
                  {/* Keeping it for form Design reference */}
                  {/* <label className="block mb-2 text-sm text-text-primary" htmlFor="budget">
                    What is your budget for this service?
                  </label>
                  <Input
                    id="budget"
                    className="mb-4"
                    onChange={handleChange('budget')}
                    onBlur={handleBlur('budget')}
                    value={values.budget}
                    errorMessage={touched.budget ? errors.budget : undefined}
                    success={touched.budget && !errors.budget}
                  /> */}
                  <label className="block mb-2 text-sm text-text-primary" htmlFor="description">
                    What is the problem that you&apos;re looking to solve. Kindly be as descriptive as possible:
                  </label>
                  <Textarea
                    placeholder="I'm looking for a consultation with someone experienced with integrating and using XYZ Software, or setting up an email-marketing tool on my AWS account"
                    id=""
                    className="mb-4"
                    onChange={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                    errorMessage={touched.description ? errors.description : undefined}
                    success={touched.description && !errors.description}
                  />
                  <div className="flex items-center space-x-4">
                    <Button type="submit" buttonType="primary" loading={isSubmitting} disabled={isSubmitting}>
                      Submit
                    </Button>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </>
      </Modal>
    </>
  )
}
