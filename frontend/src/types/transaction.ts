import type { Category } from './category'

export type TransactionType = 'INCOME' | 'EXPENSE'

export interface Transaction {
  id: string
  description: string
  amount: number
  type: TransactionType
  date: string
  createdAt: string
  updatedAt: string
  category: Category
}

export interface TransactionFilter {
  month: number
  year: number
  description?: string
  type?: TransactionType
  categoryId?: string
}
