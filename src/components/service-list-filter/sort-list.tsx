import React, { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { Button } from '../button'

type SortServiceListProps = {
  defaultValue?: string
  onChange: (value: string) => void
}

export function SortServiceList({ defaultValue = '', onChange }: SortServiceListProps) {
  const [order, setOrder] = useState(defaultValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrder((event.target as HTMLInputElement).value)
    onChange((event.target as HTMLInputElement).value)
  }
  return (
    <div className="w-full px-2 py-2">
      <FormControl component="fieldset">
        <FormLabel component="legend">
          {<div className="py-2 text-lg font-medium text-text-primary">Sort By</div>}
        </FormLabel>
        <RadioGroup
          aria-label="Sort By"
          defaultValue={defaultValue}
          name="radio-buttons-group"
          value={order}
          onChange={handleChange}
        >
          <FormControlLabel
            value="-avg_rating"
            control={<Radio />}
            label={
              <div className="flex text-sm text-text-primary">
                Avg. Rating{' '}
                <span className="ml-1 text-lg font-bold">
                  <AiOutlineArrowDown />
                </span>
              </div>
            }
          />
          <FormControlLabel
            value="avg_rating"
            control={<Radio />}
            label={
              <div className="flex text-sm text-text-primary">
                Avg. Rating{' '}
                <span className="ml-1 text-lg font-bold">
                  <AiOutlineArrowUp />
                </span>
              </div>
            }
          />
          <FormControlLabel
            value="-upvotes_count"
            control={<Radio />}
            label={
              <div className="flex text-sm text-text-primary">
                Upvotes{' '}
                <span className="ml-1 text-lg font-bold">
                  <AiOutlineArrowDown />
                </span>
              </div>
            }
          />
          <FormControlLabel
            value="upvotes_count"
            control={<Radio />}
            label={
              <div className="flex text-sm text-text-primary">
                Upvotes{' '}
                <span className="ml-1 text-lg font-bold">
                  <AiOutlineArrowUp />
                </span>
              </div>
            }
          />
        </RadioGroup>
      </FormControl>
      {order !== '' && (
        <Button
          buttonType="primary"
          className="mt-2 mr-2"
          size="small"
          onClick={() => {
            setOrder('')
            onChange('')
          }}
        >
          Clear
        </Button>
      )}
    </div>
  )
}
