import React from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { format as dateFormat } from 'date-fns'
import { BsDot } from 'react-icons/bs'
import { QuestionTruncated } from './question-trancate'
import { ServiceQuestion } from '../../types/service-question'
import { Button } from '../button'

type ServiceQuestionCardProps = {
  question: ServiceQuestion
  votedQuestions: { id?: number; question?: number }[]
  upvoteQuestion: Function
  isLoading: boolean
  clickedQuestionId: number
  setClickedQuestionId: Function
}

function ServiceQuestionCardComponent({
  question,
  votedQuestions,
  upvoteQuestion,
  isLoading,
  clickedQuestionId,
  setClickedQuestionId,
}: ServiceQuestionCardProps) {
  let renderButton = (
    <Button
      icon={<FaThumbsUp />}
      size="small"
      onClick={() => {
        upvoteQuestion(question.id, true)
        setClickedQuestionId(question.id)
      }}
      disabled={isLoading}
      loading={clickedQuestionId === question.id && isLoading}
      loadingClassName="w-3 h-3"
    >
      Helpful
    </Button>
  )
  votedQuestions
    .filter((votedQuestion) => votedQuestion?.question === question.id)
    // eslint-disable-next-line array-callback-return
    .map((showQuestion, index) => {
      renderButton = (
        <Button
          key={index}
          icon={<FaThumbsUp className="text-white" />}
          size="small"
          className="bg-primary"
          textClassName="text-white"
          onClick={() => {
            upvoteQuestion(showQuestion?.id, false)
            setClickedQuestionId(question.id)
          }}
          disabled={isLoading}
          loading={clickedQuestionId === question.id && isLoading}
          loadingClassName="text-background-light w-3 h-3"
        >
          Helpful
        </Button>
      )
    })

  return (
    <div className="flex flex-col w-full space-y-3">
      <div className="text-sm font-medium text-text-primary">{question.title}</div>
      <QuestionTruncated description={question.primary_answer} />
      <div className="flex items-center space-x-4 text-xs font-medium text-text-tertiary">
        {renderButton}
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
