import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { Button } from '../button'
import { SearchBar } from './search-bar'
import { Asset } from '../../types/asset'
import { ServiceQuestionCard } from '../service-question-card'

type ServiceDetailQAProps = {
  service: Asset
}

const placeholderComponent = (
  <div className="flex items-center justify-center space-x-2 text-sm">
    <AiOutlineSearch />
    <div>Have a question? Search for answer.</div>
  </div>
)

function QaContentComponent({ service }: ServiceDetailQAProps) {
  const [isAnswered, setIsAnswered] = useState(0)
  const [defaultShowCount, setDefaultShowCount] = useState(2)
  const [viewMore, setViewMore] = useState(false)
  // if (typeof service === 'undefined') return null
  const mockupQuestions = [
    {
      asset: 2,
      title: 'Does this allow creating landing pages and capturing email leads?',
      primary_answer: 'Yes',
      upvotes_count: 0,
      timestamp: '2021-08-27T16:34:08.984019Z',
    },
    {
      asset: 2,
      title: 'How much does membership cost?',
      primary_answer:
        'Nothing! Join Mailchimp & Co for free with any Mailchimp marketing plan, even our free plan. If you have a paid Mailchimp marketing plan, there is no additional cost. Just stay current on your existing plan to maintain access to Mailchimp & Co.',
      upvotes_count: 1,
      timestamp: '2021-08-27T16:34:08.984019Z',
    },
    {
      asset: 2,
      title: 'How much does membership cost?',
      primary_answer:
        'Nothing! Join Mailchimp & Co for free with any Mailchimp marketing plan, even our free plan. If you have a paid Mailchimp marketing plan, there is no additional cost. Just stay current on your existing plan to maintain access to Mailchimp & Co.',
      upvotes_count: 1,
      timestamp: '2021-08-27T16:34:08.984019Z',
    },
  ]

  let questions = mockupQuestions // service.questions
  if (!viewMore) {
    questions = mockupQuestions.slice(0, defaultShowCount) // service.questions.slice(0, defaultShowCount)
  }

  return (
    <div className="md:mt-10 md:ml-3">
      <h1 className="text-base font-medium text-text-primary">Questions and Answers</h1>
      <SearchBar
        className="mt-2"
        onSubmit={(selectedTag) => {
          console.log(selectedTag)
        }}
        isButtonShow={false}
        placeholder={placeholderComponent}
      />
      <div className="flex justify-around w-full px-1 py-1 mt-2 rounded-md bg-text-tertiary md:w-6/12">
        <div
          className={
            isAnswered === 0
              ? 'bg-white rounded-md text-sm text-center cursor-pointer px-1'
              : 'cursor-pointer text-center text-sm px-1'
          }
          onClick={() => setIsAnswered(0)}
        >
          Unanswered Questions
        </div>
        <div
          className={
            isAnswered === 1
              ? 'bg-white rounded-md text-sm text-center cursor-pointer px-1'
              : 'cursor-pointer text-center text-sm px-1'
          }
          onClick={() => setIsAnswered(1)}
        >
          Answered Questions
        </div>
      </div>
      {questions.map((item, index) => (
        <div className="mt-4" key={`${item.title}${index}`}>
          <ServiceQuestionCard question={item} />
        </div>
      ))}
      {questions.length > defaultShowCount && viewMore ? (
        <div
          className="flex self-start w-full px-0 mt-2 text-sm border-0 cursor-pointer text-text-tertiary"
          onClick={() => setViewMore(false)}
        >
          Load Less Answered questions
          <HiChevronUp className="self-center ml-2 text-text-tertiary" />
        </div>
      ) : (
        <div
          className="flex self-start w-full px-0 mt-2 text-sm border-0 cursor-pointer text-text-tertiary"
          onClick={() => setViewMore(true)}
        >
          Load More Answered questions
          <HiChevronDown className="self-center ml-2 text-text-tertiary" />
        </div>
      )}
      <div className="w-full px-2 py-4 mt-4 text-center rounded-md bg-background-default md:flex md:justify-center">
        <div className="text-sm text-primary">Don't you see the answer you're looking for?</div>
        <Button className="inline-flex mt-2 text-white bg-primary md:mt-0 md:ml-8" size="small">
          Post your question
        </Button>
      </div>
    </div>
  )
}

export const QaContent = QaContentComponent
