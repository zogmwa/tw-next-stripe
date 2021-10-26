import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GrTwitter, GrLinkedin } from 'react-icons/gr'
import { MdOutlineEmail } from 'react-icons/md'
import { AiOutlineCopyrightCircle } from 'react-icons/ai'
import { Button } from '../button'

type footerData = {
  topTags: { value: string; slug: string }[]
  sectionOneData: { name: string; link: string }[]
  sectionTwoData: { name: string; link: string }[]
}

function HomePageFooterComponent({ topTags, sectionOneData, sectionTwoData }: footerData) {
  const router = useRouter()
  const defaultShowCount = 15
  const showTopTags = topTags.slice(0, defaultShowCount)

  return (
    <>
      <div className="hidden divide-y md:block footer divide divide-border-default">
        <div className="hidden p-2 md:flex info">
          <div className="flex flex-col">
            <h2 className="font-semibold text-md">Popular Tags</h2>
            <div className="flex flex-wrap tags">
              {showTopTags.map((tag) => (
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
              ))}
            </div>
          </div>
          <div className="flex justify-between w-full md:justify-around">
            <div className="flex flex-col justify-between section-one">
              <h2 className="font-semibold text-md">Section 1</h2>
              {sectionOneData.map((data, index) => (
                <a
                  className="inline-block text-sm text-gray-900 no-underline focus:ring-0"
                  href={data.link}
                  key={index}
                >
                  {data.name}
                </a>
              ))}
            </div>
            <div className="flex flex-col justify-between section-two">
              <h2 className="font-semibold text-md">Section 2</h2>
              {sectionTwoData.map((data, index) => (
                <a
                  className="inline-block text-sm text-gray-900 no-underline focus:ring-0"
                  href={data.link}
                  key={index}
                >
                  {data.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full contact-us">
            <h2 className="font-semibold text-md">We're here to help you</h2>
            <div className="flex items-center mt-2 email">
              <MdOutlineEmail className="p-0.5 text-2xl text-gray-100 bg-gray-900 rounded-full justify-self-start" />
              <span className="ml-2 text-sm text-gray-900">info@taggedweb.com</span>
            </div>
          </div>
        </div>
        <div className="justify-between hidden p-2 md:flex others">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-2 bg-opacity-25 rounded-md bg-primary" />
            <a href="/" target="_blank">
              <div className="text-base font-medium tracking-wide text-opacity-50 cursor-pointer text-primary">
                TaggedWeb
              </div>
            </a>
          </div>
          <div className="flex p-2 space-x-4 other-sites">
            <Link href="/">
              <GrTwitter className="p-1 text-3xl border border-solid rounded-full border-border-default" />
            </Link>
            <Link href="/">
              <GrLinkedin className="p-1 text-3xl border border-solid rounded-full border-border-default" />
            </Link>
          </div>
          <div className="flex items-center copyright">
            <AiOutlineCopyrightCircle className="text-sm text-text-tertiary" />
            <span className="pl-1 text-xs text-text-tertiary">2021 Taggedweb. All rights reserved.</span>
          </div>
        </div>
      </div>
      <div className="block divide-y footer divide divide-border-default md:hidden">
        <div className="flex flex-col p-2 md:hidden info">
          <div className="flex flex-col">
            <h2 className="font-semibold text-md">Popular Tags</h2>
            <div className="flex flex-wrap tags">
              {showTopTags.map((tag) => (
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
              ))}
            </div>
          </div>
          <div className="flex justify-between w-full mt-2 md:justify-around">
            <div className="flex flex-col justify-between section-one">
              <h2 className="font-semibold text-md">Section 1</h2>
              {sectionOneData.map((data, index) => (
                <a
                  className="inline-block text-sm text-gray-900 no-underline focus:ring-0"
                  href={data.link}
                  key={index}
                >
                  {data.name}
                </a>
              ))}
            </div>
            <div className="flex flex-col justify-between section-two">
              <h2 className="font-semibold text-md">Section 2</h2>
              {sectionTwoData.map((data, index) => (
                <a
                  className="inline-block text-sm text-gray-900 no-underline focus:ring-0"
                  href={data.link}
                  key={index}
                >
                  {data.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full mt-2 contact-us">
            <h2 className="font-semibold text-md">We're here to help you</h2>
            <div className="flex items-center mt-2 email">
              <MdOutlineEmail className="p-0.5 text-2xl text-gray-100 bg-gray-900 rounded-full justify-self-start" />
              <span className="ml-2 text-sm text-gray-900">info@taggedweb.com</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between p-2 md:hidden others">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-2 bg-opacity-25 rounded-md bg-primary" />
            <a href="/" target="_blank">
              <div className="text-base font-medium tracking-wide text-opacity-50 cursor-pointer text-primary">
                TaggedWeb
              </div>
            </a>
          </div>
          <div className="flex justify-around mt-2 space-x-4 other-sites">
            <Link href="/">
              <GrTwitter className="p-1 text-3xl border border-solid rounded-full border-border-default" />
            </Link>
            <Link href="/">
              <GrLinkedin className="p-1 text-3xl border border-solid rounded-full border-border-default" />
            </Link>
          </div>
          <div className="flex items-center mt-2 copyright">
            <AiOutlineCopyrightCircle className="text-sm text-text-tertiary" />
            <span className="pl-1 text-xs text-text-tertiary">2021 Taggedweb. All rights reserved.</span>
          </div>
        </div>
      </div>
    </>
  )
}

export const HomePageFooter = HomePageFooterComponent
