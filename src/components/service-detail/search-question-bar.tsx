import React, { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import clsx from 'clsx'
import AsyncSelect from 'react-select/async'
import toast from 'react-hot-toast'
import { searchSuggestions } from '@taggedweb/queries/question'
import { Button } from '../button'

type SearchByQuestionsProps = {
  onSubmit?: (query: string) => void
  className?: string
  style?: React.CSSProperties
  questionsArr?: { value: string; label: string }[]
  isButtonShow?: boolean
  placeholder?: any
}

const placeholderComponent = (
  <div className="flex items-center justify-center space-x-2">
    <AiOutlineSearch />
    <div className="hidden md:flex">Start by typing questions of interest, e.g. investing, artificial-intelligence</div>
    <div className="md:hidden">Enter questions of interest</div>
  </div>
)

export function SearchQuestionBar({
  onSubmit,
  className,
  style,
  questionsArr,
  isButtonShow = true,
  placeholder = placeholderComponent,
}: SearchByQuestionsProps) {
  const [questions, setQuestions] = useState<string[]>([])
  const [, setError] = useState<string>('')
  const [defaultQuestions, setDefaultQuestions] = useState<{ value: string; label: string }[]>(questionsArr)

  useEffect(() => {
    if (questionsArr) {
      setDefaultQuestions(questionsArr)
      const questions = questionsArr.map((question) => question.value)
      setQuestions(questions)
    }
    // eslint-disable-next-line
  }, [defaultQuestions])

  /**
   * Handler function called when the user is searching.
   *
   * @param text - the text entered in the select menu
   */

  const handleChange = (value: { value: string; label: string }[]) => {
    const questions = value.map((question) => question.value)
    if (questions.length > 5) {
      setError('A maximum of 5 questions are allowed.')
      toast.error('A maximum of 5 questions are allowed.', {
        id: 'question-limit-error',
      })
    } else {
      setError('')
      setQuestions(questions)
    }
  }

  /**
   * Handler function called when the user clicks on the "submit" button
   * and all the fields are valid
   */
  function handleSubmit(event: React.SyntheticEvent) {
    // as onSubmit is optional, first check if the field is required
    // or not before proceeding
    event.preventDefault()
    if (questions.length === 0) {
      setError('Please enter a question')
      toast.error('Please enter a question', {
        id: 'question-empty-error',
      })
    } else {
      setError('')
      if (onSubmit) {
        // form.getFieldValue(fieldName) would return the value of the field
        const questionsSelected = questions.join(',')
        onSubmit(questionsSelected)
      }
    }
  }

  return (
    <form
      className={clsx('flex flex-col md:flex-row space-x-0 md:space-x-2 w-full', className)}
      style={style}
      onSubmit={handleSubmit}
    >
      <AsyncSelect
        defaultValue={defaultQuestions}
        isMulti
        name="questions"
        components={{ DropdownIndicator: () => null }}
        onChange={handleChange}
        loadOptions={searchSuggestions}
        instanceId="AddQuestions"
        className="flex-1 mb-2 md:mb-0 remove-input-txt-border"
        classNamePrefix="select"
        placeholder={placeholder}
      />
      {isButtonShow && (
        <Button type="submit" buttonType="primary">
          Search
        </Button>
      )}
    </form>
  )
}
