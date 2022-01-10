import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import Typography from '@mui/material/Typography'
import { SAD_FACE_RATING, NEUTRAL_FACE_RATING, HAPPY_FACE_RATING } from '@taggedweb/utils/constants'
import { Button } from '../button'
import { Spinner } from '../spinner'

type ReviewReactionProps = {
  avgRating: string | number
  onChangeStatus: Function
  statusType?: number | string | null
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
  const [clickedStatus, setClickedStatus] = useState<null | number>(null)

  useEffect(() => {
    if (!isLoading) setClickedStatus(null)
  }, [isLoading])

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div className={className}>
          <Button className="!border-0 !p-0" {...bindTrigger(popupState)}>
            <>
              {avgRating > 0 && <img src="/images/happy.png" alt="happy" className="w-8 h-8" />}
              {avgRating === 0 && <img src="/images/neutral.png" alt="neutral" className="w-8 h-8" />}
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
                  {isLoading && clickedStatus === SAD_FACE_RATING ? (
                    <Spinner className="!w-8 !h-8" />
                  ) : (
                    <img
                      src="/images/sad.png"
                      alt="sad"
                      onClick={() => {
                        if (!isLoading) {
                          setClickedStatus(SAD_FACE_RATING)
                          onChangeStatus(SAD_FACE_RATING)
                        }
                      }}
                      className={clsx(
                        statusType !== SAD_FACE_RATING ? 'opacity-20 ' : null,
                        'hover:opacity-70 cursor-pointer w-8 h-8',
                      )}
                    />
                  )}
                </div>
                <div className={clsx(emojiClassName)}>
                  {isLoading && clickedStatus === NEUTRAL_FACE_RATING ? (
                    <Spinner className="!w-8 !h-8" />
                  ) : (
                    <img
                      src="/images/neutral.png"
                      alt="neutral"
                      onClick={() => {
                        if (!isLoading) {
                          setClickedStatus(NEUTRAL_FACE_RATING)
                          onChangeStatus(NEUTRAL_FACE_RATING)
                        }
                      }}
                      className={clsx(
                        statusType !== NEUTRAL_FACE_RATING ? 'opacity-20 ' : null,
                        'hover:opacity-70 cursor-pointer w-8 h-8',
                      )}
                    />
                  )}
                </div>
                <div className={clsx(emojiClassName)}>
                  {isLoading && clickedStatus === HAPPY_FACE_RATING ? (
                    <Spinner className="!w-8 !h-8" />
                  ) : (
                    <img
                      src="/images/happy.png"
                      alt="happy"
                      onClick={() => {
                        if (!isLoading) {
                          setClickedStatus(HAPPY_FACE_RATING)
                          onChangeStatus(HAPPY_FACE_RATING)
                        }
                      }}
                      className={clsx(
                        statusType !== HAPPY_FACE_RATING ? 'opacity-20 ' : null,
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
