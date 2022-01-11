/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react'
import Link from 'next/link'
import { Tag } from '../../types/tag'
import { Select } from '../select'
import { SubscribeComponent } from './newsletter-subscribe'
import { NavAccordion } from '../navbar-menu/navbar-accordion'

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
  const resources = {
    title: 'RESOURCES',
    content: [
      { name: 'About', slug: 'about' },
      { name: 'Blog', slug: 'blog' },
      { name: 'Careers', slug: '' },
    ],
  }
  const languages = [{ id: '1', text: 'English', disabled: false }]

  return (
    <div className="w-full pt-6 mx-auto ">
      <div className="flex flex-col items-start w-full p-1 mx-auto md:grid md:grid-cols-4 md:space-y-0 md:items-start md:px-4">
        <FooterSubComponent service={showSolutionTags} type="solutions" />
        <FooterSubComponent service={showSaasTags} type="softwares" />
        <FooterSubComponent service={resources} type="resources" />
        <LanguageComponent languages={languages} />
      </div>
      <SubscribeComponent />
    </div>
  )
}

export function FooterSubComponent({ service, type }) {
  const [expanded, setExpanded] = useState<string>('')

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : '')
  }

  return (
    <>
      <div key={service} className="flex-col items-center hidden space-y-2 text-sm md:flex md:items-start">
        <h2 className="px-3 mb-4 font-bold text-gray-400">{service.title}</h2>
        {service.content.map((tag) => {
          if (type !== 'resources') {
            return (
              <Link href={`/${type}/${tag.slug}`} prefetch={false} key={tag.slug}>
                <a>
                  <h3 className="px-3 text-center text-gray-800 cursor-pointer md:text-left hover:underline">
                    {tag.name}
                  </h3>
                </a>
              </Link>
            )
          } else {
            if (tag.name === 'Careers') {
              return (
                <a
                  href="https://angel.co/company/taggedweb/jobs"
                  target="_blank"
                  rel="noopener noreferrer"
                  key="careers"
                >
                  <h3 className="px-3 text-center text-gray-800 cursor-pointer md:text-left hover:underline">
                    {tag.name}
                  </h3>
                </a>
              )
            } else if (tag.name === 'Blog') {
              return (
                <Link href={`/${tag.slug}`} prefetch={false} key={tag.slug}>
                  <a target="_blank" rel="noopener noreferrer">
                    <h3 className="px-3 text-center text-gray-800 cursor-pointer md:text-left hover:underline">
                      {tag.name}
                    </h3>
                  </a>
                </Link>
              )
            } else {
              return (
                <Link href={`/${tag.slug}`} prefetch={false} key={tag.slug}>
                  <a>
                    <h3 className="px-3 text-center text-gray-800 cursor-pointer md:text-left hover:underline">
                      {tag.name}
                    </h3>
                  </a>
                </Link>
              )
            }
          }
        })}
      </div>
      {/* This is for the mobile view footer */}
      <div className="flex w-full md:hidden">
        <NavAccordion
          expanded={expanded}
          handleChange={handleChange}
          dropdownData={service.content}
          navItem={service.title}
          pathName={type}
          isFooter={true}
        />
      </div>
    </>
  )
}

export function LanguageComponent({ languages }) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null | undefined>(languages[0])

  return (
    <div className="flex flex-col w-full px-4 my-3 space-y-4 md:items-start">
      <h4 className="items-start text-sm font-bold text-gray-400">LANGUAGE</h4>
      <Select
        buttonClassName="text-gray-800 !py-2"
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
