import constate from 'constate'
import { useCallback, useEffect, useReducer } from 'react'

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

  return {
    authVerified: state.authVerified,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    setToken,
  }
}

export const [UserProvider, useUserContext] = constate(useUser)
