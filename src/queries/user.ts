import { User } from '../types/user'
import { client } from '../utils/client'

export async function fetchUserDetail(): Promise<User> {
  const { data } = await client.get<User>('/dj-rest-auth/user/')
  return data
}
