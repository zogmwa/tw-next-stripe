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
}
