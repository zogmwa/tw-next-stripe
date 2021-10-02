import { Asset } from './asset'

export type Profile = {
  id: number
  username: string
  avatar?: string
  organization?: {
    name: string
  }
  submitted_assets: Asset[]
}
