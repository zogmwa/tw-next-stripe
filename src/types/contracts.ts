export type solutionContract = {
  solution: {
    id: number
    assets: any[]
    avg_rating: number
    my_solution_review: string
    my_solution_review_id: number
    title: string
    organization: any
    upvotes_count: number
    slug: string
    pay_now_price_unit_amount: number
    point_of_contact: any
  }
  status: string
  started_at: string | null
  updated: string
  price_at_booking: number
  provider_notes: string
}
