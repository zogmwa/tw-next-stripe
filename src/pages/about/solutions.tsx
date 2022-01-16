import React from 'react'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'
import Link from '@taggedweb/components/Link'

export default function Solutions() {
  return (
    <>
      <DynamicHeader
        title="Taggedweb Solutions and Consultations"
        description="Book consultations with and solutions from software engineers and domain experts | TaggedWeb"
      />
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center p-6 space-y-2">
          <h1 className="p-2 font-serif text-2xl text-gray-700 border-b-2 border-neutral-800 sm:text-4xl md:text-6xl">
            About Solutions
          </h1>
          <p className="text-base leading-7 text-center text-gray-500 md:text-lg dark:text-gray-400">
            Find solutions provided by domain experts
          </p>
        </div>
        <div className="container px-4 py-8">
          <div className="mb-12">
            <div className="text-sm prose text-gray-700 md:text-base dark:prose-dark max-w-none dark:text-gray-200">
              Micro-Solutions are well defined in scope and can range from SaaS Integration Solutions to a consultation
              on how to effectively utilize a piece of software. Check description and scope to see if a solution fits
              your needs.
            </div>
            <br />
            <div className="text-sm prose text-gray-700 md:text-base dark:prose-dark max-w-none dark:text-gray-200">
              See details about the solution. If needed, ask questions with us over chat to clarify if the solution
              meets your needs. Reach out to us if anything is unclear. If you are not looking for solutions but just
              finding the best-fit SaaS options, then you may browse through our open software catalog or can just tell
              us about your problem. We will try to match you with the top 2 percent solution providers who will “solve”
              it for you. We will communicate with you during the process of fulfilling your request.
            </div>
          </div>
          <div className="flex justify-around sm:justify-between">
            <Link href={'/about'}>
              <a className="text-base font-medium leading-6 leading-7 text-blue-500 dark:text-blue-400">&larr; Back</a>
            </Link>
            <Link href={'/'}>
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
