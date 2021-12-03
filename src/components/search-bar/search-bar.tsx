import React, { useState, useEffect, ReactElement } from 'react'
import { AiOutlineSearch, AiOutlinePlusCircle } from 'react-icons/ai'
import clsx from 'clsx'
import AsyncSelect from 'react-select/async'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { searchSuggestions, solutionSuggestions } from '@taggedweb/queries/search'
import { components } from 'react-select'
import { GrShare } from 'react-icons/gr'
import { Button } from '../button'

type SearchByTagsProps = {
  onSubmit?: (query: string) => void
  className?: string
  style?: React.CSSProperties
  tagsArr?: { value: string; label: ReactElement; isWebService?: boolean }[]
  forHomepage?: boolean
  forSoftware?: boolean
}

const placeholderComponent = (
  <div className="flex items-center justify-center space-x-2">
    <div className="hidden leading-none md:flex">Type feature tags of interest e.g. email-marketing, landing-pages</div>
    <div className="md:hidden">Type feature tags of interest</div>
  </div>
)

const homepagePlaceholderComponent = (
  <div className="flex items-center justify-center space-x-2">
    <div className="leading-none">e.g. Improve my Python application performance</div>
  </div>
)

const TagSearchResultComponent = ({ input }: { input: string }) => (
  <div className="flex items-center justify-between ml-2 space-x-1 group">
    <div>{input}</div>
    <AiOutlinePlusCircle className="hidden text-text-secondary group-hover:flex" />
  </div>
)

const AssetSearchResultComponent = ({ input }: { input: string }) => (
  <div className="flex items-center justify-between ml-2 space-x-1 group !text-black">
    <div>{input}</div>
    <GrShare className="hidden text-text-secondary group-hover:flex" />
  </div>
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
          <AssetSearchResultComponent input={label} />
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

export function SearchBar({ onSubmit, className, style, forHomepage = false, forSoftware = false }: SearchByTagsProps) {
  const [tags, setTags] = useState<{ value: string; label: string; isWebService?: boolean }[]>([])
  const [, setError] = useState<string>('')
  const [solution, setSolution] = useState<string>('')
  // const [defaultTags, setDefaultTags] = useState<{ value: string; label: string }[]>(tagsArr)
  const router = useRouter()
  const serachBtnType = forHomepage ? 'homePage' : 'primary'
  const placeholder = !forSoftware ? homepagePlaceholderComponent : placeholderComponent
  const searchBtnText = !forSoftware ? 'Find Solutions' : 'Find Software'
  useEffect(() => {
    const defautlTags = JSON.parse(localStorage.getItem('taggedweb-searched-tags')) || []
    setTags(defautlTags)
  }, [])

  /**
   * Handler function called when the user is searching.
   *
   * @param text - the text entered in the select menu
   */

  const handleChange = (value: { value: string; label: string; isWebService: boolean }[]) => {
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
      router.push(`/software/${webserviceSlug}`)
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

  const handleSolutionChange = (value: { value: string; label: string }) => {
    setSolution(value.value)
  }

  /**
   * Handler function called when the user clicks on the "submit" button
   * and all the fields are valid
   */
  function handleSubmit(event: React.SyntheticEvent) {
    // as onSubmit is optional, first check if the field is required
    // or not before proceeding
    event.preventDefault()
    if (forSoftware) {
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
    } else {
      if (solution.length === 0) {
        setError('No input given')
        toast.error('No input given')
      } else {
        setError('')
        if (onSubmit) {
          onSubmit(solution)
        }
      }
    }
  }

  return (
    <form
      className={clsx('flex flex-col sm:flex-row space-x-0 sm:space-x-2 w-full', className)}
      style={style}
      onSubmit={handleSubmit}
    >
      {forSoftware ? (
        <AsyncSelect
          value={tags}
          isMulti
          name="tags"
          components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null, Option: OptionComponent }}
          onChange={handleChange}
          loadOptions={searchSuggestions}
          instanceId
          className="flex-1 mb-2 sm:mb-0"
          classNamePrefix="select"
          placeholder={placeholder}
        />
      ) : (
        <AsyncSelect
          name="solutions"
          components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
          onChange={handleSolutionChange}
          loadOptions={solutionSuggestions}
          instanceId
          className="flex-1 mb-2 sm:mb-0"
          classNamePrefix="select"
          placeholder={placeholder}
        />
      )}
      <Button type="submit" buttonType={serachBtnType} icon={<AiOutlineSearch />}>
        {searchBtnText}
      </Button>
    </form>
  )
}
