/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import toast from 'react-hot-toast'
import { TOAST_QUESTION_ANSWER_SUCCESS, TOAST_QUESTION_UPVOTE_SUCCESS } from '@taggedweb/utils/token-id'
import { ServiceQuestion } from './service-question'

export default {
  title: 'General/ServiceQuestion',
  component: ServiceQuestion,
} as Meta

const mockupQuestions = [
  {
    id: 1,
    asset: 2,
    title: 'Does this allow creating landing pages and capturing email leads?',
    created: '2021-10-03T21:03:56.582362Z',
    primary_answer: 'Yes',
    upvotes_count: 0,
  },
  {
    id: 2,
    asset: 2,
    title: 'How much does membership cost?',
    created: '2021-10-03T21:03:56.582362Z',
    primary_answer:
      'Nothing! Join Mailchimp & Co for free with any Mailchimp marketing plan, even our free plan. If you have a paid Mailchimp marketing plan, there is no additional cost. Just stay current on your existing plan to maintain access to Mailchimp & Co.',
    upvotes_count: 1,
  },
  {
    id: 3,
    asset: 2,
    title: 'Is support free mailchimp in this site?',
    created: '2021-10-03T21:03:56.582362Z',
    primary_answer: null,
    upvotes_count: 0,
  },
  {
    id: 4,
    asset: 2,
    title: 'Is this popular?',
    created: '2021-10-03T23:17:58.718531Z',
    primary_answer: 'Yes, of course.',
    upvotes_count: 1,
  },
  {
    id: 5,
    asset: 2,
    title: 'Is support free mailchimp in this site2?',
    created: '2021-10-03T21:03:56.582362Z',
    primary_answer: null,
    upvotes_count: 0,
  },
  {
    id: 6,
    asset: 2,
    title: 'Is support free mailchimp in this site3?',
    created: '2021-10-03T21:03:56.582362Z',
    primary_answer: null,
    upvotes_count: 0,
  },
]

export function DefaultServiceQuestion() {
  const [isAnswered, setIsAnswered] = useState(true)
  const [addQuestionName, setAddQuestionName] = useState('')
  const [addQuestionNameErrorMessage, setAddQuestionNameErrorMessage] = useState('')
  const [votedQuestions, setVotedQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [clickedQuestionId, setClickedQuestionId] = useState(0)

  const addQuestionAction = async () => {
    if (addQuestionName === '') {
      setAddQuestionNameErrorMessage('This field is not valid')
    } else {
      setAddQuestionNameErrorMessage('')
      setAddQuestionName('')
      setIsAnswered(false)
    }
  }

  const answerQuestionAction = async (answerQuestion, questionId) => {
    toast.success('Answered successfully.', {
      id: TOAST_QUESTION_ANSWER_SUCCESS,
    })
  }

  const upvoteQuestion = async (id, isAddVote) => {
    toast.success('Voted successfully.', {
      id: TOAST_QUESTION_UPVOTE_SUCCESS,
    })
  }

  return (
    <>
      <ServiceQuestion
        isShowAnswered={isAnswered}
        serviceQuestions={mockupQuestions}
        addQuestionName={addQuestionName}
        setAddQuestionName={setAddQuestionName}
        addQuestionNameErrorMessage={addQuestionNameErrorMessage}
        addQuestionAction={addQuestionAction}
        answerQuestionAction={answerQuestionAction}
        votedQuestions={votedQuestions}
        upvoteQuestion={upvoteQuestion}
        isLoading={isLoading}
        setClickedQuestionId={setClickedQuestionId}
        clickedQuestionId={clickedQuestionId}
        id="qa"
      />
    </>
  )
}
