import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Pagination from '@mui/material/Pagination'
import { ServiceCard } from '@taggedweb/components/service-card'
import {
  SortServiceList,
  MobileViewSortAndFilterServiceList,
  FilterServiceList,
} from '@taggedweb/components/service-list-filter'
import { serverSideClientWithRetries } from '@taggedweb/utils/clientWithRetries'
import { SearchBar } from '@taggedweb/components/search-bar'
import { Asset } from '@taggedweb/types/asset'
import { CompareAccordian } from '@taggedweb/components/compare-accordian'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'
import { unslugify } from '@taggedweb/utils/unslugify'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (
  context: {
    query: { search_query: string; page: string; order: string; free_trial: string }
  } & GetServerSidePropsContext,
) => {
  const tags = context.query.search_query
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
  let query = `q=${tags}&offset=${offset}&limit=10`
  if (order) {
    query = `ordering=${order}&` + query
  }
  if (free_trial) {
    query = query + `&has_free_trial=${free_trial}`
  }
  const { data } = await serverSideClientWithRetries(context.req).get<{ results: Asset[]; count: string }>(
    `/assets/?${query}`,
  )
  const totalCount = parseInt(data.count)
  const pageCount = totalCount % 10 === 0 ? totalCount / 10 : Math.floor(totalCount / 10) + 1
  const defaultArr = tags.split(',').map((tag) => ({ value: tag, label: tag }))

  return {
    props: {
      services: data.results,
      defaultArr,
      tags,
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
  tags: string
  pageCount: number
  totalCount: number
  order: string
  free_trial: string
}

export default function ServiceList({
  services,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultArr,
  tags,
  currentPage = 1,
  pageCount,
  totalCount,
  order = '',
  free_trial = '',
}: ServiceListProps) {
  const router = useRouter()
  let preCheckedList: { name: string; slug: string; logo_url: string }[] = []
  const [checkedList, setCheckedList] = useState(preCheckedList)

  const pageRef = useRef(null)
  useEffect(() => {
    preCheckedList = JSON.parse(localStorage.getItem('taggedweb-service-checklist'))
    if (!preCheckedList) {
      setCheckedList([])
    } else {
      setCheckedList(preCheckedList)
    }
    if (pageRef.current) {
      pageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      })
    }
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
    let query = `/softwares/${tags}?page=${value}`
    if (order) {
      query += `&order=${order}`
    }
    if (free_trial) {
      query += `&free_trial=${free_trial}`
    }

    router.push(query)
  }

  const capTags = tags.split(',').map((tag) => {
    return unslugify(tag)
  })

  const [error, setError] = useState('')
  useEffect(() => {
    if (services.length === 0) {
      setError('No Results Found. Try Again with tags of interest, e.g. investing, artificial-intelligence')
    } else {
      setError('')
    }
  }, [services])
  return (
    <>
      <DynamicHeader
        title={`Best ${capTags.join(', ')} Software Services in ${new Date().getFullYear()} | TaggedWeb`}
        description={`Top ${capTags.join(', ')} Software Services in ${new Date().getFullYear()}`}
      />
      <div className="max-w-screen-lg px-2 mx-auto my-20" ref={pageRef}>
        <SearchBar
          className="mb-8"
          forSoftware={true}
          onSubmit={(selectedTag) => {
            router.push(`/softwares/${selectedTag}`)
          }}
        />
        <>
          <div className="flex flex-row space-x-2">
            <div className="hidden w-1/4 space-y-4 md:flex md:flex-col">
              <div className="border rounded">
                <SortServiceList
                  defaultValue={order}
                  onChange={(value) => {
                    let query = `/softwares/${tags}`
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
                    let query = `/softwares/${tags}`
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
                <h1 className="text-xl font-medium text-text-primary">
                  Software tagged with {tags.split(',').join(', ')}
                </h1>
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-sm text-text-secondary">
                    {totalCount} {totalCount === 1 ? 'software' : 'software options'}
                  </div>
                  <div className="md:hidden">
                    <MobileViewSortAndFilterServiceList
                      defaultSortValue={order}
                      onSortChange={(value) => {
                        let query = `/softwares/${tags}`
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
                        let query = `/softwares/${tags}`
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
              {error && <div className="text-sm font-medium text-center text-red-500">{error}</div>}
              {!error && (
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
                  <CompareAccordian checkedList={checkedList} onServiceRemove={handleServiceRemove} />
                </div>
              )}
            </div>
          </div>
          {!error && (
            <div className="flex justify-end">
              {pageCount > 1 && <Pagination page={currentPage} count={pageCount} onChange={handlePagination} />}
            </div>
          )}
        </>
      </div>
    </>
  )
}
