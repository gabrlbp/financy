export interface PaginatedResponse<T> {
  items: T[]
  total: number
  skip: number
  take: number
}

export interface PaginationInput {
  skip?: number
  take?: number
}
