import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import Typography from '@mui/material/Typography'
import { Button } from '../button'
import { Spinner } from '../spinner'

type ReviewReactionProps = {
  avgRating: number
  onChangeStatus: Function
  statusType: string
  className?: string
  popupClassName?: string
  emojiClassName?: string
  isLoading: boolean
}

function ReviewReactionComponent({
  avgRating,
  statusType,
  onChangeStatus,
  className,
  popupClassName,
  emojiClassName,
  isLoading,
}: ReviewReactionProps) {
  const [clickedStatus, setClickedStatus] = useState('')

  useEffect(() => {
    if (!isLoading) setClickedStatus('')
  }, [isLoading])

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div className={className}>
          <Button className="!border-0 !p-0" {...bindTrigger(popupState)}>
            <>
              {avgRating > 0 && <img src="/images/happy.png" alt="happy" className="w-8 h-8" />}
              {avgRating == 0 && <img src="/images/neutral.png" alt="neutral" className="w-8 h-8" />}
              {avgRating < 0 && <img src="/images/sad.png" alt="sad" className="w-8 h-8" />}
            </>
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ paddingY: '0.5rem', paddingX: '1rem' }}>
              <div className={clsx('flex ', popupClassName)}>
                <div className={clsx(emojiClassName)}>
                  {isLoading && clickedStatus === 'S' ? (
                    <Spinner className="!w-8 !h-8" />
                  ) : (
                    <img
                      src="/images/sad.png"
                      alt="sad"
                      onClick={() => {
                        if (!isLoading) {
                          setClickedStatus('S')
                          onChangeStatus('S')
                        }
                      }}
                      className={clsx(
                        statusType !== 'S' ? 'opacity-20 ' : null,
                        'hover:opacity-70 cursor-pointer w-8 h-8',
                      )}
                    />
                  )}
                </div>
                <div className={clsx(emojiClassName)}>
                  {isLoading && clickedStatus === 'N' ? (
                    <Spinner className="!w-8 !h-8" />
                  ) : (
                    <img
                      src="/images/neutral.png"
                      alt="neutral"
                      onClick={() => {
                        if (!isLoading) {
                          setClickedStatus('N')
                          onChangeStatus('N')
                        }
                      }}
                      className={clsx(
                        statusType !== 'N' ? 'opacity-20 ' : null,
                        'hover:opacity-70 cursor-pointer w-8 h-8',
                      )}
                    />
                  )}
                </div>
                <div className={clsx(emojiClassName)}>
                  {isLoading && clickedStatus === 'H' ? (
                    <Spinner className="!w-8 !h-8" />
                  ) : (
                    <img
                      src="/images/happy.png"
                      alt="happy"
                      onClick={() => {
                        if (!isLoading) {
                          setClickedStatus('H')
                          onChangeStatus('H')
                        }
                      }}
                      className={clsx(
                        statusType !== 'H' ? 'opacity-20 ' : null,
                        'hover:opacity-70 cursor-pointer w-8 h-8',
                      )}
                    />
                  )}
                </div>
              </div>
            </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}

export const ReviewReaction = ReviewReactionComponent
