import constate from 'constate'
import { useCallback, useEffect, useReducer, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { fetchUserDetail } from '../queries/user'
import { User } from '../types/user'
import { client } from '../utils/client'
import { UserContextType } from '../types/user-context-type'

type State = {
  authVerified: boolean
  accessToken?: string
  refreshToken?: string
  userFetched: boolean
  email?: string
  userId?: number
  username?: string
  first_name?: string
  last_name?: string
}

type SetTokenAction = {
  type: 'setToken'
  payload: {
    accessToken?: string
    refreshToken?: string
  }
}

type SetUserDetailsAction = {
  type: 'setUserDetail'
  payload: User
}

type LogoutAction = {
  type: 'logout'
}

type Action = SetTokenAction | SetUserDetailsAction | LogoutAction

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setToken': {
      return {
        ...state,
        authVerified: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      }
    }

    case 'setUserDetail': {
      return {
        ...state,
        ...action.payload,
        userFetched: true,
      }
    }

    case 'logout': {
      return {
        userFetched: false,
        authVerified: false,
      }
    }

    default: {
      return state
    }
  }
}

function useUser(): UserContextType {
  const [state, dispatch] = useReducer(reducer, { authVerified: false, userFetched: false })
  const { push } = useRouter()

  let accessToken: string, refreshToken: string
  if (typeof window !== 'undefined') {
    accessToken = window.localStorage.getItem(process.env.ACCESS_TOKEN_LOCAL_STORAGE_KEY)
    refreshToken = window.localStorage.getItem(process.env.REFRESH_TOKEN_LOCAL_STORAGE_KEY)
  }

  useEffect(
    function setTokenFromLocalStorage() {
      if (
        typeof accessToken === 'string' &&
        typeof refreshToken === 'string' &&
        accessToken !== 'undefined' &&
        refreshToken !== 'undefined'
      ) {
        dispatch({
          type: 'setToken',
          payload: {
            accessToken,
            refreshToken,
          },
        })
      }
      // else {
      //   dispatch({
      //     type: 'setToken',
      //     payload: {},
      //   })
      // }
    },
    [accessToken, refreshToken],
  )

  // useQuery setup for fetching User Details
  /*
  const {
    data,
    error,
    refetch: refetchUserDetails,
  } = useQuery(['user', state.authVerified, refreshToken], () => fetchUserDetail(), {
    enabled: refreshToken && typeof refreshToken === 'string' && state.authVerified && refreshToken !== 'undefined',
  })

  useEffect(() => {
    if (error) {
      toast.error('Could not fetch user details')
    }
  }, [error])

  useEffect(() => {
    if (data) {
      dispatch({ type: 'setUserDetail', payload: data })
    }
  }, [data])

*/

  // useEffect setup for fetching User Details
  useEffect(
    function setUserDetailsAfterLogin() {
      async function setUserDetails() {
        try {
          const fetchedDetails = await fetchUserDetail()
          dispatch({ type: 'setUserDetail', payload: fetchedDetails })
        } catch (error) {
          toast.error('Could not get user details')
        }
      }
      if (
        state.authVerified === true &&
        typeof state.refreshToken === 'string' &&
        state.refreshToken &&
        state.refreshToken !== 'undefined'
      ) {
        setUserDetails()
      }
    },
    [state.authVerified, state.refreshToken],
  )

  const setToken = useCallback((accessToken?: string, refreshToken?: string) => {
    window.localStorage.setItem(process.env.ACCESS_TOKEN_LOCAL_STORAGE_KEY, accessToken)
    window.localStorage.setItem(process.env.REFRESH_TOKEN_LOCAL_STORAGE_KEY, refreshToken)
    dispatch({
      type: 'setToken',
      payload: {
        accessToken,
        refreshToken,
      },
    })
  }, [])

  const signInWithEmailAndPassword = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const { data } = await client.post<{ access_token: string; refresh_token: string; user: User }>(
          '/dj-rest-auth/login/',
          { email, password },
        )
        setToken(data.access_token, data.refresh_token)
        return true
      } catch (error) {
        toast.error('Invalid username and password')
        return false
      }
    },
    [setToken],
  )

  const signUpWithEmailAndPassword = useCallback(
    async (email: string, password1: string, password2: string): Promise<boolean> => {
      try {
        const { data } = await client.post<{ access_token: string; refresh_token: string; user: User }>(
          '/dj-rest-auth/registration/',
          { email, password1, password2 },
        )
        setToken(data.access_token, data.refresh_token)
        return true
      } catch (error) {
        if (error.response.data) {
          const obj = error.response.data
          toast.error(obj[Object.keys(obj)[0]])
        }
        return false
      }
    },
    [setToken],
  )

  const logout = useCallback(
    async function logout(): Promise<void> {
      if (typeof window !== 'undefined') {
        try {
          if (!state.authVerified) {
            toast.error('You are not logged in')
            return
          }
          console.log('LOGGING OUT')
          // revoke token access
          await client.post('/dj-rest-auth/logout/')
          // delete tokens from localStorage
          window.localStorage.removeItem(process.env.ACCESS_TOKEN_LOCAL_STORAGE_KEY)
          window.localStorage.removeItem(process.env.REFRESH_TOKEN_LOCAL_STORAGE_KEY)
          // remove tokens from state
          dispatch({ type: 'logout' })
          push('/')
        } catch (error) {
          console.dir('LOGGING OUT ERROR', error)
          toast.error('Could Not Logout')
        }
      }
    },
    [state.authVerified],
  )

  const contextValue = useMemo(
    () => ({
      ...state,
      setToken,
      signInWithEmailAndPassword,
      signUpWithEmailAndPassword,
      logout,
    }),
    [state, setToken, signInWithEmailAndPassword, signUpWithEmailAndPassword, logout],
  )

  return contextValue
}

export const [UserProvider, useUserContext] = constate(useUser)
