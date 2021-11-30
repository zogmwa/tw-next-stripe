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

export function FooterComponent({ topSaasTags = [], topSolutionTags = [] }: FooterComponentProps) {
  const saasTagsDefaultShowCount = 10
  const solutionTagsDefaultShowCount = 5

  const showSolutionTags = {
    title: 'TOP SOLUTION TAGS',
    content: topSolutionTags.slice(0, solutionTagsDefaultShowCount),
  }
  const showSaasTags = { title: 'TOP SOFTWARE TAGS', content: topSaasTags.slice(0, saasTagsDefaultShowCount) }
  const companies = {
    title: 'COMPANY',
    content: [
      { name: 'About', slug: '' },
      { name: 'Blog', slug: '' },
      { name: 'Careers', slug: '' },
    ],
  }
  const languages = [{ id: '1', text: 'English', disabled: false }]

  return (
    <div className="w-full pt-6 mx-auto">
      <div className="flex flex-col items-center p-1 space-y-4 md:grid md:grid-cols-4 md:space-y-0 md:items-start md:px-4">
        <FooterSubComponent service={showSolutionTags} />
        <FooterSubComponent service={showSaasTags} />
        <FooterSubComponent service={companies} />
        <LanguageComponent languages={languages} />
      </div>
      <SubscribeComponent />
    </div>
  )
}

export function FooterSubComponent({ service }) {
  return (
    <div key={service} className="flex flex-col items-center space-y-2 md:items-start">
      <h2 className="mb-4 text-sm font-bold text-gray-400">{service.title}</h2>
      {service.content.map((tag) => (
        <Link href={`/solutions/${tag.slug}`} prefetch={false} key={tag.slug}>
          <h3 className="text-sm text-center text-gray-800 cursor-pointer md:text-left hover:underline">{tag.name}</h3>
        </Link>
      ))}
    </div>
  )
}

export function LanguageComponent({ languages }) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null | undefined>(languages[0])

  return (
    <div className="flex flex-col items-center w-full space-y-4 md:items-start">
      <h4 className="text-sm font-bold text-gray-400">LANGUAGE</h4>
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
  )
}
