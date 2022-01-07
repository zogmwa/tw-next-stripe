export type solutionContract = {
  solution: {
    id: number
    assets: any[]
    type: string
    description: string
    avg_rating: number
    my_solution_review: string
    my_solution_review_id: number
    title: string
    organization: any
    upvotes_count: number
    slug: string
    pay_now_price_unit_amount: number
    point_of_contact: any
    questions: any[]
    scope_of_work: string
    primary_tag: any
    eta_days: string | number
    follow_up_hourly_rate: string | number
    capacity: string | number
    has_free_consultation: boolean
    is_published: boolean
    booked_count: string | number
    is_searchable: boolean
    consultation_scheduling_link: string | null
    capacity_used: string | number
  }
  status: string
  started_at: string | null
  updated: string
  price_at_booking: number
  provider_notes: string
}
