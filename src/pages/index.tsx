import React from 'react'
import { useRouter } from 'next/router'
import { SearchBar } from '@taggedweb/components/search-bar'
import { Button } from '@taggedweb/components/button'
import { useRequireLogin } from '@taggedweb/hooks/use-require-login'
import { HomepageFeatured } from '@taggedweb/components/homepage-featured'
import { client } from '@taggedweb/utils/client'

export const getServerSideProps = async () => {
  const { data: featuredList } = await client.get('/assets/featured/')

  return {
    props: { featuredList },
  }
}

export default function Home({ featuredList }) {
  const router = useRouter()
  const { requireLoginBeforeAction } = useRequireLogin()
  let showFeaturedList = false
  if (featuredList.length > 0) showFeaturedList = true
  return (
    <div>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col items-start justify-start mx-2 my-12 space-y-8">
          <h1 className="text-4xl font-semibold text-center md:text-left">
            Find the best SaaS software and web services for your needs
          </h1>
          <SearchBar
            onSubmit={(selectedTag) => {
              router.push(`/search/${selectedTag}`)
            }}
          />
        </div>
      </div>
      {showFeaturedList && (
        <div className="py-8 bg-gray-100">
          <div className="max-w-screen-lg pl-2 mx-auto">
            <HomepageFeatured featuredList={featuredList} />
          </div>
        </div>
      )}
      <div className="py-12">
        <div className="max-w-screen-lg px-4 mx-auto">
          <div className="flex flex-col items-center justify-start px-2 md:px-0 md:flex-row">
            <div className="flex flex-col items-start justify-center mb-2 md:w-12/12">
              <h4 className="mb-4 text-3xl text-black">
                We help you find and evaluate the best SaaS Software and Services for your needs
              </h4>
              <div className="mb-4 text-lg text-gray-600">
                {' '}
                <p>
                  Whether you work at a large enterprise, a small business, or a non-profit: our mission just does not
                  end with just helping you find a good SaaS option. We want it to be the best fit for solving your
                  problems. If you aren&apos;t sure if a software or a web service will work for you and want to further
                  evaluate it under a trial or learn how to use it, then we will work together with you to evaluate it
                  and we will find you domain experts who can show you how to effectively utilize specific tools, for
                  your use-cases.{' '}
                </p>
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
                Help people discover your SaaS service and it&apos;s features by adding it to TaggedWeb
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
