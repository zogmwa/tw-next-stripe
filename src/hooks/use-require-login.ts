import { TOAST_AUTH_WINDOW_LOADING, TOAST_LOGIN_FAILED } from '@taggedweb/utils/token-id'
import { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { useSWRConfig } from 'swr'
import { useUserContext } from './use-user'

type UseRequireLogin = {
  requireLogin: () => void
  requireLoginBeforeAction: <P extends [any]>(handler: (...args: P) => any) => (...args: P) => void
}

/**
 * Hook for getting requireLogin and requireLoginBeforeAction functions
 * @returns {Object}
 */
export function useRequireLogin(): UseRequireLogin {
  const { isLoading, isLoggedIn } = useUserContext()
  const [popupWindow, setPopupWindow] = useState<Window>(null)
  const [handler, setHandler] = useState(null)
  const [handlerArguments, setArguments] = useState([])
  const [shouldCallHandler, setShouldCallHandler] = useState(false)
  const { mutate } = useSWRConfig()

  useEffect(() => {
    let popupTick
    if (popupWindow) {
      popupTick = setInterval(function () {
        if (popupWindow.closed) {
          clearInterval(popupTick)
          toast.error('Login Failed', {
            id: TOAST_LOGIN_FAILED,
            duration: 1000,
          })
          setPopupWindow(null)
        }
      }, 500)
    }

    const socialAuthSuccess = (e) => {
      if (e.source === popupWindow && e.data.popupAuthResponse === true) {
        setShouldCallHandler(true)
        clearInterval(popupTick)
      }
    }
    window.addEventListener('message', socialAuthSuccess)
    return () => {
      window.removeEventListener('message', socialAuthSuccess)
      clearInterval(popupTick)
    }
  }, [popupWindow])

  const openPopup = useCallback(() => {
    let popupOptions =
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no'

    if (screen.width > 500) {
      const left = Number(screen.width / 2 - 200)
      const top = Number(screen.height / 2 - 300)
      popupOptions += `, width=400, height=600, top=${top}, left=${left}`
    } else {
      popupOptions += `, width=${screen.width}, height=${screen.height}`
    }
    toast.loading('Loading window for Login', {
      id: TOAST_AUTH_WINDOW_LOADING,
    })
    const popup = window.open('/login?next=login', 'login_auth_popup', popupOptions)
    setPopupWindow(popup)
  }, [])

  /**
   * Function to open a popup if user is unauthenticated. Future implementation of this function might return a promise that resolves when user logs in and throw if user does not.
   */
  const requireLogin = useCallback(() => {
    if (!isLoading && isLoggedIn()) {
      return null
    } else {
      openPopup()
    }
  }, [isLoading, isLoggedIn, openPopup])

  useEffect(() => {
    async function callHandler() {
      if (shouldCallHandler) {
        if (handler) {
          setShouldCallHandler(false)
          await mutate('/api/user')
          handler(...handlerArguments)
          setHandler(null)
          setArguments([])
        }
      }
    }
    callHandler()
  }, [shouldCallHandler, handler, handlerArguments, mutate])

  /**
   * Wrapper for event handlers/other functions that accept a callback and check if the user is logged in and executes the handler if user is authenticated and opens a popup otherwise.
   * @param handler
   */
  const requireLoginBeforeAction = useCallback(
    (handler) => {
      return (...args) => {
        if (!isLoading && isLoggedIn()) {
          handler(...args)
        } else {
          openPopup()
          setHandler(() => handler) // Cannot pass a function to a useState setter directly as it will get executed.
          setArguments(args)
        }
      }
    },
    [isLoading, isLoggedIn, openPopup],
  )

  return {
    requireLogin,
    requireLoginBeforeAction,
  }
}
