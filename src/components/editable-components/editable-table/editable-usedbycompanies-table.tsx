import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import ReactTooltip from 'react-tooltip'
import { RiMenuAddFill } from 'react-icons/ri'
import { EditableTableHead, EditaleUsedByCompaniesTableTrow } from './index'
import { CustomerOrganization } from '../../../types/customer_organization'

type EditableUsedByCompaniesTableComponentProps = {
  editCustomerOrganizations: CustomerOrganization[]
  defaultCustomerOrganizationData: CustomerOrganization
  setEditCustomerOrganizations: React.Dispatch<React.SetStateAction<CustomerOrganization[]>>
  isSubmit: boolean
}

const headCells = [
  {
    id: 'logo_url',
    numeric: false,
    disablePadding: false,
    width: '30%',
    label: 'Logo',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    width: '40%',
    label: 'Name',
  },
  {
    id: 'website',
    numeric: false,
    disablePadding: false,
    label: 'Website',
    width: '20%',
  },
  {
    id: 'function',
    numeric: false,
    disablePadding: false,
    label: 'Action',
    width: '10%',
  },
]

function EditableUsedByCompaniesTableComponent({
  editCustomerOrganizations,
  defaultCustomerOrganizationData,
  setEditCustomerOrganizations,
  isSubmit,
}: EditableUsedByCompaniesTableComponentProps) {
  const [showCustomerOrganizations, setShowCustomerOrganizations] = useState(editCustomerOrganizations)
  const [currentEditData, setCurrentEditData] = useState(null)
  const [currentEditIndex, setCurrentEditIndex] = useState(-1)

  useEffect(() => {
    setShowCustomerOrganizations(editCustomerOrganizations)
  }, [editCustomerOrganizations])

  useEffect(() => {
    if (currentEditData) {
      setEditCustomerOrganizations([
        ...showCustomerOrganizations.slice(0, currentEditIndex),
        currentEditData,
        ...showCustomerOrganizations.slice(currentEditIndex + 1),
      ])
    }
  }, [currentEditData])

  const handleAdd = () => {
    setShowCustomerOrganizations((prevState) => [...prevState, defaultCustomerOrganizationData])
    setEditCustomerOrganizations((prevState) => [...prevState, defaultCustomerOrganizationData])
  }

  const handleDelete = (index) => {
    setShowCustomerOrganizations((prevState) => [...prevState.slice(0, index), ...prevState.slice(index + 1)])
    setEditCustomerOrganizations((prevState) => [...prevState.slice(0, index), ...prevState.slice(index + 1)])
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <div className="flex justify-end">
          <RiMenuAddFill
            onClick={() => handleAdd()}
            className="m-2 text-xl cursor-pointer text-success"
            data-for="tooltip-add"
            data-tip
          />
        </div>

        {/* <ThemeProvider theme={theme}> */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <EditableTableHead headCells={headCells} />
            <TableBody>
              {showCustomerOrganizations.map((organization, index) => {
                if (organization) {
                  return (
                    <EditaleUsedByCompaniesTableTrow
                      allRowData={showCustomerOrganizations}
                      rowData={organization}
                      rowIndex={index}
                      onDelete={handleDelete}
                      isSubmit={isSubmit}
                      setCurrentEditData={setCurrentEditData}
                      setCurrentEditIndex={setCurrentEditIndex}
                      key={`organization-table-trow-${index}`}
                    />
                  )
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* </ThemeProvider> */}
      </Paper>
      <ReactTooltip id="tooltip-add" type="light" place="left" border={true} borderColor="text-grey-200">
        Add Row
      </ReactTooltip>
    </Box>
  )
}

export const EditableUsedByCompaniesTable = EditableUsedByCompaniesTableComponent
