export type AttributeVote = {
  id?: number
  asset?: number
  attribute?: number
  is_upvote?: boolean
}[]

export type VotedAttribute = {
  id: number
  name: string
  upvotes_count: number
  is_con: boolean
  my_asset_attribute_vote: number | null
}[]
