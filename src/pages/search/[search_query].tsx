import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Pagination from '@mui/material/Pagination'
import { ServiceCard } from '../../components/service-card'
import { clientWithRetries } from '../../utils/clientWithRetries'
import { SearchBar } from '../../components/search-bar'
import { Asset } from '../../types/asset'

export const getServerSideProps = async (context: { query: { search_query: string; page: string } }) => {
  const tags = context.query.search_query
  const pg = context.query.page
  let page: number
  if (pg) {
    page = parseInt(pg) - 1
  } else {
    page = 0
  }
  const offset = page * 10
  const { data } = await clientWithRetries.get<{ results: Asset[]; count: string }>(
    `/assets/?q=${tags}&offset=${offset}&limit=10`,
  )
  let count = parseInt(data.count)
  count = count % 10 === 0 ? count / 10 : Math.floor(count / 10) + 1
  const defaultArr = tags.split(',').map((tag) => ({ value: tag, label: tag }))
  return {
    props: { services: data.results, defaultArr, tags, currentPage: page + 1, count },
  }
}

type ServiceListProps = {
  services: Asset[]
  defaultArr: { value: string; label: string }[]
  currentPage: number
  tags: string
  count: number
}

export default function ServiceList({ services, defaultArr, tags, currentPage = 1, count }: ServiceListProps) {
  const router = useRouter()
  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/search/${tags}?page=${value}`)
  }
  const [error, setError] = useState('')
  useEffect(() => {
    if (services.length === 0) {
      setError('No Results Found. Try Again with tags of interest, e.g. investing, artificial-intelligence')
    } else {
      setError('')
    }
  }, [services])
  return (
    <div className="max-w-screen-lg px-4 mx-auto my-20">
      <SearchBar
        className="mb-8"
        tagsArr={defaultArr}
        onSubmit={(selectedTag) => {
          router.push(`/search/${selectedTag}`)
        }}
      />
      <div className="mb-2 text-xl font-medium text-text-primary">Products</div>
      {error && <div className="font-medium text-center text-red-500">{error}</div>}
      {!error && (
        <div className="px-2 mb-2 border rounded-md">
          <ul className="flex flex-col justify-start pb-8 divide-y divide">
            {services.map((service, index) => (
              <li
                key={index}
                className="max-w-full mt-2 transition duration-500 ease-in-out bg-background-surface hover:bg-background-light"
              >
                <ServiceCard
                  service={service}
                  onToggleCompare={(isCompared) => {
                    // eslint-disable-next-line no-console
                    console.log(isCompared)
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-end">
        <Pagination page={currentPage} count={count} onChange={handlePagination} />
      </div>
    </div>
  )
}
