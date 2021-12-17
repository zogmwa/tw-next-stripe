import axios from 'axios'
import { unslugify } from '@taggedweb/utils/unslugify'
import { client } from '../utils/client'
type GroupOption = {
  label: string
  options: Option[]
}

type Option = {
  label: string
  value: string
  isWebService: boolean
}

type SolutionOption = {
  label: string
  options: Soltuion[]
}

type Soltuion = {
  label: string
  value: string
}

export async function searchSuggestions(searchInput: string): Promise<GroupOption[]> {
  if (searchInput.length >= 3) {
    try {
      const { data } = await axios.get<{ tags: string[]; assets: string[]; asset_slugs: string[] }>(
        `/api/autocomplete/${searchInput}`,
      )
      const tagResults = data.tags.map((val) => ({ value: val, label: unslugify(val), isWebService: false }))
      const len = Math.min(data.assets.length, data.asset_slugs.length)
      const assetResults = []
      for (let i = 0; i < len; i++) {
        assetResults.push({
          value: data.asset_slugs[i],
          label: data.assets[i],
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
          options: [{ value: searchInput, label: unslugify(searchInput), isWebService: false }],
        },
      ]
    }
  }
  return [{ label: 'Others', options: [{ value: searchInput, label: unslugify(searchInput), isWebService: false }] }]
}

export async function solutionSuggestions(searchInput: string): Promise<SolutionOption[]> {
  if (searchInput.length >= 3) {
    try {
      const { data } = await client.get(`/autocomplete-solutions/?q=${searchInput}`)
      const soltuionResults = data.results.map((option) => ({ value: option.slug, label: option.title }))
      return [
        { label: 'Solutions', options: soltuionResults },
        { label: '', options: [{ value: searchInput, label: searchInput }] },
      ]
    } catch (error) {
      //  always wrap any API fetching operation within try/catch block
      // and return the default value in case of error
      return [
        {
          label: '',
          options: [{ value: searchInput, label: searchInput }],
        },
      ]
    }
  }
  return [{ label: '', options: [{ value: searchInput, label: searchInput }] }]
}
