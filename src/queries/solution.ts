import axios from 'axios'
import toast from 'react-hot-toast'

export async function fetchSolutionDetail(solutionId) {
  try {
    const { data } = await axios.get(`/api/solutions/detail/${solutionId}`)
    return data
  } catch (error) {
    // TODO: error handling
    // eslint-disable-next-line
    console.log(error)
    toast.error('Could not get solution detail data.')
    return null
  }
}
