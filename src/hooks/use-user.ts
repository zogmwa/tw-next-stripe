import constate from 'constate'
import { useCallback, useEffect, useReducer } from 'react'
import { toast } from 'react-hot-toast'
import { User } from '../types/user'
import { client } from '../utils/client'

type State = {
  authVerified: boolean
  accessToken?: string
  refreshToken?: string
}

type SetTokenAction = {
  type: 'setToken'
  payload: {
    accessToken?: string
    refreshToken?: string
  }
}

type Action = SetTokenAction

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setToken': {
      return {
        authVerified: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      }
    }

    default: {
      return state
    }
  }
}

function useUser() {
  const [state, dispatch] = useReducer(reducer, { authVerified: false })

  useEffect(function setTokenFromLocalStorage() {
    if (typeof window !== 'undefined') {
      const accessToken = window.localStorage.getItem(process.env.ACCESS_TOKEN_LOCAL_STORAGE_KEY)
      const refreshToken = window.localStorage.getItem(process.env.REFRESH_TOKEN_LOCAL_STORAGE_KEY)
      if (typeof accessToken === 'string' && typeof refreshToken === 'string') {
        dispatch({
          type: 'setToken',
          payload: {
            accessToken,
            refreshToken,
          },
        })
      } else {
        dispatch({
          type: 'setToken',
          payload: {},
        })
      }
    }
  }, [])

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

  return {
    authVerified: state.authVerified,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    setToken,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
  }
}

export const [UserProvider, useUserContext] = constate(useUser)
