import React, { useState, useEffect } from 'react'
// import { BiDollar } from 'react-icons/bi'
import { Button } from '../button'

type InputPriceFilterProps = {
  filterByPrice?: (minPrice: string, maxPrice: string) => void
  onClickClearFilter?: boolean
}

export function InputPriceFilter({ filterByPrice, onClickClearFilter }: InputPriceFilterProps) {
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMinPrice('')
    setMaxPrice('')
  }, [onClickClearFilter])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (parseInt(maxPrice) < parseInt(minPrice)) {
      const tempMinPrice = minPrice
      setMinPrice(maxPrice)
      setMaxPrice(tempMinPrice)
      filterByPrice(maxPrice, minPrice)
      return
    } else if (minPrice === '' && maxPrice !== '') {
      setMinPrice('0')
    }
    setMessage('')
    filterByPrice(minPrice, maxPrice)
  }

  return (
    <div className="mb-2 border-b">
      <form onSubmit={handleSubmit} className="flex flex-col w-full my-2 mb-4 space-y-3 ">
        <div className="flex flex-col space-x-1 space-y-1 lg:flex-row lg:items-center ">
          <span className="text-base"> Range: </span>
          {/* <div className="flex w-full bg-white border border-gray-300 rounded"> */}
          {/* <BiDollar className="inline-block text-lg" /> */}
          <div className="space-x-2 text-center lg:space-x-1">
            <input
              value={minPrice}
              onChange={async (e) => await setMinPrice(e.target.value)}
              type="number"
              placeholder="$ min"
              className="inline-block p-1 text-sm text-center border border-gray-300 rounded w-14 lg:text-base lg:w-16 place-content-center"
            />
            {/* </div> */}
            <span className="text-base"> to </span>
            <input
              value={maxPrice}
              onChange={async (e) => await setMaxPrice(e.target.value)}
              type="number"
              placeholder="$ max"
              className="inline-block p-1 text-sm text-center border border-gray-300 rounded w-14 lg:text-base lg:w-16 place-content-center"
            />
          </div>
        </div>
        {message && <p className="text-xs text-red-500">{message}</p>}
        <Button className="w-11/12 place-self-center" buttonType="primary" type="submit">
          Filter
        </Button>
      </form>
    </div>
  )
}
