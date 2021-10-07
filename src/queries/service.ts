import toast from 'react-hot-toast'
import { Asset } from '../types/asset'
import { attributeVote } from '../types/attribute_vote'
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
    // TODO: error handling
    console.log('Failed to get service detail', error)
    return null
  }
}

export async function fetchVote(slug: string): Promise<Asset | null> {
  try {
    const { data } = await client.get<Asset>(`/${slug}`)
    return data
  } catch (error) {
    // TODO: error handling
    toast.error('Something went wrong')
    return null
  }
}

export async function toggleUsedByStatus(slug: string, usedByMeStatus: boolean): Promise<boolean | null> {
  try {
    const { status } = await client.post<boolean>(`/assets/${slug}/used_by_me/?used_by_me=${usedByMeStatus}`)
    if (status === 201) return true
    else if (status === 204) return false
  } catch (error) {
    // TODO: error handling
    toast.error('Something went wrong')
    return null
  }
}

export async function fetchAttributeVotes(): Promise<attributeVote> {
  try {
    const { data } = await client.get<attributeVote>('/asset_attribute_votes/')
    return data
  } catch (error) {
    // TODO: error handling
    toast.error('Something went wrong')
    return null
  }
}

export async function toggleUpVoteAttribute(assetId: number, attributeId: number): Promise<any> {
  try {
    const { data } = await client.post('/asset_attribute_votes/', {
      asset: assetId,
      attribute: attributeId,
      is_upvote: true,
    })
    return data
  } catch (error) {
    // TODO: error handling
    toast.error('Something went wrong')
    return null
  }
}

export async function toggleDownVoteAttribute(attributeId: number): Promise<number | null> {
  try {
    const { status } = await client.delete(`/asset_attribute_votes/${attributeId}/`)
    return status
  } catch (error) {
    // TODO: error handling
    toast.error('Something went wrong')
    return null
  }
}
