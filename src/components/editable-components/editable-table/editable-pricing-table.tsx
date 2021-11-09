import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import ReactTooltip from 'react-tooltip'
import { RiMenuAddFill } from 'react-icons/ri'
import { EditableTableHead, EditalePriceTableTrow } from './index'
import { Plan } from '../../../types/price-plan'

type EditablePricingTableComponentProps = {
  pricePlans: Plan[]
  defaultPriceData: Plan
  setEditPricePlans: React.Dispatch<React.SetStateAction<Plan[]>>
  isSubmit: boolean
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'summary',
    numeric: false,
    disablePadding: false,
    label: 'Summary',
  },
  {
    id: 'currency',
    numeric: false,
    disablePadding: false,
    label: 'Currency',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'per',
    numeric: false,
    disablePadding: false,
    label: 'Per',
  },
  {
    id: 'features',
    numeric: false,
    disablePadding: false,
    label: 'Features',
  },
  {
    id: 'mostPopular',
    numeric: false,
    disablePadding: false,
    label: 'Most Poplar',
  },
  {
    id: 'function',
    numeric: false,
    disablePadding: false,
    label: 'Delete',
  },
]

function EditablePricingTableComponent({
  pricePlans,
  defaultPriceData,
  setEditPricePlans,
  isSubmit,
}: EditablePricingTableComponentProps) {
  const [showPricePlans, setShowPricePlans] = useState(pricePlans)
  const [currentEditData, setCurrentEditData] = useState({
    name: '',
    summary: '',
    currency: '',
    price: 0,
    per: 'Month',
    features: '',
    most_popular: false,
  })
  const [currentEditIndex, setCurrentEditIndex] = useState(-1)

  useEffect(() => {
    setEditPricePlans([
      ...showPricePlans.slice(0, currentEditIndex),
      currentEditData,
      ...showPricePlans.slice(currentEditIndex + 1),
    ])
  }, [currentEditData])

  const handleAdd = () => {
    setShowPricePlans((prevState) => [...prevState, defaultPriceData])
    setEditPricePlans((prevState) => [...prevState, defaultPriceData])
  }

  const handleDelete = (index) => {
    setShowPricePlans((prevState) => [...prevState.slice(0, index), ...prevState.slice(index + 1)])
    setEditPricePlans((prevState) => [...prevState.slice(0, index), ...prevState.slice(index + 1)])
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
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <EditableTableHead headCells={headCells} />
            <TableBody>
              {showPricePlans.map((price, index) => (
                <EditalePriceTableTrow
                  rowData={price}
                  key={`${price.name}-${index}`}
                  rowIndex={index}
                  onDelete={handleDelete}
                  isSubmit={isSubmit}
                  setCurrentEditData={setCurrentEditData}
                  setCurrentEditIndex={setCurrentEditIndex}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ReactTooltip id="tooltip-add" type="light" place="left" border={true} borderColor="text-grey-200">
        Add Row
      </ReactTooltip>
    </Box>
  )
}

export const EditablePricingTable = EditablePricingTableComponent
