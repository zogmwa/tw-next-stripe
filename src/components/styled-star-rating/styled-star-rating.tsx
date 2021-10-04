import React from 'react'
import Rating from '@mui/material/Rating'
import { styled } from '@mui/material/styles'

type styledRatingStarType = {
  className?: string
  defaultValue: number
  precision: number
  size: string
  emptyIcon?: any
  emptyLabelText?: any
  getLabelText?: any
  highlightSelectedOnly?: any
  icon?: any
  IconContainerComponent?: any
  max?: number
  name: string
  onChange?: any
  onChangeActive?: any
  value?: number
  readOnly?: boolean
}

function StyledStarRatingComponent({
  className,
  defaultValue,
  precision,
  size,
  emptyIcon,
  emptyLabelText,
  getLabelText,
  highlightSelectedOnly,
  icon,
  IconContainerComponent,
  max,
  name,
  onChange,
  onChangeActive,
  value,
  readOnly = false,
}: styledRatingStarType) {
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#FFE103',
      fontSize: size,
    },
    '& .MuiRating-iconEmpty': {
      color: '#FFFBE0',
      fontSize: size,
    },
  })

  return (
    <StyledRating
      className={className}
      name={name}
      defaultValue={defaultValue}
      precision={precision}
      readOnly={readOnly}
      emptyIcon={emptyIcon}
      emptyLabelText={emptyLabelText}
      getLabelText={getLabelText}
      highlightSelectedOnly={highlightSelectedOnly}
      icon={icon}
      IconContainerComponent={IconContainerComponent}
      max={max}
      onChange={onChange}
      onChangeActive={onChangeActive}
      value={value}
    />
  )
}

export const StyledStarRating = StyledStarRatingComponent
