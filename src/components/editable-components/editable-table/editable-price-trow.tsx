import React, { useState, useEffect } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { Plan } from '@taggedweb/types/price-plan'

type EditalePriceTableTrowComponentProps = {
  rowData: Plan
  rowIndex: number
  onDelete: Function
  isSubmit: boolean
  setCurrentEditData: React.Dispatch<React.SetStateAction<Plan>>
  setCurrentEditIndex: React.Dispatch<React.SetStateAction<number>>
}

function EditalePriceTableTrowComponent({
  rowData,
  rowIndex,
  onDelete,
  isSubmit,
  setCurrentEditData,
  setCurrentEditIndex,
}: EditalePriceTableTrowComponentProps) {
  const [editData, setEditData] = useState(rowData)
  const [errorMessage, setErrorMessage] = useState({
    name: '',
    currency: '',
  })

  useEffect(() => {
    if (isSubmit) {
      let isError = false
      let nameError = ''
      let currencyError = ''
      if (editData.name === '') {
        isError = true
        nameError = 'This value is not valid.'
      }
      if (editData.name === '') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isError = true
        currencyError = 'This value is not valid.'
      }
      setErrorMessage((prevState) => ({ ...prevState, ...{ name: nameError, currency: currencyError } }))
    }
  }, [isSubmit])

  useEffect(() => {
    setCurrentEditData(editData)
    setCurrentEditIndex(rowIndex)
  }, [editData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFeaturesChange = (e) => {
    setEditData((prevState) => ({
      ...prevState,
      features: e.target.value.split('\n'),
    }))
  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <input
          type="text"
          className="p-1 border border-solid rounded-md border-border-default"
          name="name"
          value={editData.name}
          onChange={(event) => handleChange(event)}
        />
        {errorMessage.name !== '' && <span className="text-xs text-red-600">{errorMessage.name}</span>}
      </TableCell>
      <TableCell>
        <input
          type="text"
          className="p-1 border border-solid rounded-md border-border-default"
          name="summary"
          value={editData.summary}
          onChange={(event) => handleChange(event)}
        />
      </TableCell>
      <TableCell>
        <input
          type="text"
          className="p-1 border border-solid rounded-md border-border-default"
          name="currency"
          value={editData.currency}
          onChange={(event) => handleChange(event)}
        />
        {errorMessage.currency !== '' && <span className="text-xs text-red-600">{errorMessage.currency}</span>}
      </TableCell>
      <TableCell>
        <input
          type="number"
          className="p-1 border border-solid rounded-md border-border-default"
          name="price"
          value={editData.price}
          onChange={(event) => handleChange(event)}
        />
      </TableCell>
      <TableCell>
        <input
          type="text"
          className="p-1 border border-solid rounded-md border-border-default"
          name="per"
          value={editData.per}
          onChange={(event) => handleChange(event)}
        />
      </TableCell>
      <TableCell>
        <textarea
          className="p-1 border border-solid rounded-md border-border-default"
          name="features"
          value={editData.features.join('\n')}
          onChange={(event) => handleFeaturesChange(event)}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            className="p-1 border border-solid rounded-md border-border-default"
            name="most_popular"
            checked={editData.most_popular}
            onChange={() =>
              setEditData((prevState) => ({
                ...prevState,
                most_popular: !prevState.most_popular,
              }))
            }
          />
        </div>
      </TableCell>
      <TableCell align="center">
        <div className="flex items-center justify-center">
          <RiDeleteBin5Line onClick={() => onDelete(rowIndex)} className="text-red-600 cursor-pointer" />
        </div>
      </TableCell>
    </TableRow>
  )
}

export const EditalePriceTableTrow = EditalePriceTableTrowComponent
