import React from 'react'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'
import Link from '@taggedweb/components/Link'

export default function Solutions() {
  return (
    <>
      <DynamicHeader
        title="About Taggedweb Solutions"
        description="Find software solutions provided by domain experts"
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="self-center pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About/Solutions
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Find software solutions provided by domain experts
          </p>
        </div>
        <div className="container py-12">
          <div className="mb-4 text-lg text-gray-800 dark:text-gray-200">
            Micro-Solutions are well defined in scope and can range from SaaS Integration Solutions to a consultation on
            how to effectively utilize a piece of software. Check description and scope of work to see if a solution
            fits your needs.
          </div>
          <div className="mb-4 text-lg text-gray-800 dark:text-gray-200">
            See details about the solution. If needed, ask questions with us over chat to clarify if the solution meets
            your needs. Reach out to us if anything is unclear. If you are not looking for solutions but just finding
            the best-fit SaaS options, then you may browse through our open software catalog or can ask us for software
            recommendations.
          </div>
          <div className="mb-12 text-lg text-gray-800 dark:text-gray-200">
            We will match you with the top 10 percent solution providers who will “solve” it for you. We will
            communicate with you during the process of fulfilling the solution.
          </div>
          <div className="flex space-x-4">
            <Link
              href={'/about'}
              className="text-base font-medium leading-6 leading-7 text-gray-500 dark:text-gray-400"
            >
              <a>&larr; Back</a>
            </Link>
            <Link
              href={'/'}
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
