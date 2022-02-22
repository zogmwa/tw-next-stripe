import React from 'react'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'
import Link from '@taggedweb/components/Link'

export default function Softwares() {
  return (
    <>
      <DynamicHeader
        title="About Taggedweb Softwares"
        description="Find softwares that best fits your needs! | TaggedWeb"
      />
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center p-6 space-y-2">
          <h1 className="p-2 font-serif text-2xl text-gray-700 border-b-2 border-neutral-800 sm:text-4xl md:text-6xl">
            About Softwares
          </h1>
          <p className="text-base leading-7 text-center text-gray-500 md:text-lg dark:text-gray-400">
            Find the best SaaS software and web services for your needs
          </p>
        </div>
        <div className="container px-4 py-8">
          <div className="mb-12 text-base prose text-gray-700 dark:prose-dark max-w-none dark:text-gray-200">
            Whether you work at a large enterprise, a small business, or a non-profit: our mission just does not end
            with just helping you find a good SaaS option. We want it to be the best fit for solving your problems. If
            you aren&apos;t sure if a software or a web service will work for you and want to further evaluate it under
            a trial or learn how to use it, then we will work together with you to evaluate it and we will find you
            domain experts who can show you how to effectively utilize specific tools, for your use-cases.
          </div>
          <div className="flex justify-around sm:justify-between">
            <Link href={'/about'}>
              <a className="text-base font-medium leading-6 leading-7 text-blue-500 dark:text-blue-400">&larr; Back</a>
            </Link>
            <Link href={'/?search_software=1'}>
              <a className="text-base font-medium leading-6 leading-7 text-blue-500 cursor-pointer dark:text-blue-400">
                Check it out &rarr;
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
