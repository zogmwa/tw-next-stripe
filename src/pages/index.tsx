import React from 'react'
import { useRouter } from 'next/router'
import Typical from 'react-typical'
import { SearchBar } from '@taggedweb/components/search-bar'
import { PopularSolutionTags } from '@taggedweb/components/homepage-popular-solutions'
import { FindingSolutions } from '@taggedweb/components/homepage-finding-solutions'
import { Button } from '@taggedweb/components/button'

export default function Home() {
  const router = useRouter()
  return (
    <div>
      <div className="bg-blue-600 bg-opacity-80">
        <div className="max-w-screen-lg px-2 mx-auto">
          <div className="flex flex-col items-center justify-center py-20">
            <h1 className="px-2 py-2 text-2xl font-bold text-white bg-blue-300 rounded"> Are you looking to ...</h1>
            <h2 className="px-2 py-2 mb-8 text-2xl font-bold text-center text-white">
              <u>
                <Typical
                  steps={[
                    'Integrate a SaaS?',
                    500,
                    'Improve application performance?',
                    500,
                    'Integrate payment flows?',
                    500,
                  ]}
                  wrapper="p"
                  loop={Infinity}
                />
              </u>
              TaggedWeb may have a solution for you!
            </h2>
            <div className="w-full mr-2 md:w-3/4">
              <SearchBar
                onSubmit={(selectedTag) => {
                  router.push(`/search/${selectedTag}`)
                }}
                forHomepage={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-100">
        <div className="max-w-screen-lg py-4 mx-auto text-center">
          <div className="text-lg font-medium text-black">
            Our mission is to help you find and utilize SaaS web services that best fit your needs
          </div>
        </div>
      </div>
      <div className="my-12">
        <PopularSolutionTags />
      </div>
      <div>
        <FindingSolutions />
      </div>
      <div className="bg-gray-700 rounded-lg">
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
                className="absolute bottom-0 z-10 w-3/4 transform rounded shadow right-8 skew-pic"
              />
            </div>
            <div className="flex flex-col items-start justify-center w-full pt-4 md:pt-0 md:w-1/2">
              <div className="text-2xl font-bold text-white">Are you a solution provider or a creator?</div>
              <div className="mb-8 text-lg font-medium text-white">Better connect with solution customers</div>
              <Button buttonType="homepage" className="mb-4">
                List your Solutions
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
