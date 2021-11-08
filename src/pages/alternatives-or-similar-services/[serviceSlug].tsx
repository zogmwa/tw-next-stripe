import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Pagination from '@mui/material/Pagination'
import { ServiceCard } from '../../components/service-card'
import {
  SortServiceList,
  MobileViewSortAndFilterServiceList,
  FilterServiceList,
} from '../../components/service-list-filter'
import { clientWithRetries } from '../../utils/clientWithRetries'
import { SearchBar } from '../../components/search-bar'
import { Asset } from '../../types/asset'
import { unslugify } from '../../utils/unslugify'
import { CompareAccordian } from '../../components/compare-accordian'

export const getServerSideProps = async (context: {
  query: { serviceSlug: string; page: string; order: string; free_trial: string }
}) => {
  const slug = context.query.serviceSlug
  const name = unslugify(slug)
  const pg = context.query.page
  const order = context.query.order ? context.query.order : ''
  const free_trial = context.query.free_trial ? context.query.free_trial : ''
  let page: number
  if (pg) {
    page = parseInt(pg) - 1
  } else {
    page = 0
  }
  const offset = page * 10
  let query = `slug=${slug}&offset=${offset}&limit=10`
  if (order) {
    query = `ordering=${order}&` + query
  }
  if (free_trial) {
    query = query + `&has_free_trial=${free_trial}`
  }
  const { data } = await clientWithRetries.get<{ results: Asset[]; count: string }>(`/assets/similar/?${query}`)
  const totalCount = parseInt(data.count)
  const pageCount = totalCount % 10 === 0 ? totalCount / 10 : Math.floor(totalCount / 10) + 1
  const defaultArr = []
  return {
    props: {
      services: data.results,
      defaultArr,
      slug,
      name,
      currentPage: page + 1,
      pageCount,
      totalCount,
      order,
      free_trial,
    },
  }
}

type ServiceListProps = {
  services: Asset[]
  defaultArr: { value: string; label: string }[]
  currentPage: number
  slug: string
  name: string
  pageCount: number
  totalCount: number
  order: string
  free_trial: string
}

export default function ServiceList({
  services,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultArr = [],
  slug,
  name,
  currentPage = 1,
  pageCount,
  totalCount,
  order = '',
  free_trial = '',
}: ServiceListProps) {
  const router = useRouter()
  let preCheckedList: { name: string; slug: string; logo_url: string }[] = []
  const [checkedList, setCheckedList] = useState(preCheckedList)
  useEffect(() => {
    preCheckedList = JSON.parse(localStorage.getItem('taggedweb-service-checklist'))
    if (!preCheckedList) {
      setCheckedList([])
    } else {
      setCheckedList(preCheckedList)
    }
    // console.log('test')
  }, [])
  const notInitialRender = useRef(false)
  useEffect(() => {
    const tempCheckedList = checkedList
    if (notInitialRender.current) {
      localStorage.setItem('taggedweb-service-checklist', JSON.stringify(tempCheckedList))
    } else {
      notInitialRender.current = true
    }
  }, [checkedList])
  const handleChecked = (isCompared: boolean, service: Asset) => {
    const List = checkedList
    if (isCompared) {
      // List.push({ name: service.name, slug: service.slug, logo_url: service.logo_url })
      setCheckedList([...List, { name: service.name, slug: service.slug, logo_url: service.logo_url }])
    } else {
      setCheckedList(List.filter((item) => item.slug !== service.slug))
    }
  }
  const handleServiceRemove = (list) => {
    setCheckedList(list)
  }
  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    let query = `/alternatives-or-similar-services/${slug}?page=${value}`
    if (order) {
      query += `&order=${order}`
    }
    if (free_trial) {
      query += `&free_trial=${free_trial}`
    }
    router.push(query)
  }

  const pageRef = useRef(null)
  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      })
    }
  }, [])

  const [error, setError] = useState('')
  useEffect(() => {
    if (services.length === 0) {
      setError('No Results Found. Try Again with tags of interest, e.g. investing, artificial-intelligence')
    } else {
      setError('')
    }
  }, [services])
  return (
    <div className="max-w-screen-lg px-4 mx-auto my-20" ref={pageRef}>
      <SearchBar
        className="mb-8"
        onSubmit={(selectedTag) => {
          router.push(`/search/${selectedTag}`)
        }}
      />
      {error && <div className="font-medium text-center text-red-500">{error}</div>}
      {!error && (
        <div className="flex flex-row space-x-2">
          <div className="hidden w-1/4 space-y-4 md:flex md:flex-col">
            <div className="border rounded">
              <SortServiceList
                defaultValue={order}
                onChange={(value) => {
                  let query = `/alternatives-or-similar-services/${slug}`
                  if (value) {
                    query += `?order=${value}`
                    if (free_trial) {
                      query += `&free_trial=${free_trial}`
                    }
                  } else {
                    if (free_trial) {
                      query += `?free_trial=${free_trial}`
                    }
                  }
                  router.push(query)
                }}
              />
            </div>
            <div className="border rounded">
              <FilterServiceList
                defaultValue={free_trial}
                onChange={(value) => {
                  let query = `/alternatives-or-similar-services/${slug}`
                  if (value) {
                    query += `?free_trial=${value}`
                    if (order) {
                      query += `&order=${order}`
                    }
                  } else {
                    if (order) {
                      query += `?order=${order}`
                    }
                  }
                  router.push(query)
                }}
              />
            </div>
          </div>
          <div className="md:w-3/4">
            <div className="flex justify-between mb-2">
              <div className="text-xl font-medium text-text-primary">Products similar to {name}</div>
              <div className="flex items-center justify-center space-x-4">
                <div className="text-sm text-text-secondary">
                  {totalCount} {totalCount === 1 ? 'product' : 'products'}
                </div>
                <div className="md:hidden">
                  <MobileViewSortAndFilterServiceList
                    defaultSortValue={order}
                    onSortChange={(value) => {
                      let query = `/alternatives-or-similar-services/${slug}`
                      if (value) {
                        query += `?order=${value}`
                        if (free_trial) {
                          query += `&free_trial=${free_trial}`
                        }
                      } else {
                        if (free_trial) {
                          query += `&free_trial=${free_trial}`
                        }
                      }
                      router.push(query)
                    }}
                    defaultFilterValue={free_trial}
                    onFilterChange={(value) => {
                      let query = `/alternatives-or-similar-services/${slug}?name=${name}`
                      if (value) {
                        query += `?free_trial=${value}`
                        if (order) {
                          query += `&order=${order}`
                        }
                      } else {
                        if (order) {
                          query += `?order=${order}`
                        }
                      }
                      router.push(query)
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="max-w-full px-2 mb-2 border rounded-md">
              <ul className="flex flex-col justify-start pb-8 divide-y divide">
                {services.map((service, index) => {
                  const isChecked = !!checkedList.find((item) => item.slug === service.slug)
                  return (
                    <li
                      key={index}
                      className="max-w-full mt-2 transition duration-500 ease-in-out bg-background-surface hover:bg-background-light"
                    >
                      <ServiceCard service={service} onToggleCompare={handleChecked} isChecked={isChecked} />
                    </li>
                  )
                })}
              </ul>
            </div>
            <CompareAccordian checkedList={checkedList} onServiceRemove={handleServiceRemove} />
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <Pagination page={currentPage} count={pageCount} onChange={handlePagination} />
      </div>
    </div>
  )
}
