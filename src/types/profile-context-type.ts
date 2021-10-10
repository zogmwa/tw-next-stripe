import { Profile } from './profile'

export type ProfileContextType = {
  profileFetched: boolean
  error: any
  isLoading: boolean
} & Partial<Profile>
