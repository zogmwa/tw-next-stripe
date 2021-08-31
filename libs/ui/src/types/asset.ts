import { Tag } from './tag'
import { Plan } from './price-plan'

export type Asset = {
  slug?: string
  name?: string
  logo_url?: string
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
  has_free_trial?: string
  reviews_count?: number
  avg_rating?: string | number
  users_count?: number // not in backend yet
}
