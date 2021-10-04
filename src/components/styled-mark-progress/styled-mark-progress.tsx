import React from 'react'
import { styled } from '@mui/material/styles'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'

type markProgressType = {
  className?: string
  mark: number
  topMark: number
  height: number
  label: string
  labelClassName?: string
  progressClassName?: string
  markClassName?: string
}

function MarkProgressComponent({
  className,
  mark,
  topMark,
  height,
  label,
  labelClassName,
  progressClassName,
  markClassName,
}: markProgressType) {
  const BorderMarkProgress = styled(LinearProgress)(({ theme }) => ({
    height: height,
    borderRadius: height / 2,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: height / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#FFE103' : '#FFF9CC',
    },
  }))

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className={`${labelClassName} min-w-min text-text-tertiary text-sm`}>{label}</span>
      <BorderMarkProgress className={progressClassName} variant="determinate" value={(mark * 100) / topMark} />
      <span className={`flex justify-end text-sm text-text-tertiary ${markClassName}`}>{mark}</span>
    </div>
  )
}

export const MarkProgress = MarkProgressComponent
