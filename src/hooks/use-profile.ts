import useSWR from 'swr'
import { ProfileContextType } from '@taggedweb/types/profile-context-type'
import { useUserContext } from './use-user'

/**
 * Fetches user profile from api when the user is logged in.
 * @returns profile
 */
export function useProfile(): ProfileContextType {
  const { authVerified } = useUserContext()
  const { data, error } = useSWR(authVerified ? '/api/profile' : null)

  return {
    ...data,
    error,
    isLoading: !data && !error,
  }
}
