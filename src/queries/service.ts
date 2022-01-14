import axios from 'axios'
import toast from 'react-hot-toast'
import { Asset, AssetVote } from '@taggedweb/types/asset'
import { AttributeVote, VotedAttribute } from '@taggedweb/types/attribute_vote'
import { ServiceQuestion } from '@taggedweb/types/service-question'
import * as Sentry from '@sentry/nextjs'

export type CreateServiceInput = {
  name: string
  slug: string
  shortDescription: string
  description?: string
  website: string
  logoUrl?: string
  promoVideo?: string
  snapshots?: { url: string }[]
}

export async function createService(createServiceInput: CreateServiceInput): Promise<Asset> {
  try {
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
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line no-console
    console.log('Failed to add a service', error)
    return null
  }
}

export async function fetchService(slug: string): Promise<Asset | null> {
  try {
    const { data } = await axios.get<Asset>(`/api/assets/${slug}`)
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line no-console
    console.log('Failed to get service detail', error)
    return null
  }
}

// TODO: adapt this function for session.
export async function fetchVote(slug: string): Promise<Asset | null> {
  try {
    const { data } = await axios.get<Asset>(`/api/asset_reviews?asset__slug=${slug}`)
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    console.log('Could not fetch asset votes.')
    return null
  }
}

export async function toggleUsedByStatus(slug: string, usedByMeStatus: boolean): Promise<boolean | null> {
  try {
    const { status } = await axios.post<boolean>(`/api/assets/${slug}/used_by_me/?used_by_me=${usedByMeStatus}`)
    if (status === 201) return true
    else if (status === 204) return false
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    console.log('Could not get used by me.')
    return null
  }
}

export async function fetchAttributeVotes(): Promise<AttributeVote | null> {
  try {
    const { data } = await axios.get<AttributeVote>('/api/asset_attribute_votes/')
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    console.log('Could not fetch a attribute votes.')
    return null
  }
}

export async function toggleUpVoteAttribute(assetId: number, attributeId: number): Promise<AttributeVote | null> {
  try {
    const { data } = await axios.post<AttributeVote>('/api/asset_attribute_votes/', {
      asset: assetId,
      attribute: attributeId,
      is_upvote: true,
    })
    return data
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Could not vote a attribute.', {
      id: 'attribute-upvote-toggle-error',
    })
    return null
  }
}

export async function toggleDownVoteAttribute(attributeId: number): Promise<number | null> {
  try {
    const { status } = await axios.delete(`/api/asset_attribute_votes/${attributeId}/`)
    return status
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Could not destroy a attribute vote.', {
      id: 'attribute-downvote-toggle-error',
    })
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
    Sentry.captureException(error)
    toast.error('Could not vote a asset.', {
      id: 'asset-upvote-toggle-error',
    })
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
    Sentry.captureException(error)
    toast.error('Could not destroy a asset vote.', {
      id: 'asset-downvote-toggle-error',
    })
    return null
  }
}

export async function fetchUpvotedAttributes(slug: string): Promise<VotedAttribute | null> {
  try {
    const { data } = await axios.get(`/api/asset_attributes/${slug}/`)
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    console.log('Could not get voted attributes.')
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
    Sentry.captureException(error)
    toast.error('Could not add a attribute.', {
      id: 'attribute-add-error',
    })
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
    Sentry.captureException(error)
    toast.error('Could not add a question.', {
      id: 'toggle-add-question-error',
    })
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
    Sentry.captureException(error)
    toast.error('Could not answer a question.', {
      id: 'answer-submit-error',
    })
    return null
  }
}

export async function fetchQuestions(slug): Promise<any | null> {
  try {
    const { data } = await axios.get(`/api/asset_questions/${slug}`)
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    console.log('Could not fetch questions.')
    return null
  }
}

export async function fetchVotedQuestions(slug): Promise<any | null> {
  try {
    const { data } = await axios.get(`/api/asset_question_votes/${slug}`)
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    console.log('Could not fetch voted questions.')
    return null
  }
}

export async function toggleDownVoteQuestion(upvotedQuestionId): Promise<any | null> {
  try {
    const { status } = await axios.delete(`/api/asset_question_votes/${upvotedQuestionId}`)
    return status
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    console.log('Could not destroy a question vote.')
    return null
  }
}

export async function toggleUpVoteQuestion(questionId): Promise<any | null> {
  try {
    const { data } = await axios.post('/api/asset_question_votes/', {
      question: questionId,
    })
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    console.log('Could not vote a question.')
    return null
  }
}

export async function fetchAssetSimilar(slug): Promise<Asset[] | null> {
  try {
    const { data } = await axios.get(`/api/assets/similar/${slug}`)
    if (data.results) return data.results
    else return null
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    console.log('Could not fetch similar services.')
    return null
  }
}

export async function addAssetReview(sendData): Promise<any | null> {
  try {
    const { data } = await axios.post('/api/asset_reviews/', sendData)
    return data
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Could not add an asset review.', {
      id: 'review-submit-error',
    })
    return null
  }
}

export async function patchAssetField(updateData, serviceSlug) {
  try {
    const { data } = await axios.patch(`/api/assets/${serviceSlug}/`, updateData)
    return data
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Could not update this web service.', {
      id: 'service-update-error',
    })
    return null
  }
}

export async function linkAttributeToAsset(slug, attributeId) {
  try {
    const { data } = await axios.post(`/api/asset_attributes/${slug}`, {
      attribute_id: attributeId,
    })
    return data
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Unexpected error in submitting the highlight.', {
      id: 'attribute-submit-error',
    })
    return null
  }
}

export async function claimOwnershipToAsset(assetId: number, User, Value) {
  try {
    const { data } = await axios.post('/api/claim_asset/', {
      asset: assetId,
      user: User,
      user_comment: JSON.stringify(Value),
    })
    return data
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Request failed. Kindly reach out to us at contact@taggedweb.com.', {
      id: 'ownership-claim-error',
      duration: 5000,
    })
    return null
  }
}

export async function submitUserProblems(Search_query: string, User = null, description: string, email = null) {
  try {
    const { data } = await axios.post('/api/submit_user_problem/', {
      searched_term: Search_query,
      user: User,
      email: email,
      description: description,
    })
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line

    toast.error('Request failed. Kindly reach out to us at contact@taggedweb.com.', {
      duration: 5000,
    })
    return null
  }
}
