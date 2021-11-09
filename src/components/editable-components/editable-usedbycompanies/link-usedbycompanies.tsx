import React, { useState, useEffect } from 'react'
import { Button } from '../../button'
import { EditableUsedByCompaniesTable } from '../editable-table'

type LinkUsedByCompaniesComponentProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: Function
  customerOrganizations: { name: string; website: string | null; logo_url: string | null }[]
}

function LinkUsedByCompaniesComponent({
  setIsOpen,
  onSubmit,
  customerOrganizations,
}: LinkUsedByCompaniesComponentProps) {
  const [editCustomerOrganizations, setEditCustomerOrganizations] = useState(customerOrganizations ?? [])
  const [isSubmit, setIsSubmit] = useState(false)
  const defaultCustomerOrganizationData = {
    name: '',
    logo_url: '',
    websiet: '',
  }

  useEffect(() => {
    if (isSubmit) {
      let isSend = true
      for (let i = 0; i < editCustomerOrganizations.length; i++) {
        if (editCustomerOrganizations[i].name === '') isSend = false
      }
      if (isSend) {
        onSubmit({ customer_organizations: editCustomerOrganizations })
        setIsOpen(false)
      }
      setIsSubmit(false)
    }
  }, [isSubmit])

  return (
    <div className="space-y-4">
      <EditableUsedByCompaniesTable
        editCustomerOrganizations={editCustomerOrganizations}
        defaultCustomerOrganizationData={defaultCustomerOrganizationData}
        setEditCustomerOrganizations={setEditCustomerOrganizations}
        isSubmit={isSubmit}
      />
      <div className="flex flex-row-reverse">
        <Button className="ml-4" buttonType="primary" type="submit" onClick={() => setIsSubmit(true)}>
          Save
        </Button>
        <Button
          buttonType="default"
          type="submit"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export const LinkUsedByCompanies = LinkUsedByCompaniesComponent
