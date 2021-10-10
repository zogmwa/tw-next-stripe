import React, { useState } from 'react'
import { Button } from '../button'
import { Textarea } from '../textarea'
import { Switch } from '../switch'

/**
 * Todo: See how we can save input data and pass back to parent component.
 */
type featureProps = {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

function AddAHighlightComponent({ setIsOpen }: featureProps) {
  const [enabled, setEnabled] = useState(true)

  return (
    <div>
      <div className="flex">
        <div className="flex-grow font-bold">Add a Feature</div>
        <div>
          Con
          <Switch
            className="ml-4 mr-4"
            enabled={enabled}
            setEnabled={(isEnabled: boolean) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const featureType = isEnabled ? 'pro' : 'con'
              setEnabled(isEnabled)
            }}
          />
          Pro
        </div>
      </div>
      <Textarea
        className="w-full whitespace-nowrap mt-4 mb-4"
        rows={'1' as unknown as number}
        placeholder="Write something..."
      />
      <div className="flex flex-row-reverse">
        <Button className="ml-4" buttonType="primary" type="submit">
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
