import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { fetchService } from '../../queries/service'
import { ServiceDetailCard } from '../../components/service-card'
import { Asset } from '../../types/asset'

export default function Service() {
  const { query } = useRouter()
  const { slug } = query as { slug: string }
  // @TODO: Use isLoading, error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, data, error } = useQuery(['services', slug], () => fetchService(slug))

  return (
    <div className="min-h-full p-4 bg-background-light">
      <div className="max-w-screen-lg mx-auto">
        <ServiceDetailCard service={data as Asset} />
        <pre>
          <code className="text-xs whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    </div>
  )
}
