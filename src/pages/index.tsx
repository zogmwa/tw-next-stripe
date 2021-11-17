import React from 'react'
import Typical from 'react-typical'
import { PopularSolutionTags } from '@taggedweb/components/homepage-popular-solutions'
import { FindingSolutions } from '@taggedweb/components/homepage-finding-solutions'
import { Button } from '@taggedweb/components/button'
import { SearchComponent } from '@taggedweb/components/homepage-searchbar'

export default function Home() {
  return (
    <div>
      <div className="relative flex justify-between bg-blue-600">
        <img
          src="/images/homepage_shapes.png"
          className="absolute z-0 hidden max-w-5xl mx-auto md:top-0 lg:top-12 lg:left-44 lg:flex"
        />
        <img
          src="/images/homepage_icon1.png"
          alt="Software SaaS Logo 1"
          className="absolute z-10 hidden w-24 lg:flex top-72 right-64"
        />
        <img
          src="/images/homepage_icon2.png"
          alt="Software SaaS Logo 2"
          className="absolute z-10 hidden w-20 lg:flex top-56 right-28"
        />
        <img
          src="/images/homepage_icon3.png"
          alt="Software SaaS Logo 3"
          className="absolute z-10 hidden w-16 lg:flex top-28 right-44"
        />
        <img
          src="/images/homepage_icon4.png"
          alt="Software SaaS Logo 4"
          className="absolute z-10 hidden w-12 lg:flex top-48 right-64"
        />
        <div className="z-20 flex items-center justify-center flex-1 md:justify-end">
          <div className="flex flex-col items-start justify-start w-full px-2 py-2 lg:w-3/4">
            <div className="xl:flex">
              <h1 className="flex-shrink-0 py-2 text-3xl font-semibold text-white">Are you looking to&#160;</h1>
              <h1 className="flex-shrink-0 py-2 text-3xl font-semibold text-green-400">
                <>
                  <Typical
                    steps={[
                      'Find the best SaaS for your needs?',
                      350,
                      'Integrate a SaaS into your software stack?',
                      350,
                      'Improve your application performance?',
                      350,
                      'Reduce your cloud bill?',
                      350,
                    ]}
                    wrapper="p"
                    loop={Infinity}
                  />
                </>
              </h1>
            </div>
            <div className="py-2 mb-4 text-3xl font-semibold text-white"> We may have a solution. Just search! </div>
            <div className="z-10 w-full mr-2">
              <SearchComponent />
            </div>
          </div>
        </div>
        <div className="z-0 justify-end hidden w-1/3 lg:flex">
          <img src="/images/homepage_circle.png" alt="circle" className="w-full" />
        </div>
      </div>
      <div className="bg-blue-300">
        <div className="max-w-screen-lg py-4 mx-auto text-center">
          <div className="text-lg font-medium text-black">
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
          alt="shapes"
          className="absolute z-10 hidden max-w-2xl md:top-0 lg:top-12 lg:right-44 lg:flex"
        />
        <div className="max-w-screen-lg px-2 mx-auto">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="relative hidden w-full md:flex h-80 md:w-1/2 md:mr-8">
              <img
                src="/images/sol_provider.png"
                alt="sol_provider"
                className="absolute z-0 w-3/4 transform rounded shadow bottom-8 right-20 skew-pic"
              />
              <img
                src="/images/finding_sol_1.png"
                alt="finding_sol_1"
                className="absolute bottom-0 z-0 w-3/4 transform rounded shadow right-8 skew-pic"
              />
            </div>
            <div className="z-10 flex flex-col items-start justify-center w-full pt-4 md:pt-0 md:w-1/2">
              <div className="text-2xl font-bold text-white">Are you a solution provider or a creator?</div>
              <div className="mb-8 text-lg font-medium text-white">Better connect with solution customers</div>
              <Button buttonType="homePage" className="mb-4">
                List your Solution
              </Button>
            </div>
            <div className="relative w-full h-64 md:hidden md:w-1/2 md:mr-8">
              <img
                src="/images/sol_provider.png"
                alt="sol_provider"
                className="absolute z-0 w-3/4 transform rounded shadow bottom-8 right-20 skew-pic"
              />
              <img
                src="/images/finding_sol_1.png"
                alt="finding_sol_1"
                className="absolute bottom-0 z-10 w-3/4 transform rounded shadow right-8 skew-pic"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
