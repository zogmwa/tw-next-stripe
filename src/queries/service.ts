import { Service } from '../types/service'
import { client } from '../utils/client'

export type CreateServiceInput = {
  name: string
  slug: string
  shortDescription: string
  description?: string
  website: string
  logoUrl?: string
  promoVideo?: string
  snapshots?: { asset: number, url: string }[]
}

export async function createService(createServiceInput: CreateServiceInput): Promise<Service> {
  const { data } = await client.post<Service>('/assets/', {
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

export async function fetchService(slug: string): Promise<Service> {
  const { data } = await client.get<Service>(`/assets/${slug}`)
  return data
}
