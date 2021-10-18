export type ServiceReview = {
  user: {
    username: string
    first_name: string
    last_name: string
    avatar: string
    organization?: {
      name?: string
    }
  }
  content: string
  rating: number
  created: string
  video_url?: string
  upvotes_count?: number
}
