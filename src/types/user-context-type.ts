export type UserContextType = {
  authVerified: boolean
  accessToken?: string
  refreshToken?: string
  userFetched: boolean
  email?: string
  pk?: number
  username?: string
  first_name?: string
  last_name?: string
  setToken: (accessToken?: string, refreshToken?: string) => void
  signInWithEmailAndPassword: (email: string, password: string) => Promise<boolean>
  signUpWithEmailAndPassword: (email: string, password1: string, password2: string) => Promise<boolean>
  logout: () => Promise<void>
}
