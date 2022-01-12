import React from 'react'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'
import Link from '@taggedweb/components/Link'

export default function Softwares() {
  return (
    <>
      <DynamicHeader
        title="About Taggedweb Softwares"
        description="Find software solutions provided by domain experts"
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="self-center pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About/Softwares
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Find the best SaaS software and web services for your needs
          </p>
        </div>
        <div className="container py-12">
          <div className="mb-12 text-lg text-gray-800 dark:text-gray-200">
            Whether you work at a large enterprise, a small business, or a non-profit: our mission just does not end
            with just helping you find a good SaaS option. We want it to be the best fit for solving your problems. If
            you aren't sure if a software or a web service will work for you and want to further evaluate it under a
            trial or learn how to use it, then we will work together with you to evaluate it and we will find you domain
            experts who can show you how to effectively utilize specific tools, for your use-cases.
          </div>
          <div className="flex space-x-4">
            <Link
              href={'/about'}
              className="text-base font-medium leading-6 leading-7 text-gray-500 dark:text-gray-400"
            >
              <a>&larr; Back</a>
            </Link>
            <Link
              href={'/?search_software=1'}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <a>Check it out &rarr;</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
