export type Plan = {
  name: string
  summary?: string
  currency: string
  price: string | number
  per: string
  features?: string[]
  most_popular?: boolean
}
