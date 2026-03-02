export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export type TransactionType = 'INCOME' | 'EXPENSE'

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

export interface AuthPayload {
  token: string
  user: User
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  skip: number
  take: number
}

export interface TransactionFilter {
  month: number
  year: number
  description?: string
  type?: TransactionType
  categoryId?: string
}

export interface PaginationInput {
  skip?: number
  take?: number
}
