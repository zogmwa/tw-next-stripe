import clsx from 'clsx'
import React from 'react'
import { HiCheck } from 'react-icons/hi'

export type Step = {
  id: string
  name: string
}

type StepperProps = {
  steps: Step[]
  activeIndex: number
  className?: string
  style?: React.CSSProperties
}

export function Stepper({ steps, activeIndex, className, style }: StepperProps) {
  return (
    <div
      className={clsx('px-4 py-2 bg-background-surface rounded-md border border-border-default', className)}
      style={style}
    >
      {steps.map((step, index) => {
        const isActive = index === activeIndex
        const isCompleted = index < activeIndex

        return (
          <div key={step.id} className="relative flex items-center py-1">
            {index < steps.length - 1 ? (
              <div
                className={clsx(
                  'absolute top-0 bottom-0 transform translate-y-4 border-r left-2',
                  isCompleted ? 'border-primary' : 'border-dashed border-border-default',
                )}
              />
            ) : null}
            <div
              className={clsx(
                'w-4 h-4 border rounded-full flex items-center justify-center relative z-[] mr-2',
                (() => {
                  if (isActive) {
                    return 'border-primary bg-background-surface'
                  }
                  if (isCompleted) {
                    return 'bg-primary border-primary'
                  }
                  return 'border-border-default bg-background-surface'
                })(),
              )}
            >
              {isActive ? <span className="-mt-2 text-sm font-medium leading-none text-primary">...</span> : null}
              {isCompleted ? <HiCheck className="text-text-on-surface" size={12} /> : null}
            </div>
            <div
              className={clsx(
                'flex-1 py-1 px-2 text-sm rounded',
                isActive ? 'text-primary bg-secondary bg-opacity-25' : 'text-text-tertiary',
              )}
            >
              {step.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}
