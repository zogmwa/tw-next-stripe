import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'
import { convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import { Button } from '../button'
import { SearchQuestionBar } from './search-question-bar'
import { Asset } from '../../types/asset'
import { ServiceQuestionCard } from '../service-question-card'

// https://github.com/jpuri/react-draft-wysiwyg/issues/893
const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false })

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
  const [isAnswered, setIsAnswered] = useState(true)
  const [viewMore, setViewMore] = useState(false)
  const [editor, setEditor] = useState(null)
  if (typeof service === 'undefined') return null

  const defaultShowCount = 2
  let tempQuestions = service.questions
  if (isAnswered) {
    tempQuestions = service.questions.filter((item) => item.primary_answer !== '')
  } else {
    tempQuestions = service.questions.filter((item) => item.primary_answer === '')
  }
  let questions = tempQuestions
  if (!viewMore) {
    questions = tempQuestions.slice(0, defaultShowCount)
  }

  return (
    <div className="md:mt-10 md:ml-3">
      <h1 className="text-base font-medium text-text-primary">Questions and Answers</h1>
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
        questions.map((item, index) => (
          <div className="mt-4" key={`${item.title}${index}`}>
            <ServiceQuestionCard question={item} />
          </div>
        ))}
      {!isAnswered &&
        questions.map((item, index) => (
          <div className="mt-4" key={`${item.title}${index}`}>
            <div className="font-medium text-text-primary">{item.title}</div>
            <Editor
              editorState={editor}
              toolbarClassName="bg-primary"
              editorClassName="bg-white"
              onEditorStateChange={(editorState) => setEditor(editorState)}
            />
            <Button
              className="inline-flex mt-1 text-white bg-primary"
              size="small"
              onClick={() => console.log(draftToHtml(convertToRaw(editor.getCurrentContent())))}
            >
              Post Answer
            </Button>
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
        <Button className="inline-flex mt-2 text-white bg-primary md:mt-0 md:ml-8" size="small">
          Post your question
        </Button>
      </div>
    </div>
  )
}

export const QaContent = QaContentComponent
