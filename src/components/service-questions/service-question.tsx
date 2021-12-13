import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { useRequireLogin } from '@taggedweb/hooks/use-require-login'
import { Button } from '../button'
import { SearchQuestionBar } from '../service-detail/search-question-bar'
import { ServiceQuestionCard } from '../service-question-card'
import { AddAQuestion } from '../add-a-question'
import { Modal } from '../Modal'
// import { QuestionEditor } from './question-editor'
const QuestionEditor = dynamic<{ questionId; answerQuestionAction; clickedQuestionId; isLoading }>(
  () => import('./question-editor').then((mod) => mod.QuestionEditor),
  {
    ssr: false,
  },
)

const placeholderComponent = (
  <div className="flex items-center justify-center space-x-2 text-sm">
    <AiOutlineSearch />
    <div>Have a question? Search for answer.</div>
  </div>
)

function ServiceQuestionComponent({
  isShowAnswered,
  serviceQuestions,
  addQuestionName,
  setAddQuestionName,
  addQuestionNameErrorMessage,
  addQuestionAction,
  answerQuestionAction,
  votedQuestions,
  upvoteQuestion,
  isLoading,
  clickedQuestionId,
  setClickedQuestionId,
  id,
}) {
  const [isAnswered, setIsAnswered] = useState(isShowAnswered)
  const [viewMore, setViewMore] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { requireLoginBeforeAction } = useRequireLogin()
  const votedQuestionList = votedQuestions ?? []

  const defaultShowCount = 2
  let tempQuestions = serviceQuestions
  tempQuestions.sort((questionA, questionB) => {
    const dateA = new Date(questionA.created)
    const dateB = new Date(questionB.created)
    return (dateA.getTime() - dateB.getTime()) * -1
  })
  if (isAnswered) {
    tempQuestions = serviceQuestions.filter((item) => item.primary_answer !== null)
  } else {
    tempQuestions = serviceQuestions.filter((item) => item.primary_answer === null)
  }
  let questions = tempQuestions
  if (!viewMore) {
    questions = tempQuestions.slice(0, defaultShowCount)
  }

  return (
    <div className="md:mt-10">
      <a href={`#scrollable-${id}`}>
        <h1 className="text-base font-medium text-text-primary">Questions and Answers</h1>
      </a>
      <SearchQuestionBar
        className="mt-2"
        onSubmit={(selectedQuestion) => {
          console.log(selectedQuestion)
        }}
        isButtonShow={false}
        placeholder={placeholderComponent}
      />
      <div className="flex justify-around w-full px-1 py-1 mt-2 rounded-md bg-background-default md:w-6/12">
        <div
          className={
            isAnswered
              ? 'bg-white rounded-md text-sm text-center cursor-pointer px-1'
              : 'cursor-pointer text-center text-sm px-1'
          }
          onClick={() => setIsAnswered(true)}
        >
          Answered Questions
        </div>
        <div
          className={
            !isAnswered
              ? 'bg-white rounded-md text-sm text-center cursor-pointer px-1'
              : 'cursor-pointer text-center text-sm px-1'
          }
          onClick={() => setIsAnswered(false)}
        >
          Unanswered Questions
        </div>
      </div>
      {isAnswered &&
        questions.map((item, index) => {
          return (
            <div className="mt-4" key={`${item.title}${index}`}>
              <ServiceQuestionCard
                question={item}
                votedQuestions={votedQuestionList}
                upvoteQuestion={upvoteQuestion}
                isLoading={isLoading}
                clickedQuestionId={clickedQuestionId}
                setClickedQuestionId={setClickedQuestionId}
              />
            </div>
          )
        })}
      {!isAnswered &&
        questions.map((item, index) => (
          <div className="mt-4" key={`${item.title}${index}`}>
            <div className="text-sm font-medium text-text-primary">{item.title}</div>
            <QuestionEditor
              questionId={item.id}
              answerQuestionAction={answerQuestionAction}
              clickedQuestionId={clickedQuestionId}
              isLoading={isLoading}
            />
          </div>
        ))}
      {tempQuestions.length > defaultShowCount ? (
        viewMore ? (
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
        )
      ) : null}
      <div className="w-full px-2 py-4 mt-4 text-center rounded-md bg-background-default md:flex md:justify-center">
        <div className="text-sm text-primary">Don&apos;t you see the answer you&apos;re looking for</div>
        <Button
          onClick={requireLoginBeforeAction(() => setIsOpen(!isOpen))}
          className="inline-flex mt-2 bg-primary md:mt-0 md:ml-8"
          textClassName="text-white"
          size="small"
        >
          Post your question
        </Button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <AddAQuestion
            setIsOpen={setIsOpen}
            addQuestionName={addQuestionName}
            setAddQuestionName={setAddQuestionName}
            addQuestionNameErrorMessage={addQuestionNameErrorMessage}
            addQuestionAction={addQuestionAction}
          />
        </Modal>
      </div>
    </div>
  )
}

export const ServiceQuestion = ServiceQuestionComponent
