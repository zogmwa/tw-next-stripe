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
  fillColor?: string
  emptyColor?: string
  fillStyle?: any
  emptyStyle?: any
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
  fillColor = '#FFE103',
  emptyColor = '#FFFBE0',
  fillStyle,
  emptyStyle,
}: styledRatingStarType) {
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: fillColor,
      fontSize: size,
      ...fillStyle,
    },
    '& .MuiRating-iconEmpty': {
      color: emptyColor,
      fontSize: size,
      ...emptyStyle,
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
