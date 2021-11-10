import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import ReactTooltip from 'react-tooltip'
import { RiMenuAddFill } from 'react-icons/ri'
import { EditableTableHead, EditableTagsTableTrow } from './index'
import { Tag } from '../../../types/tag'

type EditableTagsTableComponentProps = {
  editTags: Tag[]
  defaultTagData: Tag
  setEditTags: React.Dispatch<React.SetStateAction<Tag[]>>
  isSubmit: boolean
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    width: '50%',
    label: 'Name',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    width: '40%',
    label: 'Description',
  },
  {
    id: 'function',
    numeric: false,
    disablePadding: false,
    label: 'Action',
    width: '10%',
  },
]

function EditableTagsTableComponent({
  editTags,
  defaultTagData,
  setEditTags,
  isSubmit,
}: EditableTagsTableComponentProps) {
  const [showTags, setShowTags] = useState(editTags)
  const [currentEditData, setCurrentEditData] = useState(null)
  const [currentEditIndex, setCurrentEditIndex] = useState(-1)

  useEffect(() => {
    if (showTags !== editTags) {
      setEditTags(showTags)
    }
  }, [showTags])

  useEffect(() => {
    if (currentEditData) {
      setShowTags((prevState) => [
        ...prevState.slice(0, currentEditIndex),
        currentEditData,
        ...prevState.slice(currentEditIndex + 1),
      ])
    }
  }, [currentEditData])

  const handleAdd = () => {
    setShowTags((prevState) => [...prevState, defaultTagData])
  }

  const handleDelete = (index) => {
    setShowTags((prevState) => [...prevState.slice(0, index), ...prevState.slice(index + 1)])
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, boxShadow: 'none' }}>
        <div className="flex justify-end">
          <span data-for="tooltip-add" data-tip>
            <RiMenuAddFill onClick={() => handleAdd()} className="m-2 text-xl cursor-pointer text-success" />
          </span>
          <ReactTooltip id="tooltip-add" type="light" place="left" border={true} borderColor="text-grey-200">
            Add Row
          </ReactTooltip>
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <EditableTableHead headCells={headCells} />
            <TableBody>
              {showTags.map((tag, index) => (
                <EditableTagsTableTrow
                  allRowData={showTags}
                  rowData={tag}
                  rowIndex={index}
                  onDelete={() => handleDelete(index)}
                  isSubmit={isSubmit}
                  setCurrentEditData={setCurrentEditData}
                  setCurrentEditIndex={setCurrentEditIndex}
                  key={`${tag.name}-${index}`}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export const EditableTagsTable = EditableTagsTableComponent
