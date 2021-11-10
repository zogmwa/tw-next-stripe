import React, { useState, useEffect } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { RiDeleteBin5Line } from 'react-icons/ri'
import toast from 'react-hot-toast'
import { Tag } from '../../../types/tag'
import LinkTagsBar from '../editable-tags/link-tags-bar'

type EditableTagsTableTrowComponentProps = {
  allRowData: Tag[]
  rowData: Tag
  rowIndex: number
  onDelete: Function
  isSubmit: boolean
  setCurrentEditData: React.Dispatch<React.SetStateAction<Tag>>
  setCurrentEditIndex: React.Dispatch<React.SetStateAction<number>>
}

function EditableTagsTableTrowComponent({
  allRowData,
  rowData,
  rowIndex,
  onDelete,
  isSubmit,
  setCurrentEditData,
  setCurrentEditIndex,
}: EditableTagsTableTrowComponentProps) {
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
        {editData.name === '' ? (
          <LinkTagsBar
            onChange={(value) => {
              const tempData = allRowData.filter((tag) => tag.name === value.label)
              if (tempData.length > 0) {
                toast.error('This Tag is already exist')
              } else {
                setErrorMessage('')
                setEditData({ name: value.label, slug: value.slug, description: value.description })
              }
            }}
          />
        ) : (
          <>{editData.name}</>
        )}
        {errorMessage !== '' && <span className="text-xs text-red-600">{errorMessage}</span>}
      </TableCell>
      <TableCell>{editData.name !== '' && <>{editData.description}</>}</TableCell>
      <TableCell align="center">
        <div className="flex items-center justify-center">
          <RiDeleteBin5Line onClick={() => onDelete()} className="text-red-600 cursor-pointer" />
        </div>
      </TableCell>
    </TableRow>
  )
}

export const EditableTagsTableTrow = EditableTagsTableTrowComponent
