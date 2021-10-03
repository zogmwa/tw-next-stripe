import { toast, ToastBar } from 'react-hot-toast'

export function ToastWithDismiss(t) {
  return (
    <ToastBar toast={t}>
      {({ icon, message }) => (
        <>
          {icon}
          {message}
          {t.type !== 'loading' && (
            <button className="p-2 bg-gray-200 rounded-md" onClick={() => toast.dismiss(t.id)}>
              Dismiss
            </button>
          )}
        </>
      )}
    </ToastBar>
  )
}
