import React from 'react'
import { useRouter } from 'next/router'
import { TiSocialFacebook } from 'react-icons/ti'
import { TiSocialTwitter } from 'react-icons/ti'
import { TiSocialLinkedin } from 'react-icons/ti'
import { MdOutlineEmail } from 'react-icons/md'
import { AiOutlineCopyrightCircle } from 'react-icons/ai'
import { Button } from '../button'

type footerData = {
  topTags: { value: string; slug: string }[]
}

function HomePageFooterComponent({ topTags }: footerData) {
  const router = useRouter()
  const defaultShowCount = 15
  const showTopTags = topTags.slice(0, defaultShowCount)

  return (
    <div className="w-full px-4 mt-8">
      <div className="hidden max-w-screen-lg pr-2 mx-auto divide-y md:block footer divide divide-border-default">
        <div className="justify-between hidden p-2 md:flex info">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">Popular Software as a Service (SaaS) Categories and Tags</h2>
            <div className="grid grid-cols-3 mt-2 tags">
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
          {/* <div className="flex justify-between w-full md:justify-around">
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
          </div> */}
          <div className="contact-us">
            <h2 className="pt-2 font-semibold text-md">We are here to help</h2>
            <div className="flex items-center mt-4 email">
              <MdOutlineEmail className="p-0.5 text-2xl text-gray-100 bg-gray-900 rounded-full justify-self-start" />
              <img src="/images/contact-email.png" alt="contact" />
            </div>
          </div>
        </div>
        <div className="justify-between hidden p-2 md:flex others">
          <div className="flex items-center">
            <img src="/images/taggedweb-logo.svg" alt="TaggedWeb" className="w-10 h-10" />
            <a href="/">
              <div className="text-base font-medium tracking-wide text-opacity-100 cursor-pointer text-primary">
                TaggedWeb
              </div>
            </a>
          </div>
          <div className="flex p-2 space-x-4 other-sites">
            <a
              href="https://www.linkedin.com/company/taggedweb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 no-underline"
            >
              <TiSocialLinkedin className="p-1 text-3xl border border-solid rounded-full border-border-default" />
            </a>
            <a
              href="https://twitter.com/TheTaggedWeb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 no-underline"
            >
              <TiSocialTwitter className="p-1 text-3xl border border-solid rounded-full border-border-default" />
            </a>
            <a
              href="https://www.facebook.com/taggedweb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 no-underline"
            >
              <TiSocialFacebook className="p-1 text-3xl border border-solid rounded-full border-border-default" />
            </a>
          </div>
          <div className="flex items-center copyright">
            <AiOutlineCopyrightCircle className="text-sm text-text-tertiary" />
            <span className="pl-1 text-xs text-text-tertiary">2021 TaggedWeb.com. All rights reserved.</span>
          </div>
        </div>
      </div>
      <div className="block max-w-screen-lg divide-y footer divide divide-border-default md:hidden">
        <div className="flex flex-col p-2 md:hidden info">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">Popular SaaS Tags</h2>
            <div className="grid grid-cols-2 mt-2 tags">
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
          {/* <div className="flex justify-between w-full mt-2 md:justify-around">
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
          </div> */}
          <div className="flex flex-col w-full mt-2 contact-us">
            <h2 className="font-semibold text-md">We're here to help you</h2>
            <div className="flex items-center mt-2 email">
              <MdOutlineEmail className="p-0.5 text-2xl text-gray-100 bg-gray-900 rounded-full justify-self-start" />
              <img src="/images/contact-email.png" alt="contact" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between p-2 md:hidden others">
          <div className="flex items-center">
            <img src="/images/taggedweb-logo.svg" alt="TaggedWeb" className="w-10 h-10" />
            <a href="/">
              <div className="text-base font-medium tracking-wide text-opacity-100 cursor-pointer text-primary">
                TaggedWeb
              </div>
            </a>
          </div>
          <div className="flex justify-around mt-2 space-x-4 other-sites">
            <a
              href="https://twitter.com/TheTaggedWeb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 no-underline"
            >
              <TiSocialTwitter className="p-1 text-3xl border border-solid rounded-full border-border-default" />
            </a>
            <a
              href="https://www.linkedin.com/company/taggedweb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 no-underline"
            >
              <TiSocialLinkedin className="p-1 text-3xl border border-solid rounded-full border-border-default" />
            </a>
            <a
              href="https://www.facebook.com/taggedweb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 no-underline"
            >
              <TiSocialFacebook className="p-1 text-3xl border border-solid rounded-full border-border-default" />
            </a>
          </div>
          <div className="flex items-center mt-2 copyright">
            <AiOutlineCopyrightCircle className="text-sm text-text-tertiary" />
            <span className="pl-1 text-xs text-text-tertiary">2021 TaggedWeb All rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const HomePageFooter = HomePageFooterComponent
