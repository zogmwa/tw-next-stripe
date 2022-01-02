import axios from 'axios'
import toast from 'react-hot-toast'
import * as Sentry from '@sentry/nextjs'

export async function fetchSolutionDetail(solutionSlug) {
  try {
    const { data } = await axios.get(`/api/solutions/detail/${solutionSlug}`)
    return data
  } catch (error) {
    Sentry.captureException(error)
    // eslint-disable-next-line
    toast.error('Please Try Again. Could not load the data')
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
    // eslint-disable-next-line
    toast.error('Could not get similar software.')
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
    // TODO: error handling
    // eslint-disable-next-line
    toast.error('Could not vote a solution.')
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
    // TODO: error handling
    // eslint-disable-next-line
    toast.error('Could not destroy a solution vote.')
    return null
  }
}

export async function toggleSolutionPurchase(solutionPriceId: number | string): Promise<any | null> {
  try {
    const { data } = await axios.post(`/api/solution_prices/checkout/${solutionPriceId}`, {})
    return data
  } catch (error) {
    Sentry.captureException(error)
    // eslint-disable-next-line
    toast.error('Could not purchase this solution .')
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
    // eslint-disable-next-line
    toast.error('Failed to bookmark the solution.')
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
    // eslint-disable-next-line
    toast.error('Failed to delete the bookmark.')
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
    // eslint-disable-next-line
    toast.error('Failed to adding review solution.')
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
    // eslint-disable-next-line
    toast.error('Failed to changing review solution.')
    return null
  }
}

export async function toggleDeleteReviewSolution(solutionReviewId: number): Promise<any | null> {
  try {
    const { status } = await axios.delete(`/api/solution_review/${solutionReviewId}`)

    return status
  } catch (error) {
    Sentry.captureException(error)
    // eslint-disable-next-line
    toast.error('Failed to canceling review solution.')
    return null
  }
}
