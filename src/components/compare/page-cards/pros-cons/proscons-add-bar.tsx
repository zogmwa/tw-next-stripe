import React, { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import clsx from 'clsx'
import AsyncSelect from 'react-select/async'
import { Button } from '../../../button'

type AddPorsConsBarProps = {
  onSubmit?: (query: string) => void
  className?: string
  style?: React.CSSProperties
  attributeArr?: { value: string; label: string }[]
  isButtonShow?: boolean
  placeholder?: any
}

const placeholderComponent = (
  <div className="flex items-center justify-center space-x-2">
    <AiOutlineSearch />
    <div className="hidden md:flex">Start by typing attribute of interest, e.g. investing, artificial-intelligence</div>
    <div className="md:hidden">Enter attribute of interest</div>
  </div>
)

export function AddPorsConsBar({
  onSubmit,
  className,
  style,
  attributeArr,
  isButtonShow = true,
  placeholder = placeholderComponent,
}: AddPorsConsBarProps) {
  const [attributes, setAttributes] = useState<string[]>([])
  const [, setError] = useState<string>('')
  const [defaultAttributes, setDefaultAttributes] = useState<{ value: string; label: string }[]>(attributeArr)

  useEffect(() => {
    if (attributeArr) {
      setDefaultAttributes(attributeArr)
      const attributes = attributeArr.map((attribute) => attribute.value)
      setAttributes(attributes)
    }
    // eslint-disable-next-line
  }, [defaultAttributes])

  /**
   * Handler function called when the user is searching.
   *
   * @param text - the text entered in the select menu
   */

  const handleChange = (value: { value: string; label: string }[]) => {
    // TODO: This will complete with API
    // const attributes = value.map((attribute) => attribute.value)
    // if (attributes.length > 5) {
    //   setError('A maximum of 5 attributes are allowed.')
    //   toast.error('A maximum of 5 attributes are allowed.')
    // } else {
    //   setError('')
    //   setAttributes(attributes)
    // }
  }

  /**
   * Handler function called when the user clicks on the "submit" button
   * and all the fields are valid
   */
  function handleSubmit(event: React.SyntheticEvent) {
    // TODO: This will complete with API
    event.preventDefault()
    // if (attributes.length === 0) {
    //   setError('Please enter a attribute')
    //   toast.error('Please enter a attribute')
    // } else {
    //   setError('')
    //   if (onSubmit) {
    //     // form.getFieldValue(fieldName) would return the value of the field
    //     const attributesSelected = attributes.join(',')
    //     onSubmit(attributesSelected)
    //   }
    // }
  }

  return (
    <form className={clsx('flex space-x-2 w-full mb-2', className)} style={style} onSubmit={handleSubmit}>
      <AsyncSelect
        defaultValue={defaultAttributes}
        isMulti
        name="attributes"
        components={{ DropdownIndicator: () => null }}
        onChange={handleChange}
        // loadOptions={searchSuggestions}
        instanceId
        className="flex-1 md:mb-0"
        classNamePrefix="select"
        placeholder={placeholder}
      />
      {isButtonShow && (
        <Button type="submit" buttonType="primary">
          Add
        </Button>
      )}
    </form>
  )
}
