export type Service = {
  id: number
  slug: string
  name: string
  logo_url?: string
  // @TODO: Update logo type
  logo?: any
  website: string
  affiliate_link: string
  short_description: string
  description?: string
  promo_video?: string
  tags?: string
  // @TODO: Update attributes types
  attributes?: string
  // @TODO: Update tweb_url
  tweb_url: null
  upvotes_count: number
  og_image_url: string
  // @TODO: Update price plan types
  price_plans: []
  // @TODO: Update questions type
  questions: []
  // @TODO: Update customer organizations type
  customer_organizations: []
  avg_rating: string
  reviews_count: number
  has_free_trial: boolean
  // @TODO: Update snapshots types
  snapshots: string[]
  users_count: number
}