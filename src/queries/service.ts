import axios from 'axios'
import toast from 'react-hot-toast'
import { Asset, AssetVote } from '../types/asset'
import { AttributeVote, VotedAttribute } from '../types/attribute_vote'
import { ServiceQuestion } from '../types/service-question'

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

export async function toggleUpVoteAsset(assetId: number): Promise<AssetVote | null> {
  try {
    const { data } = await axios.post('/api/asset_votes/', {
      asset: assetId,
    })
    return data
  } catch (error) {
    // TODO: error handling
    toast.error('something went wrong')
    return null
  }
}

export async function toggleDownVoteAsset(voteId: number, slug: string): Promise<number | null> {
  try {
    const { status } = await axios.delete(`/api/asset_votes/${voteId}/`, {
      data: { asset: slug },
    })
    return status
  } catch (error) {
    // TODO: error handling
    toast.error('something went wrong')
    return null
  }
}

export async function fetchUpvotedAttributes(slug: string): Promise<VotedAttribute | null> {
  try {
    const { data } = await axios.get(`/api/asset_attributes/${slug}/`)
    return data
  } catch (error) {
    // TODO: error handling
    toast.error('something went wrong')
    return null
  }
}

export async function toggleAddAttribute(assetId: number, name: string, isCon: boolean): Promise<any | null> {
  try {
    const { data } = await axios.post('/api/asset_attributes/', {
      asset: assetId,
      name: name,
      is_con: isCon,
    })
    return data
  } catch (error) {
    // TODO: error handling
    toast.error('something went wrong')
    return null
  }
}

export async function toggleAddQuestion(assetId: number, title: string): Promise<any | null> {
  try {
    const { data } = await axios.post('/api/asset_questions', {
      asset: assetId,
      title: title,
    })
    return data
  } catch (error) {
    // TODO: error handling
    toast.error('something went wrong')
    return null
  }
}

export async function toggleAnswerQuestion(questionId, answer): Promise<ServiceQuestion | null> {
  try {
    const { data } = await axios.patch(`/api/asset_questions/${questionId}`, {
      primary_answer: answer,
    })
    return data
  } catch (error) {
    // TODO: error handling
    toast.error('something went wrong')
    return null
  }
}

export async function fetchQuestions(slug): Promise<any | null> {
  try {
    const { data } = await axios.get(`/api/asset_questions/${slug}`)
    return data
  } catch (error) {
    // TODO: error handling
    toast.error('something went wrong')
    return null
  }
}

export async function fetchVotedQuestions(slug): Promise<any | null> {
  try {
    const { data } = await axios.get(`/api/asset_question_votes/${slug}`)
    return data
  } catch (error) {
    // TODO: error handling
    toast.error('something went wrong')
    return null
  }
}

export async function toggleDownVoteQuestion(upvotedQuestionId): Promise<any | null> {
  try {
    const { status } = await axios.delete(`/api/asset_question_votes/${upvotedQuestionId}`)
    return status
  } catch (error) {
    // TODO: error handling
    toast.error('something went wrong')
    return null
  }
}

export async function toggleUpVoteQuestion(questionId): Promise<any | null> {
  try {
    const { data } = await axios.post(`/api/asset_question_votes/`, {
      question: questionId,
    })
    return data
  } catch (error) {
    // TODO: error handling
    toast.error('something went wrong')
    return null
  }
}
