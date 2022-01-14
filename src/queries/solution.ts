import axios from 'axios'
import toast from 'react-hot-toast'
import * as Sentry from '@sentry/nextjs'
import { solutionContract } from '@taggedweb/types/contracts'
export async function fetchSolutionDetail(solutionSlug) {
  try {
    const { data } = await axios.get(`/api/solutions/detail/${solutionSlug}`)
    return data
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Please Try Again. Could not load the data', {
      id: 'solution-fetch-error',
    })
    return null
  }
}

// We aren't looking to use this for now as we are using Solution.assets instead to show related software. But in the future we may add an "Other Related SaaS" section where we can show these products/software.
export async function fetchSimilarProducts(solutionSlug) {
  try {
    const { data } = await axios.get(`/api/solutions/related_assets/${solutionSlug}`)
    return data
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Could not get similar software.', {
      id: 'similar-solutions-fetch-error',
    })
    return null
  }
}

export async function toggleUpVoteSolution(solutionId: number) {
  try {
    const { data } = await axios.post('/api/solution_votes/', {
      solution: solutionId,
    })
    return data
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Could not vote a solution.', {
      id: 'solution-upvote-toggle-error',
    })
    return null
  }
}

export async function toggleDownVoteSolution(voteId: number, slug: string): Promise<number | null> {
  try {
    const { status } = await axios.delete(`/api/solution_votes/${voteId}/`, {
      data: { solution: slug },
    })
    return status
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Could not destroy a solution vote.', {
      id: 'solution-downvote-toggle-error',
    })
    return null
  }
}

export async function checkoutSolutionPurchase(
  solutionPriceId: number | string,
  referralUserId: number | string,
): Promise<any | null> {
  try {
    const { data } = await axios.post(`/api/solution_prices/checkout/${solutionPriceId}?r=${referralUserId}`, {})
    return data
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Could not purchase this solution.', {
      id: 'solution-checkout-error',
    })
    return null
  }
}

export async function toggleBookmarkSolution(solutionId: number): Promise<any | null> {
  try {
    const { data } = await axios.post('/api/solution_bookmarks/', {
      solution: solutionId,
    })
    return data
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Failed to bookmark the solution.', {
      id: 'solution-bookmark-toggle-error',
    })
    return null
  }
}

export async function toggleCancelBookmarkSolution(bookmarkId: number, slug: string): Promise<number | null> {
  try {
    const { status } = await axios.delete(`/api/solution_bookmarks/${bookmarkId}/`, {
      data: { solution: slug },
    })
    return status
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Failed to delete the bookmark.', {
      id: 'solution-bookmark-delete-error',
    })
    return null
  }
}

export async function toggleAddReviewSolution(solutionId: number, type: string): Promise<any | null> {
  try {
    const { data } = await axios.post('/api/solution_review/', {
      solution: solutionId,
      type: type,
    })

    return data
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Failed to adding review solution.', {
      id: 'solution-review-submit-error',
    })
    return null
  }
}

export async function toggleUpdateReviewSolution(
  solutionId: number,
  type: string,
  solutionReviewId: number,
): Promise<any | null> {
  try {
    const { data } = await axios.patch(`/api/solution_review/${solutionReviewId}`, {
      solution: solutionId,
      type: type,
    })

    return data
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Failed to changing review solution.', {
      id: 'solution-review-update-error',
    })
    return null
  }
}

export async function toggleDeleteReviewSolution(solutionReviewId: number): Promise<any | null> {
  try {
    const { status } = await axios.delete(`/api/solution_review/${solutionReviewId}`)

    return status
  } catch (error) {
    Sentry.captureException(error)
    toast.error('Failed to canceling review solution.', {
      id: 'solution-review-delete-error',
    })
    return null
  }
}

export async function toggleUpdateSolutionBookingRating(
  solutionBookingId: number,
  rating: number | '',
): Promise<solutionContract | null> {
  try {
    const { data } = await axios.patch(`/api/solution_bookings/${solutionBookingId}`, { rating: rating })

    return data
  } catch (error) {
    Sentry.captureException(error)
    toast.error(
      `Unexpected error. Please reach out to us at ${process.env.TAGGEDWEB_SUPPORT_EMAIL} if this persists.`,
      {
        id: 'solution-booking-rating-update-error',
      },
    )
    return null
  }
}
