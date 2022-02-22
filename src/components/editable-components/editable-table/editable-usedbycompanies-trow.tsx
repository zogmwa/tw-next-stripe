import React, { useState, useEffect } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { TiImageOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'
import ReactTooltip from 'react-tooltip'
import { CustomerOrganization } from '@taggedweb/types/customer_organization'
import { TOAST_ORGANIZATION_EXISTS_ERROR } from '@taggedweb/utils/token-id'
import LinkUsedByCompaniesBar from '../editable-usedbycompanies/link-usedbycompanies-bar'

type EditableUsedByCompaniesTableTrowComponentProps = {
  allRowData: CustomerOrganization[]
  rowData: CustomerOrganization
  rowIndex: number
  onDelete: Function
  isSubmit: boolean
  setCurrentEditData: React.Dispatch<React.SetStateAction<CustomerOrganization>>
  setCurrentEditIndex: React.Dispatch<React.SetStateAction<number>>
}

function EditableUsedByCompaniesTableTrowComponent({
  allRowData,
  rowData,
  rowIndex,
  onDelete,
  isSubmit,
  setCurrentEditData,
  setCurrentEditIndex,
}: EditableUsedByCompaniesTableTrowComponentProps) {
  const [editData, setEditData] = useState(rowData)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (isSubmit) {
      if (editData.name === '') {
        setErrorMessage('This field is not valid.')
      } else {
        setErrorMessage('')
      }
    }
  }, [isSubmit])

  useEffect(() => {
    if (editData !== rowData) {
      console.log('here')
      setCurrentEditData(editData)
      setCurrentEditIndex(rowIndex)
    }
  }, [editData])

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        {editData.name !== '' &&
          (editData.logo_url ? (
            <div className="flex items-center justify-center w-[72px] h-[72px] p-2" title={editData.name}>
              <img src={editData.logo_url} alt={editData.name} data-for={`tooltip${editData.name}`} data-tip />
              <ReactTooltip
                id={`tooltip${editData.name}`}
                type="light"
                place="right"
                border={true}
                borderColor="text-grey-200"
              >
                {editData.name}
              </ReactTooltip>
            </div>
          ) : (
            <div className="flex items-center justify-around w-[72px] h-[72px] p-2" title={editData.name}>
              <TiImageOutline className="text-2xl" data-for={`tooltip${editData.name}`} data-tip />
              <span
                className="text-sm italic tracking-wide text-text-secondary"
                data-for={`tooltip${editData.name}`}
                data-tip
              >
                {editData.name}
              </span>
              <ReactTooltip
                id={`tooltip${editData.name}`}
                type="light"
                place="right"
                border={true}
                borderColor="text-grey-200"
              >
                {editData.name}
              </ReactTooltip>
            </div>
          ))}
      </TableCell>
      <TableCell>
        {editData.name === '' ? (
          <LinkUsedByCompaniesBar
            onChange={(value) => {
              const tempData = allRowData.filter((organization) => organization.name === value.label)
              if (tempData.length > 0) {
                toast.error('This organization is already exist', {
                  id: TOAST_ORGANIZATION_EXISTS_ERROR,
                })
              } else {
                setErrorMessage('')
                setEditData({ name: value.label, logo_url: value.logo_url, website: value.website })
              }
            }}
          />
        ) : (
          <>{editData.name}</>
        )}
        {errorMessage !== '' && <span className="text-xs text-red-600">{errorMessage}</span>}
      </TableCell>
      <TableCell>{editData.name !== '' && <>{editData.website}</>}</TableCell>
      <TableCell align="center">
        <div className="flex items-center justify-center">
          <RiDeleteBin5Line onClick={() => onDelete()} className="text-red-600 cursor-pointer" />
        </div>
      </TableCell>
    </TableRow>
  )
}

export const EditableUsedByCompaniesTableTrow = EditableUsedByCompaniesTableTrowComponent
