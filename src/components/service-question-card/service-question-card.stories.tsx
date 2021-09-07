import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ServiceQuestionCard } from './service-question-card'

export default {
  title: 'General/ServiceQuestionCard',
  component: ServiceQuestionCard,
} as Meta

export function DefaultServiceQuestionCard() {
  const question = {
    asset: 2,
    title: 'Is this better than the one Dinesh was working on while at Pied Piper?',
    primary_answer:
      'Proin id vestibulum mi. Maecenas interdum ligula ac nunc laoreet rhoncus. Morbi eleifend sodales elit vitae ornare. Pellentesque consequat velit id orci accumsan, pretium porta nisi fringilla.',
    upvotes_count: 10,
    timestamp: '2021-08-27T16:34:08.984019Z',
  }

  return <ServiceQuestionCard question={question} />
}
