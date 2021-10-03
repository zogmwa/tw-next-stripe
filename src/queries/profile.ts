import { Profile } from '../types/profile'
import { client } from '../utils/client'

export async function fetchUserProfile(username: string): Promise<Profile | void> {
  if (username) {
    const { data } = await client.get<Profile>(`/users/${username}/`)
    return data
  }
}
