import { Asset } from './asset'
import { CustomerOrganization } from './customer_organization'

export type Profile = {
  id: number
  username: string
  first_name: string
  last_name: string
  avatar?: string
  organization?: CustomerOrganization
  submitted_assets: Asset[]
  pending_asset_ids: number[]
  used_assets: number[]
  social_accounts: string[]
  bookmarked_solutions: any[]
  booked_solutions: {
    solution: {
      assets: any[]
      avg_rating: string | number
      title: string
      organization: any
      upvotes_count: number
      slug: string
      pay_now_price_unit_amount: number
    }
    status: string
    updated: string
  }[]
}
