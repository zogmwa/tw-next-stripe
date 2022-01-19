import { Asset } from './asset'
import { CustomerOrganization } from './customer_organization'
import { SolutionQuestion } from './solution-question'
import { Tag } from './tag'
export type Solution = {
  assets?: Asset[]
  avg_rating?: string | number
  booked_count?: string | number
  bookings_pending_fulfillment_count?: number
  capacity?: string | number
  capacity_used?: string | number
  consultation_scheduling_link?: string | null
  description?: string
  eta_days?: string | number
  follow_up_hourly_rate?: string | number
  has_free_consultation?: boolean
  id: number
  is_published?: boolean
  is_searchable?: boolean
  my_solution_bookmark?: number | null
  my_solution_review?: string
  my_solution_review_id?: number
  my_solution_vote?: number | null
  organization?: CustomerOrganization
  pay_now_price_stripe_id?: string
  pay_now_price_unit_amount?: number
  point_of_contact?: Point_of_contact
  primary_tag?: Tag
  questions?: SolutionQuestion[]
  scope_of_work?: string
  slug: string
  tags?: Tag[]
  title: string
  type: string
  upvotes_count?: number
  is_metered: null | boolean
  team_size: null | number
  estimated_hours: null | number
  blended_hourly_rate: null | number
  billing_period: null | string
}

export type Point_of_contact = {
  id: number
  username: string
  first_name?: string
  last_name?: string
  email?: string
  avatar?: string
}

export enum SolutionTypes {
  I = 'INTEGRATIONS',
  C = 'CONSULTATION',
  U = 'USAGE SUPPORT',
  O = 'OTHER',
}

export type SolutionSidebarType = {
  is_metered: null | boolean
  slug: string
  pay_now_price: {
    stripe_price_id: string
    price: string | number
  }
  price: number
  features: { id: string; name: string; tooltipContent: string }[]
  purchaseDisableOption: boolean
  type: string
}
