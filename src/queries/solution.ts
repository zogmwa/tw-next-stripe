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
