import constate from 'constate'
import { useEffect, useReducer } from 'react'
import { toast } from 'react-hot-toast'
import { useQuery } from 'react-query'
import { fetchUserProfile } from '../queries/profile'
import { Profile } from '../types/profile'
import { useUserContext } from './use-user'
import { ProfileContextType } from '../types/profile-context-type'

type State = ProfileContextType

type SetUserProfileAction = {
  type: 'setUserProfile'
  payload: Profile
}

type Action = SetUserProfileAction

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setUserProfile': {
      return { profileFetched: true, ...action.payload }
    }
    default: {
      return state
    }
  }
}

function useProfile(): ProfileContextType {
  const [state, dispatch] = useReducer(reducer, { profileFetched: false, submitted_assets: [] })
  const { refreshToken, username, userFetched } = useUserContext()
  const { data, error } = useQuery(['profile', username], () => fetchUserProfile(username), {
    enabled: typeof refreshToken === 'string' && userFetched && refreshToken !== 'undefined',
  })

  useEffect(() => {
    if (error) {
      toast.error('Could not fetch user profile')
    }
  }, [error])

  useEffect(() => {
    if (data) {
      dispatch({ type: 'setUserProfile', payload: data })
    }
  }, [data])

  return state
}

export const [ProfileProvider, useProfileContext] = constate(useProfile)
