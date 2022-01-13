import { Solution } from './solution'

export type solutionContract = {
  id: number
  rating?: number | string
  solution: Solution
  status: string
  started_at: string | null
  updated: string
  price_at_booking: number
  provider_notes: string
}
