import React from 'react'
import AsyncSelect from 'react-select/async'
import axios from 'axios'

const filterOrganizations = async (inputValue: string) => {
  const { data } = await axios.get(`/api/autocomplete/organizations/${inputValue}`)
  const organizations = data.results
  const tempOrganizations = organizations.filter((organization) =>
    organization.name.toLowerCase().includes(inputValue.toLowerCase()),
  )
  const returnOrganizations = []
  tempOrganizations.map((organization) =>
    returnOrganizations.push({
      label: organization.name,
      value: organization.name.toLowerCase(),
      website: organization.website,
      logo_url: organization.logo_url,
    }),
  )

  return returnOrganizations
}

const promiseOptions = async (inputValue: string) => {
  if (inputValue.trim().length >= 3) {
    const showOrganizations = await filterOrganizations(inputValue)
    showOrganizations.push({
      label: inputValue,
      value: inputValue.toLowerCase(),
      website: null,
      logo_url: null,
    })

    return showOrganizations
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
      placeholder="Start typing top organizations."
      components={{ DropdownIndicator: () => null }}
      className="flex-1 mb-2 md:mb-0"
      classNamePrefix="select"
      instanceId="AddOrganization"
      name="add-organization"
      menuPortalTarget={document.body}
      styles={{
        // Fixes the overlapping problem of the component
        menuPortal: (base) => ({ ...base, zIndex: 99999999 }),
      }}
    />
  )
}
