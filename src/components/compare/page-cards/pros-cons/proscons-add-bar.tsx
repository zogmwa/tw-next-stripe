import React, { useState } from 'react'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import { toggleAddAttribute } from '@taggedweb/queries/service'
import { Input } from '../../../input'
import { Button } from '../../../button'

type AddPorsConsBarProps = {
  className?: string
  style?: React.CSSProperties
  isButtonShow?: boolean
  placeholder?: string
  isCon?: boolean
  asset?: number
  authVerified?: boolean
}

export function AddPorsConsBar({
  className,
  style,
  isButtonShow = true,
  placeholder,
  isCon,
  asset,
  authVerified,
}: AddPorsConsBarProps) {
  const [attribute, setAttribute] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (attribute === '') {
      setError('This field is not valid.')
    } else {
      const data = await toggleAddAttribute(asset, attribute, isCon)
      if (data) {
        toast.success('Successfully added.', {
          id: 'attribute-add-success',
        })
      } else {
        toast.success('Failed.', {
          id: 'attribute-add-error',
        })
      }
      setError('')
    }
  }

  return (
    <form className={clsx('flex space-x-2 w-full mb-2', className)} style={style} onSubmit={(e) => handleSubmit(e)}>
      <Input
        type="text"
        className={error ? 'w-full' : 'w-full mb-5'}
        placeholder={placeholder}
        onChange={(e) => setAttribute(e.target.value)}
        value={attribute}
        errorMessage={error || undefined}
      />
      {isButtonShow && (
        <Button type="submit" buttonType="primary" className="max-h-10" disabled={!authVerified}>
          Add
        </Button>
      )}
    </form>
  )
}
