import constate from 'constate'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import toast from 'react-hot-toast'
import { UserContextType } from '../types/user-context-type'
import { User } from '../types/user'

/**
 * Fetches user details from /api/user. Provides user details and essential methods such as isLoggedIn, logout, mutateUser.
 * @param config
 * @returns userContext
 */
export function useSessionUser(): UserContextType {
  const { data: user, mutate: mutateUser, error } = useSWR<User & { authVerified: boolean }>('/api/user')
  const router = useRouter()
  const [nextPageUrl, setNextPageUrlState] = useState('/')

  const signInWithEmailAndPassword = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const { data } = await axios.post('/api/login', { email, password })
        await mutateUser(data)
        return true
      } catch (error) {
        toast.error('Invalid username and password')
        return false
      }
    },
    [mutateUser],
  )

  const signUpWithEmailAndPassword = useCallback(
    async (email: string, password1: string, password2: string): Promise<boolean> => {
      try {
        const { data } = await axios.post('/api/signup/', { email, password1, password2 })
        await mutateUser(data)
        return true
      } catch (error) {
        if (error.response.data) {
          const obj = error.response.data
          toast.error(obj[Object.keys(obj)[0]])
        }
        return false
      }
    },
    [mutateUser],
  )

  const logout = useCallback(
    async function logout(): Promise<void> {
      if (typeof window !== 'undefined') {
        try {
          if (!user?.authVerified) {
            toast.error('You are not logged in')
            return
          }

          try {
            const { data } = await axios.post('/api/logout/')
            mutateUser(data)
          } catch (error) {
            if (error.response.status !== 401) throw error
          }
        } catch (error) {
          toast.error('Could Not Logout')
        }
      }
    },
    [user?.authVerified, mutateUser],
  )

  useEffect(() => {
    const url = localStorage.getItem('next_page_url')
    if (url && url !== 'undefined' && url !== nextPageUrl) {
      localStorage.removeItem('next_page_url')
      setNextPageUrlState(url)
    }
  }, [setNextPageUrlState, nextPageUrl])

  const setNextPageUrl = useCallback((url: string = '/') => {
    setNextPageUrlState(url)
    localStorage.setItem('next_page_url', url)
  }, [])

  const nextPageRedirect = useCallback(() => {
    localStorage.removeItem('next_page_url')
    if (router.pathname === '/login-with-google' || router.pathname === '/login-with-linkedin') {
      return router.replace(nextPageUrl)
    }
    return router.push(nextPageUrl)
  }, [nextPageUrl, router])

  const isLoggedIn = useCallback(() => {
    if ((user || error) && user?.authVerified === false) {
      return false
    } else {
      return true
    }
  }, [user, error])

  return {
    ...user,
    error,
    isLoggedIn,
    isLoading: !user && !error,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    logout,
    setNextPageUrl,
    nextPageRedirect,
    mutateUser,
  }
}

export const [UserProvider, useUserContext] = constate(useSessionUser)
