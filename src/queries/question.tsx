import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { client } from '../utils/client'

type QuestionOption = {
  value: string
  // eslint-disable-next-line no-undef
  label: JSX.Element
}

type AssetOption = {
  value: string
  // eslint-disable-next-line no-undef
  label: JSX.Element
}

type GroupOption = {
  label: string
  options: QuestionOption[] | AssetOption[]
}

const labelComponent = (input: string) => (
  <div className="flex items-center justify-between ml-2 space-x-1 group">
    <div>{input}</div>
    <AiOutlinePlusCircle className="hidden text-text-secondary group-hover:flex" />
  </div>
)

export async function searchSuggestions(searchInput: string): Promise<GroupOption[]> {
  if (searchInput.length >= 3) {
    try {
      const { data } = await client.get<{ questions: string[]; assets: string[] }>(
        `/?q=${searchInput}`, // TODO: Will be implement with API later.
      )
      const questionResults = data.questions.map((val) => ({ value: val, label: labelComponent(val) }))
      const assetResults = data.assets.map((val) => ({ value: val, label: labelComponent(val) }))
      return [
        { label: 'Questions', options: questionResults },
        { label: 'Web Services', options: assetResults },
        { label: 'Others', options: [{ value: searchInput, label: labelComponent(searchInput) }] },
      ]
    } catch (error) {
      //  always wrap any API fetching operation within try/catch block
      // and return the default value in case of error
      return []
    }
  }
  return [{ label: '', options: [{ value: searchInput, label: labelComponent(searchInput) }] }]
}
