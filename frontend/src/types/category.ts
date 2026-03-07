export interface Category {
  id: string
  title: string
  description: string | null
  icon: string
  color: string
  createdAt: string
  updatedAt: string
  transactions: Array<{
    id: string
    description: string
    amount: number
    type: 'INCOME' | 'EXPENSE'
    date: string
    createdAt: string
    updatedAt: string
  }>
}
