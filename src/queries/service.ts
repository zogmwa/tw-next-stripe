import { Asset } from '../types/asset'
import { client } from '../utils/client'

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

export async function fetchService(slug: string): Promise<Asset> {
  const { data } = await client.get<Asset>(`/assets/${slug}`)
  return data
}

export async function fetchVote(slug: string): Promise<Asset> {
  const { data } = await client.get<Asset>(`/${slug}`)
  return data
}

export async function toggleUsedByStatus(slug: string, status: boolean): Promise<boolean> {
  const { data } = await client.post<boolean>(`/assets/${slug}/used_by_me/?used_by_me=${status}`)
  return data
}
