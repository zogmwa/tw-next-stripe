import React, { useState, useEffect } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import clsx from 'clsx'
import { useRequireLogin } from '@taggedweb/hooks/use-require-login'
import { Spinner } from '../spinner'

function UpvoteUserComponent({ isLoading, isVotedByMe, upvotesCount, usersCount, toggleUpvote, className = '' }) {
  const { requireLoginBeforeAction } = useRequireLogin()
  const unitlist = ['', 'K', 'M', 'G']
  const [isLoadingUpvote, setIsLoadingUpote] = useState(false)
  const [showVotedByMe, setShowVotedByMe] = useState(isVotedByMe)
  const [showUsersCount, setShowUsersCount] = useState(usersCount)
  const [showUpvotesCount, setShowUpvotesCount] = useState(upvotesCount)

  useEffect(() => {
    setIsLoadingUpote(isLoading)
  }, [isLoading])

  useEffect(() => {
    setShowVotedByMe(isVotedByMe)
  }, [isVotedByMe])

  useEffect(() => {
    setShowUsersCount(usersCount)
  }, [usersCount])

  useEffect(() => {
    setShowUpvotesCount(upvotesCount)
  }, [upvotesCount])

  function kFormater(number) {
    const sign = Math.sign(number)
    let unit = 0
    while (Math.abs(number) > 999) {
      unit = unit + 1
      number = Math.floor(Math.abs(number) / 100) / 10
    }
    return sign * number + unitlist[unit]
  }

  return (
    <div className={clsx('flex items-center space-x-2', className)}>
      <span
        className="flex items-center text-lg cursor-pointer"
        data-for="tooltip-upvote"
        data-tip
        onClick={requireLoginBeforeAction(() => toggleUpvote())}
      >
        {isLoadingUpvote ? (
          <Spinner className="mr-2 text-xs text-primary" />
        ) : (
          <IoIosArrowUp
            className={showVotedByMe ? 'text-xl text-primary mr-2 font-bold' : 'text-text-secondary mr-2'}
          />
        )}
        {kFormater(showUpvotesCount)}
      </span>
      <span className="self-end text-xs text-text-secondary pb-[0.2rem]">{kFormater(showUsersCount)} users</span>
    </div>
  )
}

export const UpvoteUser = UpvoteUserComponent
