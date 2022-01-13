import React from 'react'
import Link from 'next/link'
import { MdArrowForwardIos } from 'react-icons/md'
import { ServiceLogo } from '../service-logo'

type FeaturedServicesProp = {
  featuredList: {
    name: string
    assets: { name: string; logo_url: string; slug: string }[]
  }[]
  selected: string
}

function FeaturedServiceComponent({ featuredList, selected }: FeaturedServicesProp) {
  const featured = featuredList.filter((featured) => featured.name === selected)

  return (
    <div className="flex flex-col w-full">
      <div className="border border-solid divide-y rounded-md border-border-default divide-border-default">
        {featured[0].assets.map((service) => (
          <div
            className="flex items-center justify-between w-full px-4 py-2 cursor-pointer"
            key={`service-${service.slug}`}
          >
            <Link href={`/software/${service.slug}`} passHref>
              <a>
                <div className="flex items-center">
                  <ServiceLogo
                    serviceName={service.name}
                    logoUrl={service.logo_url}
                    imageClassName="rounded-full"
                    className="w-[40px] h-[40px]"
                  />
                  <span className="ml-4 text-md text-text-secondary">{service.name}</span>
                </div>
                <MdArrowForwardIos />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export const FeaturedService = FeaturedServiceComponent
