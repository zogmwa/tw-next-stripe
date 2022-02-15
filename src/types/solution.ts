import { Asset } from './asset'
import { CustomerOrganization } from './customer_organization'
import { SolutionQuestion } from './solution-question'
import { Tag } from './tag'
import { UserInfo } from './user'
export type Solution = {
  assets?: Asset[]
  avg_rating?: string | number
  booked_count?: string | number
  bookings_pending_fulfillment_count?: number
  capacity?: string | number
  capacity_used?: string | number
  consultation_scheduling_link?: string | null
  description?: string
  cover_image?: string
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
  stripe_primary_price_stripe_id?: string
  stripe_primary_price_unit_amount?: number
  point_of_contact?: UserInfo
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

export enum SolutionTypes {
  I = 'INTEGRATIONS',
  C = 'CONSULTATION',
  U = 'USAGE SUPPORT',
  O = 'OTHER',
}

export type SolutionSidebarType = {
  id: number
  is_metered: null | boolean
  slug: string
  stripe_primary_price: {
    stripe_price_id: string
    price: string | number
  }
  price: number
  features: { id: string; name: string; tooltipContent: string }[]
  purchaseDisableOption: boolean
  type: string
  has_free_consultation?: boolean
  consultation_scheduling_link?: string | null
}
