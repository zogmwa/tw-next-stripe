import React from 'react'
import AsyncSelect from 'react-select/async'
import axios from 'axios'

const filterAttributes = async (inputValue: string) => {
  const { data } = await axios.get(`/api/autocomplete/attributes/${inputValue}`)
  const attributes = data.results
  const tempAttributes = attributes.filter((attribute) => attribute[1].toLowerCase().includes(inputValue.toLowerCase()))
  let returnAttributes = []
  tempAttributes.map((attribute) =>
    returnAttributes.push({ id: attribute[0], label: attribute[1], value: attribute[1].toLowerCase() }),
  )

  return returnAttributes
}

const promiseOptions = async (inputValue: string) => {
  if (inputValue.trim().length >= 3) {
    let showHighlights = await filterAttributes(inputValue)
    showHighlights.push({ id: 0, label: inputValue, value: inputValue })
    return showHighlights
  } else {
    console.log('Input less than 3 letters')
  }
}

export default function AddAHighlightBar() {
  const handleChange = (value) => {
    // TODO: Add attrubute or link attribute to asset. This will be done after backend finished.
    console.log(value)
  }

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      onChange={handleChange}
      loadOptions={promiseOptions}
      placeholder="write something..."
      components={{ DropdownIndicator: () => null }}
      className="flex-1 mb-2 md:mb-0"
      classNamePrefix="select"
      instanceId
      name="add-highlight"
    />
  )
}
