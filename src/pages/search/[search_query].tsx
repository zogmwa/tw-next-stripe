import React from 'react'
import { useRouter } from 'next/router'
import { ServiceCard } from '../../components/service-card'
import { clientWithRetries } from '../../utils/clientWithRetries'
import { SearchBar } from '../../components/search-bar'
import { Asset } from '../../types/asset'

export const getServerSideProps = async (context: { query: { search_query: string } }) => {
  const tags = context.query.search_query
  const { data } = await clientWithRetries.get<{ results: Asset[] }>(`/assets/?q=${tags}`)
  const defaultArr = tags.split(',').map((tag) => ({ value: tag, label: tag }))
  return {
    props: { services: data.results, defaultArr },
  }
}

type ServiceListProps = {
  services: Asset[]
  defaultArr: { value: string; label: string }[]
}

export default function ServiceList({ services, defaultArr }: ServiceListProps) {
  const router = useRouter()
  return (
    <div className="max-w-screen-lg px-4 mx-auto my-20">
      <SearchBar
        className="mb-8"
        tagsArr={defaultArr}
        onSubmit={(selectedTag) => {
          router.push(`/search/${selectedTag}`)
        }}
      />
      <div className="text-xl font-medium text-text-primary">Products</div>
      <div className="px-2 border rounded-md">
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
    </div>
  )
}
