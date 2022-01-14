import React, { useState } from 'react'
import clsx from 'clsx'
import { Button } from '../button'
import { Input } from '../input'

type AddCardDetailComponentProps = {
  className?: string
  addCardFunction: Function
}

function AddCardDetailComponent({ className, addCardFunction }: AddCardDetailComponentProps) {
  const [holder, setHolder] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvc, setCvc] = useState('')
  const [holderError, setHolderError] = useState('')
  const [cardNumberError, setCardNumbeError] = useState('')
  const [expiryDateError, setExpiryDateError] = useState('')
  const [cvcError, setCvcError] = useState('')

  const addCard = () => {
    let error = false
    if (holder.length < 1) {
      error = true
      setHolderError('Please check your name')
    } else {
      setHolderError('')
    }
    if (cardNumber.replaceAll(' ', '').length !== 16) {
      error = true
      setCardNumbeError('Please check your card number')
    } else {
      setCardNumbeError('')
    }
    if (expiryDate.length !== 5) {
      error = true
      setExpiryDateError('Please check your card expiry date')
    } else {
      let stringDate = expiryDate.split('/')
      let cardDate = new Date(Number('20' + stringDate[1]), Number(stringDate[0]) - 1, 0)
      if (cardDate < new Date()) {
        error = true
        setExpiryDateError('Please check your card expiry date')
      } else {
        setExpiryDateError('')
      }
    }
    if (cvc.length !== 3) {
      error = true
      setCvcError('Please check your cvc number')
    } else {
      setCvcError('')
    }
    if (!error) {
      let stringDate = expiryDate.split('/')
      setCardNumbeError('')
      setExpiryDateError('')
      setCvcError('')
      addCardFunction(holder, new Date(Number('20' + stringDate[1]), Number(stringDate[0]) - 1, 0), cvc)
    }
  }

  return (
    <div className={clsx('flex flex-col', className)}>
      <span className="text-2xl text-primay font-bold">Add Card Detail</span>
      <div>
        <span className="text-md text-text-default">Full name: </span>
        <Input
          type="text"
          inputClassName="bg-background-dark"
          value={holder}
          onChange={(e) => setHolder(e.target.value)}
          errorMessage={holderError}
        />
      </div>
      <div className="mt-2">
        <span className="text-md text-text-default">Card Info: </span>
        <div className="flex md:flex-row flex-col bg-white">
          <Input
            inputClassName="border-0 bg-background-dark rounded-md md:rounded-none md:rounded-l-md"
            className="w-full rounded-md md:rounded-none md:rounded-l-md"
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => {
              var inputValue = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
              var matches = inputValue.match(/\d{4,16}/g)
              var match = (matches && matches[0]) || ''
              var parts = []

              for (let i = 0, len = match.length; i < len; i += 4) {
                parts.push(match.substring(i, i + 4))
              }

              if (parts.length) {
                setCardNumber(parts.join(' '))
              } else {
                setCardNumber(e.target.value)
              }
            }}
            errorMessage={cardNumberError}
          />
          <div className="flex md:basis-1/4 mt-2 md:mt-0 rounded-md md:rounded-none">
            <Input
              className="rounded-none rounded-l-md md:rounded-none"
              inputClassName="border-0 bg-background-dark rounded-none rounded-l-md md:rounded-none"
              type="text"
              placeholder="MM / YY"
              value={expiryDate}
              onChange={(e) => {
                if (e.target.value.length < 6) {
                  let value = e.target.value.replace(/\D/g, '')
                  if (value.length > 2) value = value.replace(/.{2}/, '$&/')
                  const splitValue = value.split('/')
                  if (Number(splitValue[0]) <= 12) setExpiryDate(value)
                }
              }}
              errorMessage={expiryDateError}
            />
            <Input
              className="rounded-none rounded-r-md"
              inputClassName="border-0 bg-background-dark rounded-none rounded-r-md"
              type="text"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => {
                if (e.target.value.length <= 3) setCvc(e.target.value)
              }}
              errorMessage={cvcError}
            />
          </div>
        </div>
      </div>
      <Button className="mt-6 self-end" onClick={addCard}>
        Add Card
      </Button>
    </div>
  )
}

export const AddCardDetail = AddCardDetailComponent
