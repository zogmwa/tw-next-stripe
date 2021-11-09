import React, { useState, useEffect, ReactElement } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import clsx from 'clsx'
import AsyncSelect from 'react-select/async'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
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
      Start by typing one or more feature tags of interest. e.g. email-marketing, landing-pages
    </div>
    <div className="md:hidden">Type feature tags of interest</div>
  </div>
)

export function SearchBar({ onSubmit, className, style, tagsArr }: SearchByTagsProps) {
  const [tags, setTags] = useState<string[]>([])
  const [, setError] = useState<string>('')
  const [defaultTags, setDefaultTags] = useState<{ value: string; label: string }[]>(tagsArr)
  const router = useRouter()
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

  const handleChange = (value: { value: string; label: ReactElement; isWebService: boolean }[]) => {
    let onWebServiceSelect = false
    let webserviceSlug = ''
    const tags = value.map((tag) => {
      if (tag.isWebService) {
        onWebServiceSelect = true
        webserviceSlug = tag.value
      }
      return tag.value
    })
    if (onWebServiceSelect) {
      router.push(`services/${webserviceSlug}`)
    } else {
      if (tags.length > 5) {
        setError('A maximum of 5 tags are allowed.')
        toast.error('A maximum of 5 tags are allowed.')
      } else {
        setError('')
        setTags(tags)
      }
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
        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
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
