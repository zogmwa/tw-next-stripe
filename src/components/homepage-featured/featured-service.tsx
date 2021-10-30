import React from 'react'
import { MdArrowForwardIos } from 'react-icons/md'
import { useRouter } from 'next/router'
import { ServiceLogo } from '../service-logo'

type FeaturedServicesProp = {
  featuredList: {
    name: string
    services: { id: number; name: string; logo_url: string; slug: string }[]
  }[]
  selected: string
}

function FeaturedServiceComponent({ featuredList, selected }: FeaturedServicesProp) {
  const router = useRouter()
  const featured = featuredList.filter((featured) => featured.name === selected)

  return (
    <div className="flex flex-col w-full border border-solid divide-y rounded-md border-border-default divide-border-default">
      {featured[0].services.map((service) => (
        <div
          className="flex items-center justify-between w-full px-4 py-2 cursor-pointer"
          key={`service-${service.id}`}
          onClick={() => router.push(`/services/${service.slug}`)}
        >
          <div className="flex items-center">
            <ServiceLogo
              serviceId={service.id}
              serviceName={service.name}
              logoUrl={service.logo_url}
              imageClassName="rounded-full top-[0px]"
            />
            <span className="ml-4 text-md text-text-tertiary">{service.name}</span>
          </div>
          <MdArrowForwardIos />
        </div>
      ))}
    </div>
  )
}

export const FeaturedService = FeaturedServiceComponent
