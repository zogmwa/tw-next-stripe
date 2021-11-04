import React from 'react'
import { Button } from '../button'
import AddAHighlightBar from './add-a-highlight-bar'
import { Switch } from '../switch'

/**
 * Todo: See how we can save input data and pass back to parent component.
 */
type featureProps = {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  addAttributeName: any
  setAddAttributeName?: React.Dispatch<React.SetStateAction<string>>
  addAttributeCon: boolean
  setAddAttributeCon?: React.Dispatch<React.SetStateAction<boolean>>
  addAttributeAction?: Function
  addAttributeNameErrorMessage?: string
}

function AddAHighlightComponent({
  setIsOpen,
  addAttributeName,
  setAddAttributeName,
  addAttributeCon,
  setAddAttributeCon,
  addAttributeAction,
  addAttributeNameErrorMessage,
}: featureProps) {
  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="flex-grow font-bold">Add a Highlight</div>
        <div>
          <span className={addAttributeCon ? 'text-gray-400' : 'text-green-600'}>Pro</span>
          <Switch
            className="ml-4 mr-4"
            enabled={addAttributeCon}
            setEnabled={(isEnabled: boolean) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              setAddAttributeCon(isEnabled)
            }}
            disabledStateBackgroundColor="bg-green-200 border-green-100"
            enabledStateBackgroundColor="bg-red-200 border-red-100"
            disabledStateCircleColor="bg-green-600"
            enabledStateCircleColor="bg-red-600"
          />
          <span className={addAttributeCon ? 'text-red-600' : 'text-gray-400'}>Con</span>
        </div>
      </div>
      <AddAHighlightBar onChange={(value) => setAddAttributeName(value)} />
      {addAttributeNameErrorMessage !== '' && (
        <span className="p-1 text-xs text-red-600">{addAttributeNameErrorMessage}</span>
      )}
      <div className="flex flex-row-reverse">
        <Button
          className="ml-4"
          buttonType="primary"
          type="submit"
          onClick={async () => {
            await addAttributeAction()
            if (addAttributeName) {
              if (addAttributeName.value !== '') setIsOpen(false)
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

export const AddAHighlight = AddAHighlightComponent
