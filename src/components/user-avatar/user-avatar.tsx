import React from 'react'
import { BsPersonFill } from 'react-icons/bs'

type AvatarUrl = {
  avatarUrl: string
  size: number
}
function UserAvatarComponent({ avatarUrl, size }: AvatarUrl) {
  return (
    <>
      {avatarUrl ? (
        <img src={avatarUrl} alt="user" className={`object-cover rounded-md w-${size} h-${size}`} />
      ) : (
        <div
          className={`flex items-center justify-center w-${size} h-${size} bg-gray-200 rounded-full focus-visible:ring-2 !focus:outline-none !shadow-none focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <BsPersonFill size={22} color="gray" />
        </div>
      )}
    </>
  )
}

export const UserAvatar = UserAvatarComponent
