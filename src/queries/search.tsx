import React, { ReactElement } from 'react'
import axios from 'axios'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { GrShare } from 'react-icons/gr'
type GroupOption = {
  label: string
  options: Option[]
}

type Option = {
  label: ReactElement
  value: string
  isWebService: boolean
}

const labelTagComponent = (input: string) => (
  <div className="flex items-center justify-between ml-2 space-x-1 group">
    <div>{input}</div>
    <AiOutlinePlusCircle className="hidden text-text-secondary group-hover:flex" />
  </div>
)

const labelAssetComponent = (input: string) => (
  <div className="flex items-center justify-between ml-2 space-x-1 group">
    <div>{input}</div>
    <GrShare className="hidden text-text-secondary group-hover:flex" />
  </div>
)

export async function searchSuggestions(searchInput: string): Promise<GroupOption[]> {
  if (searchInput.length >= 3) {
    try {
      const { data } = await axios.get<{ tags: string[]; assets: string[]; asset_slugs: string[] }>(
        `/api/autocomplete/${searchInput}`,
      )
      const tagResults = data.tags.map((val) => ({ value: val, label: labelTagComponent(val), isWebService: false }))
      const len = Math.min(data.assets.length, data.asset_slugs.length)
      const assetResults = []
      for (let i = 0; i < len; i++) {
        assetResults.push({
          value: data.asset_slugs[i],
          label: labelAssetComponent(data.assets[i]),
          isWebService: true,
        })
      }
      return [
        { label: 'Tags', options: tagResults },
        { label: 'Web Services', options: assetResults },
        { label: 'Others', options: [{ value: searchInput, label: searchInput }] },
      ]
    } catch (error) {
      //  always wrap any API fetching operation within try/catch block
      // and return the default value in case of error
      return [
        {
          label: 'Others',
          options: [{ value: searchInput, label: labelTagComponent(searchInput), isWebService: false }],
        },
      ]
    }
  }
  return [
    { label: 'Others', options: [{ value: searchInput, label: labelTagComponent(searchInput), isWebService: false }] },
  ]
}
