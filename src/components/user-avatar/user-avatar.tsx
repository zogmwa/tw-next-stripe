import React from 'react'

type UserAvatarType = {
  user: {
    avatar: string
    first_name: string
    last_name: string
  }
  size: number
}
function UserAvatarComponent({ user, size }: UserAvatarType) {
  return (
    <>
      {user.avatar ? (
        <img src={user.avatar} alt="user" className={`object-cover rounded-md w-${size} h-${size}`} />
      ) : (
        <div
          className={`flex items-center justify-center w-${size} h-${size} bg-gray-200 rounded-full focus-visible:ring-2 !focus:outline-none !shadow-none focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <p>{user.first_name[0] + user.last_name[0]}</p>
        </div>
      )}
    </>
  )
}

export const UserAvatar = UserAvatarComponent
