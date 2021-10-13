import React from 'react'
import { toast, ToastBar, Toast } from 'react-hot-toast'
import { AiOutlineClose } from 'react-icons/ai'

export function ToastWithDismiss(toastArg: Toast) {
  return (
    <ToastBar toast={toastArg}>
      {({ icon, message }) => (
        <>
          {icon}
          {message}
          {toastArg.type !== 'loading' && (
            <button
              className="hover:bg-gray-200 rounded-full p-1 focus:outline-none focus:ring-white"
              onClick={() => toast.dismiss(toastArg.id)}
            >
              <AiOutlineClose />
            </button>
          )}
        </>
      )}
    </ToastBar>
  )
}
