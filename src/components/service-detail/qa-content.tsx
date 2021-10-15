import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { ServiceQuestion } from '../service-questions'
import { Asset } from '../../types/asset'
import { toggleAddQuestion } from '../../queries/service'
import {
  toggleAnswerQuestion,
  fetchQuestions,
  fetchVotedQuestions,
  toggleUpVoteQuestion,
  toggleDownVoteQuestion,
} from '../../queries/service'

type ServiceDetailQAProps = {
  service: Asset
}

function QaContentComponent({ service }: ServiceDetailQAProps) {
  if (typeof service === 'undefined') return null

  const [isAnswered, setIsAnswered] = useState(true)
  const [addQuestionName, setAddQuestionName] = useState('')
  const [addQuestionNameErrorMessage, setAddQuestionNameErrorMessage] = useState('')
  const [serviceQuestions, setServiceQuestions] = useState(service.questions)
  const [votedQuestions, setVotedQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [clickedQuestionId, setClickedQuestionId] = useState(0)

  useEffect(() => {
    async function getVotedQuestions() {
      const votedQuestionList = await fetchVotedQuestions(service?.slug)
      setVotedQuestions(votedQuestionList)
    }

    getVotedQuestions()
  }, [])

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
    setIsLoading(true)
    setClickedQuestionId(questionId)
    const confirmQuestion = answerQuestion.replace(/\s/g, '').replace(/\n/g, '')
    if (confirmQuestion !== '' && confirmQuestion !== '<p></p>') {
      const data = await toggleAnswerQuestion(questionId, answerQuestion)
      if (data) {
        const questions = await fetchQuestions(service.slug)
        setServiceQuestions(questions)
        toast.success('Answered successfully.')
        setIsAnswered(true)
      }
    } else {
      toast.error('Please enter your answer.')
    }
    setIsLoading(false)
    setClickedQuestionId(0)
  }

  const upvoteQuestion = async (id, isAddVote) => {
    setIsLoading(true)
    let data = null
    if (isAddVote) {
      data = await toggleUpVoteQuestion(id)
    } else {
      data = await toggleDownVoteQuestion(id)
    }

    if (data) {
      const questions = await fetchQuestions(service.slug)
      setServiceQuestions(questions)
      let votedQuestionList = []
      questions.map((question) => {
        if (question.my_asset_question_vote) {
          votedQuestionList.push({
            id: question.my_asset_question_vote,
            question: question.id,
          })
        }
      })
      setVotedQuestions(votedQuestionList)
    } else {
      toast.error('Please try again later.')
    }
    setIsLoading(false)
    setClickedQuestionId(0)
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
        votedQuestions={votedQuestions}
        upvoteQuestion={upvoteQuestion}
        isLoading={isLoading}
        setClickedQuestionId={setClickedQuestionId}
        clickedQuestionId={clickedQuestionId}
      />
    </>
  )
}

export const QaContent = QaContentComponent
