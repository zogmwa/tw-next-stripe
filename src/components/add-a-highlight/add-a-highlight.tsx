import React from 'react'
import { Button } from '../button'
import { Textarea } from '../textarea'
import { Switch } from '../switch'

/**
 * Todo: See how we can save input data and pass back to parent component.
 */
type featureProps = {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  addAttributeName: string
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
    <div>
      <div className="flex">
        <div className="flex-grow font-bold">Add a Feature</div>
        <div>
          Pro
          <Switch
            className="ml-4 mr-4"
            enabled={addAttributeCon}
            setEnabled={(isEnabled: boolean) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const featureType = isEnabled ? 'pro' : 'con'
              setAddAttributeCon(isEnabled)
            }}
          />
          Con
        </div>
      </div>
      <Textarea
        className="w-full mt-4 mb-4 whitespace-nowrap"
        rows={'1' as unknown as number}
        placeholder="Write something..."
        value={addAttributeName}
        onChange={(evnet) => {
          const target = evnet.target as HTMLTextAreaElement
          setAddAttributeName(target.value)
        }}
        errorMessage={addAttributeNameErrorMessage}
      />
      <div className="flex flex-row-reverse">
        <Button
          className="ml-4"
          buttonType="primary"
          type="submit"
          onClick={async () => {
            await addAttributeAction()
            if (addAttributeName !== '') {
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

export const AddAHighlight = AddAHighlightComponent
