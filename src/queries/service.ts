import axios from 'axios'
import toast from 'react-hot-toast'
import { Asset } from '../types/asset'
import { AttributeVote } from '../types/attribute_vote'

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
  const { data } = await axios.post<Asset>('/api/assets/', {
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

export async function fetchService(slug: string): Promise<Asset | null> {
  try {
    const { data } = await axios.get<Asset>(`/api/assets/${slug}`)
    return data
  } catch (error) {
    // TODO: error handling
    // eslint-disable-next-line no-console
    console.log('Failed to get service detail', error)
    return null
  }
}

// TODO: adapt this function for session.
export async function fetchVote(slug: string): Promise<Asset | null> {
  try {
    const { data } = await axios.get<Asset>(`/api/asset_reviews?asset=${slug}`)
    return data
  } catch (error) {
    // TODO: error handling
    toast.error('Something went wrong')
    return null
  }
}

export async function toggleUsedByStatus(slug: string, usedByMeStatus: boolean): Promise<boolean | null> {
  try {
    const { status } = await axios.post<boolean>(`/api/assets/${slug}/used_by_me/?used_by_me=${usedByMeStatus}`)
    if (status === 201) return true
    else if (status === 204) return false
  } catch (error) {
    // TODO: error handling
    toast.error('Something went wrong')
    return null
  }
}

export async function fetchAttributeVotes(): Promise<AttributeVote | null> {
  try {
    const { data } = await axios.get<AttributeVote>('/api/asset_attribute_votes/')
    return data
  } catch (error) {
    // TODO: error handling
    toast.error('Something went wrong')
    return null
  }
}

export async function toggleUpVoteAttribute(assetId: number, attributeId: number): Promise<AttributeVote | null> {
  try {
    // console.log('toggleUpVote ran')
    const { data } = await axios.post<AttributeVote>('/api/asset_attribute_votes/', {
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
    // console.log('toggleDownVote ran')
    const { status } = await axios.delete(`/api/asset_attribute_votes/${attributeId}/`)
    return status
  } catch (error) {
    // TODO: error handling
    toast.error('Something went wrong')
    return null
  }
}

export async function toggleUpVoteAsset(assetId: number) {
  try {
    const { data } = await client.post('/asset_votes/', {
      asset: assetId,
    })
    return data
  } catch (error) {
    // TODO: error handling
    toast.error('something went wrong')
    return null
  }
}

export async function toggleDownVoteAsset(voteId: number, slug: string) {
  try {
    const { status } = await client.delete(`/asset_votes/${voteId}/`, {
      data: { asset: slug },
    })
    return status
  } catch (error) {
    // TODO: error handling
    toast.error('something went wrong')
    return null
  }
}
