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
        <div className="flex flex-col justify-center divide-y">
          <div className="self-center pt-6 pb-8 space-y-2 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              About
            </h1>
          </div>
          <div className="flex items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
            <div className="flex flex-col items-center pt-8 space-x-2">
              <Image
                src={taggedwebAboutDetails.avatar}
                alt="avatar"
                width="192px"
                height="192px"
                className="w-48 h-48 rounded-full"
              />
              <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{taggedwebAboutDetails.name}</h3>
              <div className="text-gray-500 dark:text-gray-400">{taggedwebAboutDetails.occupation}</div>
              <div className="flex pt-6 space-x-3">
                <a href={`mailto:${taggedwebAboutDetails.email}`}>
                  <TiMail className="p-1 text-3xl border border-solid rounded-full border-border-default" />
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
            </div>
            <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
              {taggedwebAboutDetails.Description}
            </div>
          </div>
        </div>
        <div className="container py-12">
          <div className="flex flex-wrap justify-center -m-4">
            {servicesCategoryData.map((d) => (
              <Card key={d.title} title={d.title} description={d.description} imgSrc={d.imgSrc} href={d.href} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
