import React from 'react'
import AsyncSelect from 'react-select/async'
import axios from 'axios'

const filterAttributes = async (inputValue: string) => {
  const { data } = await axios.get(`/api/autocomplete/attributes/${inputValue}`)
  const attributes = data.results
  const tempAttributes = attributes.filter((attribute) => attribute[1].toLowerCase().includes(inputValue.toLowerCase()))
  const returnAttributes = []
  tempAttributes.map((attribute) =>
    returnAttributes.push({ id: attribute[0], label: attribute[1], value: attribute[1].toLowerCase() }),
  )

  return returnAttributes
}

const promiseOptions = async (inputValue: string) => {
  if (inputValue.trim().length >= 3) {
    const showHighlights = await filterAttributes(inputValue)
    showHighlights.push({ id: 0, label: inputValue, value: inputValue })
    return showHighlights
  } else {
    console.log('Input less than 3 letters')
  }
}

export default function AddAHighlightBar({ onChange }) {
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      onChange={onChange}
      loadOptions={promiseOptions}
      placeholder="Start typing top features/highlights"
      components={{ DropdownIndicator: () => null }}
      className="flex-1 mb-2 md:mb-0"
      classNamePrefix="select"
      instanceId
      name="add-highlight"
    />
  )
}
