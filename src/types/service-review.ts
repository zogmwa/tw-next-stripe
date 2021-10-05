export type ServiceReview = {
  user: {
    username: string
    avatar: string
    organization: {
      name: string
    }
  }
  content: string
  rating: number
  created: string
  video_url: string
  upvotes_count?: number
}
