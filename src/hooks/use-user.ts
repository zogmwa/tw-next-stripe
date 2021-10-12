import constate from 'constate'
import { useEffect, useCallback } from 'react'
import Router from 'next/router'
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
export function useSessionUser({ redirectTo = '', redirectIfFound = false } = {}): UserContextType {
  const { data: user, mutate: mutateUser, error } = useSWR<User & { authVerified: boolean }>('/api/user')

  const signInWithEmailAndPassword = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const { data } = await axios.post('/api/login', { email, password })
        mutateUser(data)
        return true
      } catch (error) {
        // eslint-disable-next-line no-console
        console.dir(error)
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

  const isLoggedIn = useCallback(() => {
    if ((user || error) && user?.authVerified === false) {
      return false
    } else {
      return true
    }
  }, [user, error])

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !isLoggedIn()) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && isLoggedIn())
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo, isLoggedIn])

  return {
    ...user,
    error,
    isLoggedIn,
    isLoading: !user && !error,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    logout,
    mutateUser,
  }
}

export const [UserProvider, useUserContext] = constate(useSessionUser)
