import { Solution } from './solution'
import { UserInfo } from './user'

export type solutionContract = {
  id: number
  rating?: number | string
  solution: Solution
  status: string
  started_at: string | null
  created: string
  updated: string
  price_at_booking: number
  provider_notes: string
  metered_booking_info: null | {
    payment_status: null | string
    start_date: null | string
    billing_cycle_anchor: null | string
    collection_method: null | string
    current_period_end: null | string
  }
  booked_by: UserInfo
}
