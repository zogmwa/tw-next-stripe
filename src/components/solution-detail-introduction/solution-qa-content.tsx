import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { TruncatedDescription } from '../truncated-description'

function SolutionFAQComponent({ questions, solutionSlug }) {
  const defaultShowCount = 2
  const [searchQuestion, setSearchQuestion] = useState('')
  const [isPressEnter, setIsPressEnter] = useState(false)
  const [allQuestion, setAllQuestion] = useState(questions)
  const [showQuestions, setShowQuestions] = useState(questions.slice(0, defaultShowCount))
  const [isShowAll, setIsShowAll] = useState(false)

  useEffect(() => {
    async function updateQuestion() {
      if (searchQuestion === '' || searchQuestion.trim().length >= 3) {
        try {
          const { data } = await axios.get(
            `/api/autocomplete/solution-questions/${solutionSlug}/?search_query=${searchQuestion}`,
          )
          const searchedQuestions = data.results

          setAllQuestion(searchedQuestions)
          setShowQuestions(searchedQuestions.slice(0, defaultShowCount))
          toast.success('Loaded Questions List')
        } catch (error) {
          // eslint-disable-next-line
          console.log(error)
        }
      } else {
        toast.error('Type at least 3 letters.')
      }
      setIsPressEnter(false)
    }

    if (isPressEnter) {
      updateQuestion()
    }
  }, [isPressEnter])

  useEffect(() => {
    if (isShowAll) setShowQuestions(allQuestion)
    else setShowQuestions(allQuestion.slice(0, 2))
  }, [isShowAll])

  return (
    <div className="flex flex-col">
      <h4 className="font-bold text-md">FAQs</h4>
      {allQuestion.length >= 10 && (
        <div className="flex items-center w-full px-2 py-1 mt-4 border border-solid rounded-md md:px-4 border-border-default">
          <AiOutlineSearch className="mr-1 md:mr-2 text-md text-text-tertiary" />
          <input
            type="text"
            className="w-full focus:ring-0"
            placeholder="Have a question? Search for answer."
            value={searchQuestion}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsPressEnter(true)
              }
            }}
            onChange={(e) => setSearchQuestion(e.target.value)}
          />
        </div>
      )}
      {showQuestions.map((question, index) => (
        <div className="flex flex-col" key={index}>
          <h4 className="mt-4 font-bold text-md text-text-primary">{question.title}</h4>
          <TruncatedDescription description={question.primary_answer} className="mt-3 space-x-0" maxLength={220} />
        </div>
      ))}
      {allQuestion.length > 2 &&
        (isShowAll ? (
          <div
            className="flex self-start w-full px-0 mt-2 text-sm border-0 cursor-pointer text-text-tertiary"
            onClick={() => setIsShowAll(false)}
          >
            Load Less Answered Questions
            <HiChevronUp className="self-center ml-2 text-text-tertiary" />
          </div>
        ) : (
          <div
            className="flex self-start w-full px-0 mt-2 text-sm border-0 cursor-pointer text-text-tertiary"
            onClick={() => setIsShowAll(true)}
          >
            Load More Answered Questions
            <HiChevronDown className="self-center ml-2 text-text-tertiary" />
          </div>
        ))}
    </div>
  )
}

export const SolutionFAQ = SolutionFAQComponent
