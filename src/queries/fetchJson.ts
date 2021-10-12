import axios, { AxiosRequestConfig } from 'axios'

export async function fetcher(url: string, config?: AxiosRequestConfig): Promise<any> {
  try {
    const response = await axios(url, config)
    const { data } = response
    return data
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message }
    }
    throw error
  }
}
