export type User = {
  pk: number
  username: string
  email: string
  first_name?: string
  last_name?: string
}

export type UserInfo = {
  id: number
  username: string
  first_name?: string
  last_name?: string
  email?: string
  avatar?: string
}
