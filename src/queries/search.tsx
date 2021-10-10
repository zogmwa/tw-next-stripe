import axios from 'axios'

type GroupOption = {
  label: string
  options: Option[]
}

type Option = {
  label: string
  value: string
}

export async function searchSuggestions(searchInput: string): Promise<GroupOption[]> {
  if (searchInput.length >= 3) {
    try {
      const { data } = await axios.get<{ tags: string[]; assets: string[]; asset_slugs: string[] }>(
        `/api/autocomplete/${searchInput}`,
      )
      const tagResults = data.tags.map((val) => ({ value: val, label: val }))
      const len = Math.min(data.assets.length, data.asset_slugs.length)
      const assetResults = []
      for (let i = 0; i < len; i++) {
        assetResults.push({
          isDisabled: true,
          value: data.asset_slugs[i],
          label: data.assets[i],
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
      return [{ label: 'Others', options: [{ value: searchInput, label: searchInput }] }]
    }
  }
  return [{ label: 'Others', options: [{ value: searchInput, label: searchInput }] }]
}
