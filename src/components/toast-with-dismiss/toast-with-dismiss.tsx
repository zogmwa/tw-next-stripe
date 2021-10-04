import React from 'react'
import { toast, ToastBar, Toast } from 'react-hot-toast'

export function ToastWithDismiss(toastArg: Toast) {
  return (
    <ToastBar toast={toastArg}>
      {({ icon, message }) => (
        <>
          {icon}
          {message}
          {toastArg.type !== 'loading' && (
            <button className="p-2 bg-gray-200 rounded-md" onClick={() => toast.dismiss(toastArg.id)}>
              Dismiss
            </button>
          )}
        </>
      )}
    </ToastBar>
  )
}
