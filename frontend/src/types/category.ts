import type { Transaction } from "./transaction"

export interface Category {
  id: string
  title: string
  description: string | null
  icon: string
  color: string
  createdAt: string
  updatedAt: string
  transactions: Transaction[]
}
