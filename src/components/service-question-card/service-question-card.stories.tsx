import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import toast from 'react-hot-toast'
import { ServiceQuestionCard } from './service-question-card'

export default {
  title: 'General/ServiceQuestionCard',
  component: ServiceQuestionCard,
} as Meta

export function DefaultServiceQuestionCard() {
  const [clickedQuestionId, setClickedQuestionId] = useState(0)

  const question = {
    id: 1,
    asset: 2,
    title: 'Is this better than the one Dinesh was working on while at Pied Piper?',
    primary_answer:
      'Proin id vestibulum mi. Maecenas interdum ligula ac nunc laoreet rhoncus. Morbi eleifend sodales elit vitae ornare. Pellentesque consequat velit id orci accumsan, pretium porta nisi fringilla.',
    upvotes_count: 10,
    created: '2021-08-27T16:34:08.984019Z',
  }
  const votedQuestionList = []
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const upvoteQuestion = (questionId, status) => {
    toast.success('Voted successfully.')
  }

  return (
    <ServiceQuestionCard
      question={question}
      votedQuestions={votedQuestionList}
      upvoteQuestion={upvoteQuestion}
      isLoading={false}
      clickedQuestionId={clickedQuestionId}
      setClickedQuestionId={setClickedQuestionId}
    />
  )
}
