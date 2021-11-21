import axios from 'axios'
import toast from 'react-hot-toast'

export async function fetchSolutionDetail(solutionSlug) {
  try {
    const { data } = await axios.get(`/api/solutions/detail/${solutionSlug}`)
    return data
  } catch (error) {
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
    // TODO: error handling
    // eslint-disable-next-line
    toast.error('Could not destroy a solution vote.')
    return null
  }
}

export async function toggleSolutionPurchase(solutionPriceId: number): Promise<any | null> {
  try {
    const { data } = await axios.post(`/api/solution_prices/checkout/${solutionPriceId}`, {})
    return data
  } catch (error) {
    // eslint-disable-next-line
    toast.error('Could not purchase this solution .')
    return null
  }
}
