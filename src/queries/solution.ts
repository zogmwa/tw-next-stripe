import axios from 'axios'
import toast from 'react-hot-toast'

export async function fetchSolutionDetail(solutionId) {
  try {
    const { data } = await axios.get(`/api/solutions/detail/${solutionId}`)
    return data
  } catch (error) {
    // eslint-disable-next-line
    toast.error('Could not get solution detail data.')
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
    toast.error('Could not get similar SaaS products.')
    return null
  }
}
