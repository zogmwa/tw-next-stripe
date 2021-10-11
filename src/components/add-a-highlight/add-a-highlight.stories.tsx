import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { AddAHighlight } from './add-a-highlight'

export default {
  title: 'General/AddAHighlight',
  component: AddAHighlight,
} as Meta

export function DefaultAddAHighlight() {
  const [addAttributeName, setAddAttributeName] = useState('')
  const [addAttributeCon, setAddAttributeCon] = useState(false)
  const [addAttributeNameErrorMessage, setAddAttributeNameErrorMessage] = useState('')

  const addAttributeAction = () => {
    if (addAttributeName === '') {
      setAddAttributeNameErrorMessage('This field is valid')
    } else {
      setAddAttributeNameErrorMessage('')
      setAddAttributeName('')
      setAddAttributeCon(false)
    }
  }

  return (
    <AddAHighlight
      addAttributeName={addAttributeName}
      setAddAttributeName={setAddAttributeName}
      addAttributeCon={addAttributeCon}
      setAddAttributeCon={setAddAttributeCon}
      addAttributeAction={addAttributeAction}
      addAttributeNameErrorMessage={addAttributeNameErrorMessage}
    />
  )
}
