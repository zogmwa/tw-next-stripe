import React from 'react'
import AsyncSelect from 'react-select/async'
import axios from 'axios'

const convertToSlug = (txt: string): string => {
  return txt
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

const filterTags = async (inputValue: string) => {
  const { data } = await axios.get(`/api/autocomplete/tags/${inputValue}`)
  const tags = data.results
  const tempTags = tags.filter((Tag) => Tag.name.toLowerCase().includes(inputValue.toLowerCase()))
  console.log(tempTags)
  let returnTags = []
  tempTags.map((tag) =>
    returnTags.push({
      label: tag.name,
      value: tag.name.toLowerCase(),
      slug: tag.slug,
      description: tag.description,
    }),
  )

  return returnTags
}

const promiseOptions = async (inputValue: string) => {
  if (inputValue.trim().length >= 3) {
    let showTags = await filterTags(inputValue)
    showTags.push({
      label: inputValue,
      value: inputValue.toLowerCase(),
      slug: convertToSlug(inputValue),
      description: null,
    })

    return showTags
  } else {
    console.log('Input less than 3 letters')
  }
}

export default function LinkUsedByCompaniesBar({ onChange }) {
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      onChange={(value) => {
        onChange(value)
      }}
      loadOptions={promiseOptions}
      placeholder="Start typing top Tags."
      components={{ DropdownIndicator: () => null }}
      className="flex-1 mb-2 md:mb-0"
      classNamePrefix="select"
      instanceId
      name="add-tag"
      menuPortalTarget={document.body}
      styles={{
        // Fixes the overlapping problem of the component
        menuPortal: (base) => ({ ...base, zIndex: 99999999 }),
      }}
    />
  )
}
