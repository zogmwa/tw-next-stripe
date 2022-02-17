import React from 'react'
import { BsPersonFill } from 'react-icons/bs'

type UserAvatarType = {
  user: {
    avatar?: string
    username: string
    first_name: string
    last_name: string
  }
  size: number
}
function UserAvatarComponent({ user, size }: UserAvatarType) {
  return (
    <>
      {user?.avatar ? (
        <img src={user.avatar} alt={user.username} className={`object-cover rounded-md w-${size} h-${size}`} />
      ) : user.first_name[0] && user.last_name[0] ? (
        <div
          className={`flex items-center justify-center w-${size} h-${size} bg-gray-200 rounded-full focus-visible:ring-2 !focus:outline-none !shadow-none focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <p>{user.first_name[0] + user.last_name[0]}</p>
        </div>
      ) : (
        <div
          className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus-visible:ring-2 !focus:outline-none !shadow-none focus-visible:ring-white focus-visible:ring-opacity-75"
          style={{ boxShadow: 'none !important' }}
        >
          <BsPersonFill size={22} color="gray" />
        </div>
      )}
    </>
  )
}

export const UserAvatar = UserAvatarComponent
