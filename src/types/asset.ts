import { Tag } from './tag'
import { Plan } from './price-plan'
import { ServiceQuestion } from './service-question'
import { CustomerOrganization } from './customer_organization'
import { AttributeType } from './attribute'

export type Asset = {
  slug?: string
  name?: string
  logo_url?: string
  logo?: string
  website?: string
  affiliate_link?: string
  description: string
  tags: Tag[]
  short_description?: string
  tweb_url?: string
  promo_video?: string
  price_plans?: Plan[]
  upvotes_count?: number
  id: number
  has_free_trial?: boolean
  reviews_count?: number
  avg_rating?: string | number
  users_count?: number // not in backend yet
  og_image_url?: string
  customer_organizations?: CustomerOrganization[]
  questions?: ServiceQuestion[]
  snapshots?: { asset: number; url: string }[]
  attributes?: AttributeType[]
  used_by_me?: boolean
  my_asset_vote?: number | null
  is_owned?: boolean
}

export type AssetVote = {
  id?: number
  asset?: number
  is_upvote?: boolean
}
