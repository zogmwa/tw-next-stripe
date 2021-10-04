import React from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { format as dateFormat } from 'date-fns'
import { BsDot } from 'react-icons/bs'
import { ServiceQuestion } from '../../types/service-question'
import { TruncatedDescription } from '../truncated-description'
import { Button } from '../button'
import { MAX_PRIMARY_ANS_LENGTH } from '../../utils/constants'

type ServiceQuestionCardProps = {
  question: ServiceQuestion
}

function ServiceQuestionCardComponent({ question }: ServiceQuestionCardProps) {
  return (
    <div className="flex flex-col w-full space-y-3">
      <div className="text-sm font-medium text-text-primary">{question.title}</div>
      <TruncatedDescription
        description={question.primary_answer}
        maxLength={MAX_PRIMARY_ANS_LENGTH}
        className="text-text-secondary"
      />
      <div className="flex items-center space-x-4 text-xs font-medium text-text-tertiary">
        <Button icon={<FaThumbsUp />} size="small">
          Helpful
        </Button>
        <div>{question.upvotes_count} people found this question helpful</div>
        <div className="hidden md:flex md:space-x-3">
          <BsDot className="self-center" />
          <span>{question.created && dateFormat(new Date(question.created), 'd MMMM, yyyy')}</span>
        </div>
      </div>
    </div>
  )
}

export const ServiceQuestionCard = ServiceQuestionCardComponent
