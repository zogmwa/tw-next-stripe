import React from 'react'
import { Button } from '../button'
import { Textarea } from '../textarea'

/**
 * Todo: Add integration with questions API (POST: /questions/{asset, title}).
 */
type questionProps = {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  addQuestionName?: string
  setAddQuestionName?: React.Dispatch<React.SetStateAction<string>>
  addQuestionNameErrorMessage?: string
  addQuestionAction?: Function
}

function AddAQuestionComponent({
  setIsOpen,
  addQuestionName,
  setAddQuestionName,
  addQuestionNameErrorMessage,
  addQuestionAction,
}: questionProps) {
  return (
    <div>
      <div className="flex">
        <div className="flex-grow font-bold">Post your question</div>
      </div>
      <Textarea
        id="title"
        name="title"
        className="w-full mt-4 mb-4"
        placeholder="Please add your Question?"
        value={addQuestionName}
        onChange={(evnet) => {
          const target = evnet.target as HTMLTextAreaElement
          setAddQuestionName(target.value)
        }}
        errorMessage={addQuestionNameErrorMessage}
      />
      <div className="flex flex-row-reverse">
        <Button
          className="ml-4"
          buttonType="primary"
          type="submit"
          onClick={async () => {
            await addQuestionAction()
            if (addQuestionName !== '') {
              setIsOpen(false)
            }
          }}
        >
          Add
        </Button>
        <Button buttonType="default" type="submit" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export const AddAQuestion = AddAQuestionComponent
