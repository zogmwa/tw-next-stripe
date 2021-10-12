import { KeyedMutator } from 'swr'
import { User } from './user'

export type UserContextType = {
  authVerified?: boolean
  email?: string
  pk?: number
  username?: string
  first_name?: string
  last_name?: string
  error?: any
  isLoading: boolean
  isLoggedIn: () => boolean
  signInWithEmailAndPassword: (email: string, password: string) => Promise<boolean>
  signUpWithEmailAndPassword: (email: string, password1: string, password2: string) => Promise<boolean>
  logout: () => Promise<void>
  mutateUser: KeyedMutator<User & { authVerified: boolean }>
}
