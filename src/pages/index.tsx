import React from 'react'
import { useRouter } from 'next/router'
import { SearchBar } from '../components/search-bar'
import { Button } from '../components/button'
import { topTags } from '../utils/top-tags'

export default function Home() {
  const router = useRouter()

  return (
    <div>
      <div className="max-w-screen-lg pl-2 mx-auto">
        <div className="flex flex-col items-start justify-start my-12 space-y-8">
          <div className="text-4xl font-semibold">
            Discover and Evaluate SaaS services. Find Web Services that best fit your needs..
          </div>
          <SearchBar
            onSubmit={(selectedTag) => {
              router.push(`/search/${selectedTag}`)
            }}
          />
        </div>
      </div>
      <div className="py-12 bg-blue-600">
        <div className="max-w-screen-lg px-2 mx-auto">
          <div className="flex flex-col items-center justify-start px-2 md:px-0 md:flex-row">
            <div className="flex flex-col items-start justify-center mb-2 md:w-7/12">
              <div className="mb-6 text-4xl font-semibold text-white">Web Service Owner? Connect with more users</div>
              <div className="mb-4 text-2xl text-gray-300">Help people discover your web service and it’s function</div>
              <Button
                buttonType="primary"
                className="mt-2 mr-2"
                onClick={() => {
                  router.push('/submit-service')
                }}
              >
                Add your web service
              </Button>
            </div>
            <div className="flex-1">
              <img src="/images/homepage_pic.jpg" alt="homepage_pic" className="w-full mx-auto" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg px-2 mx-auto my-12">
        <div className="mb-4 text-4xl font-medium">Top Tags</div>
        <div className="flex flex-row flex-wrap mb-5">
          {topTags.map((tag) => {
            return (
              <Button
                key={tag.slug}
                buttonType="tag"
                size="small"
                className="mt-2 mr-2"
                onClick={() => {
                  router.push(`/search/${tag.slug}`)
                }}
              >
                {tag.value}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
