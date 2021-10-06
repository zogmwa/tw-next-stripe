import { Asset } from '../types/asset'
import { client, noAuthClient } from '../utils/client'

export type CreateServiceInput = {
  name: string
  slug: string
  shortDescription: string
  description?: string
  website: string
  logoUrl?: string
  promoVideo?: string
  snapshots?: { asset: number; url: string }[]
}

export async function createService(createServiceInput: CreateServiceInput): Promise<Asset> {
  const { data } = await client.post<Asset>('/assets/', {
    slug: createServiceInput.slug,
    name: createServiceInput.name,
    short_description: createServiceInput.shortDescription,
    description: createServiceInput.description,
    website: createServiceInput.website,
    logo_url: createServiceInput.logoUrl,
    promo_video: createServiceInput.promoVideo,
    snapshots: createServiceInput.snapshots,
  })
  return data
}

export async function fetchService(slug: string, authVerified: boolean): Promise<Asset> {
  const apiClient = authVerified ? client : noAuthClient
  try {
    const { data } = await apiClient.get<Asset>(`/assets/${slug}`)
    return data
  } catch (error) {
    console.log('Failed to get service detail', error)
    return null
  }
}

export async function fetchVote(slug: string): Promise<Asset> {
  const { data } = await client.get<Asset>(`/${slug}`)
  return data
}

export async function toggleUsedByStatus(slug: string, usedByMeStatus: boolean): Promise<boolean | null> {
  const { status } = await client.post<boolean>(`/assets/${slug}/used_by_me/?used_by_me=${usedByMeStatus}`)
  if (status === 201) return true
  else if (status === 204) return false
  else return null
}
