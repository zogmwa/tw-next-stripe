import Link from 'next/link'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiClipboardList } from 'react-icons/hi'

export function FindingSolutions() {
  return (
    <div className="py-8 bg-gray-50">
      <div className="relative max-w-screen-lg px-2 mx-auto">
        <div className="mb-20 text-2xl font-bold text-center">Finding Solutions: How it Works</div>
        <div className="flex flex-col mb-16 md:flex-row">
          <div className="w-full md:w-5/12">
            <img src="/images/step_1.png" alt="Search Solution and Software" className="w-full mx-auto" />
          </div>
          <div className="items-center justify-center hidden w-2/12 md:flex">
            <div className="flex items-center justify-center w-24 h-24 text-xl text-center text-white bg-blue-500 border-8 border-blue-200 rounded-full">
              1
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full py-4 space-y-2 md:py-0 md:items-start md:w-5/12">
            <div className="text-4xl text-blue-500">
              <AiOutlineSearch />
            </div>
            <div className="text-2xl font-bold">Find software solutions provided by domain experts</div>
            <div className="text-lg text-text-tertiary">
              Micro-Solutions are well defined in scope and can range from SaaS Integration Solutions to a consultation
              on how to effectively utilize a piece of software. Check description and scope of work to see if a
              solution fits your needs.
            </div>
          </div>
        </div>
        <div className="absolute z-10 hidden border-l-4 border-blue-400 rounded lg:flex vertical-line-1 left-1/2" />
        <div className="flex flex-col mb-16 md:flex-row">
          <div className="w-full md:hidden md:w-5/12">
            <img src="/images/step_2.png" alt="Solution Detail Features" className="w-full mx-auto" />
          </div>
          <div className="flex flex-col items-center justify-center w-full py-4 space-y-2 md:py-0 md:items-start md:w-5/12">
            <div className="text-4xl text-blue-500">
              <HiClipboardList />
            </div>
            <div className="text-2xl font-bold">See Solution details, Scope of Work, FAQs, Ask Questions</div>
            <div className="text-lg text-text-tertiary">
              See details about the solution. If needed, ask questions with us over chat to clarify if the solution
              meets your needs. Reach out to us if anything is unclear. If you are not looking for solutions but just
              finding the best-fit SaaS options, then you may browse through our open
              <Link href="/softwares">
                <a> software catalog </a>
              </Link>{' '}
              or can ask us for software recommendations.
            </div>
          </div>
          <div className="items-center justify-center hidden w-2/12 md:flex">
            <div className="flex items-center justify-center w-24 h-24 text-xl text-center text-white bg-blue-500 border-8 border-blue-200 rounded-full">
              2
            </div>
          </div>
          <div className="hidden w-full md:flex md:w-5/12">
            <img src="/images/step_2.png" alt="Solution Detail Features" className="w-full mx-auto" />
          </div>
        </div>
        <div className="absolute z-10 hidden border-l-4 border-blue-400 rounded lg:flex vertical-line-2 left-1/2" />
        <div className="flex flex-col mb-16 md:flex-row">
          <div className="w-full md:w-5/12">
            <img src="/images/step_3.png" alt="Book Solutions" className="w-3/4 mx-auto" />
          </div>
          <div className="items-center justify-center hidden w-2/12 md:flex">
            <div className="flex items-center justify-center w-24 h-24 text-xl text-center text-white bg-blue-500 border-8 border-blue-200 rounded-full">
              3
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full py-4 space-y-2 md:py-0 md:items-start md:w-5/12">
            <div className="text-4xl text-blue-500">
              <HiClipboardList />
            </div>
            <div className="text-2xl font-bold">Book the solution and let us take care of the rest</div>
            <div className="text-lg text-text-tertiary">
              We will match you with the top 10 percent solution providers who will “solve” it for you. We will
              communicate with you during the process of fulfilling the solution.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
