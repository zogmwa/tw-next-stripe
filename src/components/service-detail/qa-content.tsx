/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { ServiceQuestion } from '../service-questions'
import { Asset } from '../../types/asset'
import { toggleAddQuestion } from '../../queries/service'
import { toggleAnswerQuestion, fetchQuestions } from '../../queries/service'

type ServiceDetailQAProps = {
  service: Asset
}

function QaContentComponent({ service }: ServiceDetailQAProps) {
  if (typeof service === 'undefined') return null

  const [isAnswered, setIsAnswered] = useState(true)
  const [addQuestionName, setAddQuestionName] = useState('')
  const [addQuestionNameErrorMessage, setAddQuestionNameErrorMessage] = useState('')
  const [serviceQuestions, setServiceQuestions] = useState(service.questions)

  const addQuestionAction = async () => {
    if (addQuestionName === '') {
      setAddQuestionNameErrorMessage('This field is not valid')
    } else {
      const addedQuestion = await toggleAddQuestion(service?.id, addQuestionName)
      if (addedQuestion) {
        const questions = serviceQuestions
        questions.push(addedQuestion)
        setServiceQuestions(questions)
        toast.success('Added a question successfully.')
        setAddQuestionNameErrorMessage('')
        setAddQuestionName('')
        setIsAnswered(false)
      }
    }
  }

  const answerQuestionAction = async (answerQuestion, questionId) => {
    const confirmQuestion = answerQuestion.replace(/\s/g, '').replace(/\n/g, '')
    if (confirmQuestion !== '' && confirmQuestion !== '<p></p>') {
      const data = await toggleAnswerQuestion(questionId, answerQuestion)
      if (data) {
        const questions = await fetchQuestions(service.slug)
        setServiceQuestions(questions)
        toast.success(`Answered successfully.`)
        setIsAnswered(true)
      }
    } else {
      toast.error(`Please enter your answer.`)
    }
  }

  return (
    <>
      <ServiceQuestion
        isShowAnswered={isAnswered}
        serviceQuestions={serviceQuestions}
        addQuestionName={addQuestionName}
        setAddQuestionName={setAddQuestionName}
        addQuestionNameErrorMessage={addQuestionNameErrorMessage}
        addQuestionAction={addQuestionAction}
        answerQuestionAction={answerQuestionAction}
      />
    </>
  )
}

export const QaContent = QaContentComponent
