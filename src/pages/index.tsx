import React from 'react'
import Typewriter from 'typewriter-effect'
import { PopularSolutionTags } from '@taggedweb/components/homepage-popular-solutions'
import { FindingSolutions } from '@taggedweb/components/homepage-finding-solutions'
import { Button } from '@taggedweb/components/button'
import { SearchComponent } from '@taggedweb/components/homepage-searchbar'
import Link from 'next/link'
import { SOLUTIONS_CONTACT_GOOGLE_FORM } from '@taggedweb/utils/constants'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'

export const getServerSideProps = async (context: { query: { search_software: number } }) => {
  const forSoftware = context.query.search_software ? context.query.search_software : 0

  return {
    props: {
      search_software: forSoftware,
    },
  }
}

type HomeProps = {
  search_software: number
}
export default function Home({ search_software = 0 }: HomeProps) {
  return (
    <div>
      <DynamicHeader />
      <div className="relative flex justify-between bg-blue-600">
        <img
          src="/images/homepage_shapes.png"
          alt="Technology Solution Shapes"
          className="absolute z-0 hidden max-w-4xl md:top-0 lg:top-12 lg:left-30 lg:flex"
        />
        <img
          src="/images/homepage_icon1.png"
          alt="Software SaaS Software Logo 1"
          className="absolute z-10 hidden w-24 lg:flex lg:top-64 xl:top-72 lg:right-60"
        />
        <img
          src="/images/homepage_icon2.png"
          alt="Software SaaS Software Logo 2"
          className="absolute z-10 hidden w-20 lg:flex top-56 right-28"
        />
        <img
          src="/images/homepage_icon3.png"
          alt="Software SaaS Software Logo 3"
          className="absolute z-10 hidden w-16 lg:flex top-28 right-44"
        />
        <img
          src="/images/homepage_icon4.png"
          alt="Software SaaS Software Logo 4"
          className="absolute z-10 hidden w-12 lg:flex top-48 right-64"
        />
        <div className="flex items-center justify-center flex-1 2xl:justify-end ">
          <div className="flex flex-col items-start justify-start w-full mx-6 my-4 lg:mr-0 xl:w-4/5 2xl:w-3/4">
            <div className="xl:flex">
              <h1 className="flex-shrink-0 py-2 text-3xl font-semibold text-white">Are you looking to&#160;</h1>
              <h1 className="flex-shrink-0 py-2 text-3xl font-semibold text-green-400">
                <>
                  <Typewriter
                    options={{
                      strings: [
                        'Integrate a SaaS into your stack?',
                        'Improve application performance?',
                        'Reduce AWS bills?',
                        'Find best-fit software for your needs?',
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </>
              </h1>
            </div>
            <div className="py-2 mb-4 text-3xl font-semibold text-white">We may have a solution. Just search!</div>
            <div className="z-10 w-full mb-4">
              <SearchComponent search_software={search_software} />
            </div>
          </div>
        </div>
        <div className="z-0 justify-end hidden w-1/3 lg:flex">
          <img src="/images/homepage_circle.png" alt="Solution Landing Page Image" className="w-full" />
        </div>
      </div>
      <div className="bg-blue-300">
        <div className="max-w-screen-lg py-4 mx-auto text-center">
          <div className="mx-2 text-sm font-medium text-black md:text-base lg:text-lg">
            Our mission is to help you find and utilize SaaS solutions and software that best fits your needs
          </div>
        </div>
      </div>
      <div className="my-12">
        <PopularSolutionTags />
      </div>
      <div>
        <FindingSolutions />
      </div>
      <div className="relative bg-gray-700 rounded-lg">
        <img
          src="/images/homepage_shapes.png"
          alt="Find Technology Solution And Softwares"
          className="absolute z-10 hidden max-w-2xl md:top-0 lg:top-12 lg:right-44 lg:flex"
        />
        <div className="max-w-screen-lg px-2 mx-auto">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="relative hidden w-full md:flex h-80 md:w-1/2 md:mr-8">
              <img
                src="/images/sol_provider.png"
                alt="Solution Provider"
                className="absolute z-0 w-3/4 transform rounded shadow bottom-8 right-20 skew-pic"
              />
              <img
                src="/images/finding_sol_1.png"
                alt="Find Solution"
                className="absolute bottom-0 z-0 w-3/4 transform rounded shadow right-8 skew-pic"
              />
            </div>
            <div className="z-10 flex flex-col items-start justify-center w-full pt-4 md:pt-0 md:w-1/2">
              <div className="text-2xl font-bold text-white">Are you a software services or solutions provider?</div>
              <div className="mb-8 text-lg font-medium text-white">Better connect with your customers</div>
              <Link href={`${SOLUTIONS_CONTACT_GOOGLE_FORM}`} passHref>
                <a target="_blank" rel="noreferrer">
                  <Button buttonType="homePage" className="mb-4">
                    List your Solution
                  </Button>
                </a>
              </Link>
            </div>
            <div className="relative w-full h-64 md:hidden md:w-1/2 md:mr-8 md:mt-2">
              <img
                src="/images/sol_provider.png"
                alt="Solution Provider"
                className="absolute w-2/3 transform rounded shadow sm:w-7/12 md:w-3/4 bottom-8 right-20 skew-pic"
              />
              <img
                src="/images/finding_sol_1.png"
                alt="Find Solution"
                className="absolute bottom-0 w-2/3 transform rounded shadow sm:w-7/12 md:w-3/4 right-8 skew-pic"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
