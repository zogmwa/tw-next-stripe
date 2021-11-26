import React, { useState } from 'react'
import Link from 'next/link'
import { Tag } from '../../types/tag'
import { Select } from '../select'
import { SubscribeComponent } from './newsletter-subscribe'

type FooterComponentProps = {
  topSaasTags: Tag[]
  topSolutionTags: Tag[]
}

type Language = {
  id: string | number
  text: string
  disabled: boolean
}

const companies = ['About', 'Blog', 'Careers']
const languages = [{ id: '1', text: 'English', disabled: false }]

export function FooterComponent({ topSaasTags = [], topSolutionTags = [] }: FooterComponentProps) {
  const tagsDefaultShowCount = 5
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null | undefined>(languages[0])

  const showSaasTags = topSaasTags.slice(0, tagsDefaultShowCount)
  const showSolutionTags = topSolutionTags.slice(0, tagsDefaultShowCount)

  return (
    <div className="w-full pt-6 mx-auto">
      <div className="flex flex-col items-center p-1 space-y-4 md:grid md:grid-cols-4 md:space-y-0 md:items-start md:px-4">
        <div className="flex flex-col items-center space-y-4 md:items-start">
          <h2 className="text-sm text-gray-400">TOP SOLUTION TAGS</h2>
          {showSolutionTags.map((tag) => (
            <Link href={`/solutions/${tag.slug}`} prefetch={false} key={tag.slug}>
              <h3 className="text-base text-gray-800 cursor-pointer">{tag.name}</h3>
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center space-y-4 md:items-start">
          <h2 className="text-sm text-gray-400">TOP SOFTWARE TAGS</h2>
          {showSaasTags.map((tag) => (
            <Link href={`/softwares/${tag.slug}`} prefetch={false} key={tag.slug}>
              <h3 className="text-base text-gray-800 cursor-pointer">{tag.name}</h3>
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center space-y-4 md:items-start">
          <h2 className="text-sm text-gray-400">COMPANY</h2>
          {companies.map((company) => (
            <h3 className="text-base text-gray-800 cursor-pointer" key={company} onClick={() => {}}>
              {company}
            </h3>
          ))}
        </div>
        <div className="flex flex-col items-center w-full px-4 space-y-4 md:items-start">
          <h4 className="text-sm text-gray-400">LANGUAGE</h4>
          <Select
            buttonClassName="text-gray-800 !px-3 !py-2"
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
      <SubscribeComponent />
    </div>
  )
}
