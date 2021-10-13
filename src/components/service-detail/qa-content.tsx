import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { ServiceQuestion } from '../service-questions'
import { Asset } from '../../types/asset'
import { toggleAddQuestion } from '../../queries/service'

type ServiceDetailQAProps = {
  service: Asset
}

function QaContentComponent({ service }: ServiceDetailQAProps) {
  if (typeof service === 'undefined') return null

  const [addQuestionName, setAddQuestionName] = useState('')
  const [addQuestionNameErrorMessage, setAddQuestionNameErrorMessage] = useState('')
  const [serviceQuestions, setServiceQuestions] = useState(service.questions)

  const addQuestionAction = async () => {
    if (addQuestionName === '') {
      setAddQuestionNameErrorMessage('This field is not valid')
    } else {
      const addedQuestion = await toggleAddQuestion(service?.id, addQuestionName)
      if (addedQuestion) {
        let questions = serviceQuestions
        questions.push(addedQuestion)
        setServiceQuestions(questions)
        toast.success(`Added a question successfully.`)
        setAddQuestionNameErrorMessage('')
        setAddQuestionName('')
      }
    }
  }

  return (
    <>
      <ServiceQuestion
        serviceQuestions={serviceQuestions}
        addQuestionName={addQuestionName}
        setAddQuestionName={setAddQuestionName}
        addQuestionNameErrorMessage={addQuestionNameErrorMessage}
        addQuestionAction={addQuestionAction}
      />
    </>
  )
}

export const QaContent = QaContentComponent
