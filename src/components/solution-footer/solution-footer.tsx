import React, { useState } from 'react'
import { BsFacebook, BsTwitter, BsLinkedin } from 'react-icons/bs'
import { AiOutlineCopyrightCircle } from 'react-icons/ai'
import Link from 'next/link'
import { Tag } from '../../types/tag'
import { Select } from '../select'

type SolutionFooterComponentProps = {
  productTags: Tag[]
  solutionTags: Tag[]
}

type Language = {
  id: string | number
  text: string
  disabled: boolean
}

const companies = ['About', 'Blog', 'Career']
const languages = [
  { id: '1', text: 'English', disabled: false },
  { id: '2', text: 'French', disabled: false },
  { id: '3', text: 'Detch', disabled: false },
  { id: '4', text: 'Spanish', disabled: false },
]

function SolutionFooterComponent({ productTags, solutionTags }: SolutionFooterComponentProps) {
  const tagsDefaultShowCount = 3
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null | undefined>(languages[0])
  const [contactEmail, setContactEmail] = useState<string>('')

  const showProductTags = productTags.slice(0, tagsDefaultShowCount)
  const showSolutionTags = solutionTags.slice(0, tagsDefaultShowCount)

  return (
    <>
      <div className="flex flex-col items-center p-1 space-y-4 md:grid md:grid-cols-4 md:space-y-0 md:items-start md:px-4">
        <div className="flex flex-col items-center space-y-4 md:items-start">
          <h4 className="text-sm text-gray-400">TOP PRODUCT TAGS</h4>
          {showProductTags.map((tag) => (
            <Link href={`/search/${tag.slug}`} prefetch={false} key={tag.slug}>
              <h4 className="text-sm text-gray-800 cursor-pointer">{tag.name}</h4>
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center space-y-4 md:items-start">
          <h4 className="text-sm text-gray-400">TOP SOLUTION TAGS</h4>
          {showSolutionTags.map((tag) => (
            <Link href={`/search/${tag.slug}`} prefetch={false} key={tag.slug}>
              <h4 className="text-sm text-gray-800 cursor-pointer">{tag.name}</h4>
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center space-y-4 md:items-start">
          <h4 className="text-sm text-gray-400">COMPANY</h4>
          {companies.map((company) => (
            <h4 className="text-sm text-gray-800 cursor-pointer" key={company} onClick={() => {}}>
              {company}
            </h4>
          ))}
        </div>
        <div className="flex flex-col items-center w-full px-4 space-y-4 md:items-start">
          <h4 className="text-sm text-gray-400">LANGUAGE</h4>
          <Select
            buttonClassName="text-gray-800"
            items={languages}
            selectedItem={selectedLanguage}
            onSelectedItemChange={({ selectedItem }) => setSelectedLanguage(selectedItem)}
            renderSelectedItem={(item) => item?.text ?? 'Select'}
          >
            {languages.map((language) => (
              <Select.Option item={language} key={language.id}>
                {language.text}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex flex-col items-center p-2 mt-10 space-y-4 divide-y bg-primary divide-solid divide-border-default md:hidden">
        <div className="flex flex-col items-center w-full px-1 py-4 space-y-6 text-xs text-white">
          <h4 className="font-bold">SUBSCRIBE TO OUR NEWSLETTER</h4>
          <h4 className="text-xs text-center text-white">
            Latest news, articles, and resources, sent to your inbox weekly
          </h4>
          <div className="flex justify-between w-full bg-white rounded-lg">
            <input
              type="email"
              name="contact"
              placeholder="Enter your email"
              className="pl-2 text-sm text-gray-700 border-none rounded-l-md"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <button className="py-2 bg-green-400 border-none rounded-md min-w-[5rem]">Subscribe</button>
          </div>
        </div>
        <div className="flex flex-col items-center w-full space-y-6">
          <div className="flex justify-around mt-6 space-x-4 other-sites">
            <a
              href="https://twitter.com/TheTaggedWeb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 no-underline"
            >
              <BsFacebook className="p-1 text-2xl text-white rounded-full" />
            </a>
            <a
              href="https://www.linkedin.com/company/taggedweb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 no-underline"
            >
              <BsTwitter className="p-1 text-2xl text-white rounded-full" />
            </a>
            <a
              href="https://www.facebook.com/taggedweb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 no-underline"
            >
              <BsLinkedin className="p-1 text-2xl text-white rounded-md" />
            </a>
          </div>
          <div className="flex items-center pb-4 copyright">
            <AiOutlineCopyrightCircle className="text-sm text-white" />
            <span className="pl-1 text-xs text-white">2021 TaggedWeb All rights reserved.</span>
          </div>
        </div>
      </div>
      <div className="flex-col items-center hidden px-4 py-2 mt-10 space-y-4 divide-y md:flex bg-primary divide-solid divide-border-default">
        <div className="flex items-start justify-between w-full py-4 text-xs text-white">
          <div className="flex flex-col w-full space-y-4">
            <h4 className="font-bold">SUBSCRIBE TO OUR NEWSLETTER</h4>
            <h4 className="text-xs text-white">Latest news, articles, and resources, sent to your inbox weekly</h4>
          </div>
          <div className="flex justify-end w-full">
            <input
              type="email"
              name="contact"
              placeholder="Enter your email"
              className="pl-2 mr-2 text-sm text-gray-700 border-none rounded-md"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <button className="py-2 bg-green-400 border-none rounded-md min-w-[5rem]">Subscribe</button>
          </div>
        </div>
        <div className="flex items-center justify-between w-full py-4">
          <div className="flex items-center copyright">
            <AiOutlineCopyrightCircle className="text-sm text-white" />
            <span className="pl-1 text-xs text-white">2021 TaggedWeb All rights reserved.</span>
          </div>
          <div className="flex justify-around space-x-4 other-sites">
            <a
              href="https://twitter.com/TheTaggedWeb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 no-underline"
            >
              <BsFacebook className="p-1 text-2xl text-white rounded-full" />
            </a>
            <a
              href="https://www.linkedin.com/company/taggedweb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 no-underline"
            >
              <BsTwitter className="p-1 text-2xl text-white rounded-full" />
            </a>
            <a
              href="https://www.facebook.com/taggedweb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 no-underline"
            >
              <BsLinkedin className="p-1 text-2xl text-white rounded-md" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export const SolutionFooter = SolutionFooterComponent
