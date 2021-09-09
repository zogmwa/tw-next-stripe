import slugify from 'slugify'
import { Service } from '../types/service'
import { client } from '../utils/client'

export type CreateServiceInput = {
  name: string
  shortDescription: string
  description?: string
  website: string
  logoUrl?: string
  promoVideo?: string
}

export async function createService(createServiceInput: CreateServiceInput): Promise<Service> {
  const slug = slugify(createServiceInput.name, { lower: true })
  const { data } = await client.post<Service>('/assets/', {
    slug,
    name: createServiceInput.name,
    short_description: createServiceInput.shortDescription,
    description: createServiceInput.description,
    website: createServiceInput.website,
    logo_url: createServiceInput.logoUrl,
    promo_video: createServiceInput.promoVideo,
  })
  return data
}
