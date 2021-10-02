import { Profile } from './profile'

export type ProfileContextType = {
  profileFetched: boolean
} & Partial<Profile>
