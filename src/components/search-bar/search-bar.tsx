import React, { useState, useEffect, ReactElement } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import clsx from 'clsx'
import AsyncSelect from 'react-select/async'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { searchSuggestions } from '@taggedweb/queries/search'
import { Button } from '../button'

type SearchByTagsProps = {
  onSubmit?: (query: string) => void
  className?: string
  style?: React.CSSProperties
  tagsArr?: { value: string; label: ReactElement; isWebService?: boolean }[]
  forHomepage?: boolean
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

const homepagePlaceholderComponent = (
  <div className="flex items-center justify-center space-x-2">
    <AiOutlineSearch />
    <div className="leading-none">e.g. Improve my Python application performance</div>
  </div>
)

export function SearchBar({ onSubmit, className, style, forHomepage = false }: SearchByTagsProps) {
  const [tags, setTags] = useState<{ value: string; label: ReactElement; isWebService?: boolean }[]>([])
  const [, setError] = useState<string>('')
  // const [defaultTags, setDefaultTags] = useState<{ value: string; label: string }[]>(tagsArr)
  const router = useRouter()
  const serachBtnType = forHomepage ? 'homepage' : 'primary'
  const placeholder = forHomepage ? homepagePlaceholderComponent : placeholderComponent
  const searchBtnText = forHomepage ? 'Find Solutions' : 'Search'
  useEffect(() => {
    const defautlTags = JSON.parse(localStorage.getItem('taggedweb-searched-tags'))
    if (!defautlTags) {
      setTags([])
    } else {
      setTags(defautlTags)
      // console.log(tags)
    }
  }, [])

  /**
   * Handler function called when the user is searching.
   *
   * @param text - the text entered in the select menu
   */

  const handleChange = (value: { value: string; label: ReactElement; isWebService: boolean }[]) => {
    let onWebServiceSelect = false
    let webserviceSlug = ''
    const Tags = value.map((tag) => {
      if (tag.isWebService) {
        onWebServiceSelect = true
        webserviceSlug = tag.value
      }

      return { value: tag.value, label: tag.value, isWebService: tag.isWebService }
    })
    if (onWebServiceSelect) {
      setTags(value)
      router.push(`/services/${webserviceSlug}`)
    } else {
      if (value.length > 5) {
        setError('A maximum of 5 tags are allowed.')
        toast.error('A maximum of 5 tags are allowed.')
      } else {
        setError('')
        setTags(value)
        localStorage.setItem('taggedweb-searched-tags', JSON.stringify(Tags))
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
        const tagsSelected = tags.map((tag) => tag.value).join(',')
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
        value={tags}
        isMulti
        name="tags"
        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
        onChange={handleChange}
        loadOptions={searchSuggestions}
        instanceId
        className="flex-1 mb-2 md:mb-0"
        classNamePrefix="select"
        placeholder={placeholder}
      />
      <Button type="submit" buttonType={serachBtnType}>
        {searchBtnText}
      </Button>
    </form>
  )
}
