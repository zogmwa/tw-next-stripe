import React from 'react'
import { useRouter } from 'next/router'
import { SearchBar } from '../components/search-bar'
import { Button } from '../components/button'
import { useRequireLogin } from '../hooks/use-require-login'
export default function Home() {
  const router = useRouter()
  const { requireLoginBeforeAction } = useRequireLogin()

  return (
    <div>
      <div className="max-w-screen-lg pl-2 mx-auto">
        <div className="flex flex-col items-start justify-start my-12 space-y-8">
          <h1 className="text-4xl font-semibold">Find the best SaaS software and web services for your needs</h1>
          <SearchBar
            onSubmit={(selectedTag) => {
              router.push(`/search/${selectedTag}`)
            }}
          />
        </div>
      </div>
      <div className="py-12 bg-gray-100">
        <div className="max-w-screen-lg px-4 mx-auto">
          <div className="flex flex-col items-center justify-start px-2 md:px-0 md:flex-row">
            <div className="flex flex-col items-start justify-center mb-2 md:w-12/12">
              <h4 className="mb-4 text-3xl text-black">
                We will help you both find and evaluate the best SaaS Software and Services for your needs
              </h4>
              <div className="mb-4 text-lg text-gray-600">
                {' '}
                Whether you are a business user at a large enterprise, a small business, or a non-profit: Our mission
                just does not end with just helping you find a good SaaS option. We want it to be the best fit for
                solving your problems. If you aren&apos;t sure if a software or a web service is a good candidate and
                want to further evaluate it under a trial or learn how to use it, then we will work together with you to
                evaluate it or connect you with specific experts who can show you how to most effectively utilize it,
                for your use-cases.{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-12 bg-blue-600">
        <div className="max-w-screen-lg px-4 mx-auto">
          <div className="flex flex-col items-center justify-start px-2 md:px-0 md:flex-row">
            <div className="flex flex-col items-start justify-center mb-2 md:w-7/12">
              <div className="mb-6 text-4xl font-semibold text-white">
                Are you a SaaS provider or creator? Connect with more users
              </div>
              <div className="mb-4 text-2xl text-gray-300">
                Help people discover your SaaS services and their features by adding it to TaggedWeb
              </div>
              <Button
                buttonType="primary"
                className="mt-2 mr-2"
                onClick={requireLoginBeforeAction(() => {
                  router.push('/submit-service')
                })}
              >
                Add your web service (It&apos;s free)
              </Button>
            </div>
            <div className="flex-1">
              <img src="/images/homepage_pic.jpg" alt="homepage_pic" className="w-full mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
