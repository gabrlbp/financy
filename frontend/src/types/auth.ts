import type { User } from './user'

export interface AuthPayload {
  token: string
  user: User
}
