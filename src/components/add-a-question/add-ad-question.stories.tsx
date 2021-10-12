import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { AddAQuestion } from './add-a-question'

export default {
  title: 'General/AddAQuestion',
  component: AddAQuestion,
} as Meta

export function DefaultAddAHighlight() {
  const [addQuestionName, setAddQuestionName] = useState('')
  const [addQuestionNameErrorMessage, setAddQuestionNameErrorMessage] = useState('')

  const addQuestionAction = async () => {
    if (addQuestionName === '') {
      setAddQuestionNameErrorMessage('This field is valid')
    } else {
      setAddQuestionNameErrorMessage('')
      setAddQuestionName('')
    }
  }

  return (
    <AddAQuestion
      addQuestionName={addQuestionName}
      setAddQuestionName={setAddQuestionName}
      addQuestionNameErrorMessage={addQuestionNameErrorMessage}
      addQuestionAction={addQuestionAction}
    />
  )
}
