import React from 'react'
import Card from '@taggedweb/components/card/card'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'
import Image from 'next/image'
import { TiMail, TiSocialFacebook, TiSocialTwitter, TiSocialLinkedin } from 'react-icons/ti'

const servicesCategoryData = [
  {
    title: 'Solutions',
    description: 'Find software solutions provided by domain experts',
    imgSrc: '/images/step_1.png',
    href: '/about/solutions',
  },
  {
    title: 'Softwares',
    description: 'We help you find and evaluate the best SaaS Software and Services for your needs',
    imgSrc: '/images/about_software.png',
    href: '/about/softwares',
  },
]

const taggedwebAboutDetails = {
  name: 'TaggedWeb',
  avatar: '/images/taggedweb-logo.svg',
  occupation: 'Solutions Marketplace',
  email: 'contact@taggedweb.com',
  twitter: 'https://twitter.com/TheTaggedWeb',
  linkedin: 'https://www.linkedin.com/company/taggedweb/',
  Description:
    ' At TaggedWeb shop for the best SaaS Solutions and Cloud Software. Unblock your team with SaaS Integrations, Consultations, Usage Support and more from top engineers and domain experts.',
}
export async function getStaticProps() {
  return { props: { taggedwebAboutDetails } }
}

export default function About() {
  return (
    <>
      <DynamicHeader title="About - Taggedweb" description="Find best software solutions provided by domain experts" />
      <div className="flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center p-6 space-y-2">
          <h1 className="p-2 font-serif text-2xl text-gray-700 border-b-2 border-neutral-800 sm:text-4xl md:text-6xl">
            About Us
          </h1>
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-col-reverse items-center justify-between w-full space-x-2 md:flex-row lg:w-3/4 lg:space-x-4">
              <div className="flex flex-col items-center w-1/2 mx-1 space-x-1">
                <Image
                  src={taggedwebAboutDetails.avatar}
                  alt="avatar"
                  width="180px"
                  height="180px"
                  className="w-40 h-40 rounded-full"
                />
                <h3 className="pb-2 text-base font-bold tracking-tight md:text-xl xl:text-2xl">
                  {taggedwebAboutDetails.name}
                </h3>
                <div className="text-xs text-gray-500 lg:text-sm dark:text-gray-400 ">
                  {taggedwebAboutDetails.occupation}
                </div>
                <div className="flex pt-2 space-x-2 md:space-x-3 md:pt-3">
                  <a href={`mailto:${taggedwebAboutDetails.email}`}>
                    <TiMail className="p-1 text-2xl border border-solid rounded-full md:text-3xl border-border-default" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/taggedweb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 no-underline"
                  >
                    <TiSocialLinkedin className="p-1 text-2xl border border-solid rounded-full md:text-3xl border-border-default" />
                  </a>
                  <a
                    href="https://twitter.com/TheTaggedWeb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 no-underline"
                  >
                    <TiSocialTwitter className="p-1 text-2xl border border-solid rounded-full md:text-3xl border-border-default" />
                  </a>
                  <a
                    href="https://www.facebook.com/taggedweb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 no-underline"
                  >
                    <TiSocialFacebook className="p-1 text-2xl border border-solid rounded-full md:text-3xl border-border-default" />
                  </a>
                </div>
              </div>
              <div className="prose dark:prose-dark max-w-none">{taggedwebAboutDetails.Description}</div>
            </div>
          </div>
        </div>
        <div className="py-12">
          <div className="flex flex-wrap items-center justify-center">
            {servicesCategoryData.map((d) => (
              <Card key={d.title} title={d.title} description={d.description} imgSrc={d.imgSrc} href={d.href} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
