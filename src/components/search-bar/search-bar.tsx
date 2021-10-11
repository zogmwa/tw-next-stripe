import React, { useState, useEffect } from 'react'
import { AiOutlineSearch, AiOutlinePlusCircle } from 'react-icons/ai'
import { GrShare } from 'react-icons/gr'
import clsx from 'clsx'
import AsyncSelect from 'react-select/async'
import toast from 'react-hot-toast'
import { components } from 'react-select'
import Link from 'next/link'
import { searchSuggestions } from '../../queries/search'
import { Button } from '../button'

type SearchByTagsProps = {
  onSubmit?: (query: string) => void
  className?: string
  style?: React.CSSProperties
  tagsArr?: { value: string; label: string }[]
}

const placeholderComponent = (
  <div className="flex items-center justify-center space-x-2">
    <AiOutlineSearch />
    <div className="hidden leading-none md:flex">
      Type one or more feature tags of interest to you, e.g. email-marketing, landing-pages
    </div>
    <div className="md:hidden">Type feature tags of interest</div>
  </div>
)

const TagSearchResultComponent = ({ input }: { input: string }) => (
  <div className="flex items-center justify-between ml-2 space-x-1 group">
    <div>{input}</div>
    <AiOutlinePlusCircle className="hidden text-text-secondary group-hover:flex" />
  </div>
)

const AssetSearchResultComponent = ({ input, slug }: { input: string; slug: string }) => (
  <Link href={`/services/${slug}`}>
    <div className="flex items-center justify-between ml-2 space-x-1 group !text-black">
      <div>{input}</div>
      <GrShare className="hidden text-text-secondary group-hover:flex" />
    </div>
  </Link>
)

const OptionComponent = (props) => {
  const { label, value, options } = props
  if (options.length === 3 && options?.[0].options) {
    // If there are 3 groups of options
    const values = options[1].options.map((option) => option.value)
    // Get an array of value of all web services
    if (values.includes(value)) {
      // Check if current option is a webservice
      return (
        <components.Option {...props}>
          <AssetSearchResultComponent input={label} slug={value} />
        </components.Option>
      )
    }
  }

  return (
    <components.Option {...props}>
      <TagSearchResultComponent input={label} />
    </components.Option>
  )
}

export function SearchBar({ onSubmit, className, style, tagsArr }: SearchByTagsProps) {
  const [tags, setTags] = useState<string[]>([])
  const [, setError] = useState<string>('')
  const [defaultTags, setDefaultTags] = useState<{ value: string; label: string }[]>(tagsArr)

  useEffect(() => {
    if (tagsArr) {
      setDefaultTags(tagsArr)
      const tags = tagsArr.map((tag) => tag.value)
      setTags(tags)
    }
    // eslint-disable-next-line
  }, [defaultTags])

  /**
   * Handler function called when the user is searching.
   *
   * @param text - the text entered in the select menu
   */

  const handleChange = (value: { value: string; label: string }[]) => {
    const tags = value.map((tag) => tag.value)
    if (tags.length > 5) {
      setError('A maximum of 5 tags are allowed.')
      toast.error('A maximum of 5 tags are allowed.')
    } else {
      setError('')
      setTags(tags)
    }
  }

  /**
   * Handler function called when the user clicks on the "submit" button
   * and all the fields are valid
   */
  function handleSubmit(event: React.SyntheticEvent) {
    // as onSubmit is optional, first check if the field is required
    // or not before proceeding
    event.preventDefault()
    if (tags.length === 0) {
      setError('Please enter a tag')
      toast.error('Please enter a tag')
    } else {
      setError('')
      if (onSubmit) {
        // form.getFieldValue(fieldName) would return the value of the field
        const tagsSelected = tags.join(',')
        onSubmit(tagsSelected)
      }
    }
  }

  return (
    <form
      className={clsx('flex flex-col md:flex-row space-x-0 md:space-x-2 w-full', className)}
      style={style}
      onSubmit={handleSubmit}
    >
      <AsyncSelect
        defaultValue={defaultTags}
        isMulti
        name="tags"
        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null, Option: OptionComponent }}
        onChange={handleChange}
        loadOptions={searchSuggestions}
        instanceId
        className="flex-1 mb-2 md:mb-0"
        classNamePrefix="select"
        placeholder={placeholderComponent}
      />
      <Button type="submit" buttonType="primary">
        Search
      </Button>
    </form>
  )
}
