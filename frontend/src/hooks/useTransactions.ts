import { useState, useCallback } from 'react'
import { useQuery } from '@apollo/client/react'
import { TRANSACTIONS_QUERY } from '@/graphql/queries/transactions'
import type { Transaction, TransactionFilter } from '@/types/transaction'
import type { PaginatedResponse } from '@/types/pagination'

const ITEMS_PER_PAGE = 10

const now = new Date()

export function useTransactions() {
  const [filters, setFilters] = useState<TransactionFilter>({
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  })
  const [skip, setSkip] = useState(0)

  const { data, loading, error, refetch } = useQuery<{
    transactions: PaginatedResponse<Transaction>
  }>(TRANSACTIONS_QUERY, {
    variables: {
      filter: {
        month: filters.month,
        year: filters.year,
        ...(filters.description ? { description: filters.description } : {}),
        ...(filters.type ? { type: filters.type } : {}),
        ...(filters.categoryId ? { categoryId: filters.categoryId } : {}),
      },
      pagination: { skip, take: ITEMS_PER_PAGE },
    },
  })

  const updateFilters = useCallback((newFilters: Partial<TransactionFilter>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
    setSkip(0)
  }, [])

  return {
    items: data?.transactions.items || [],
    total: data?.transactions.total || 0,
    skip: data?.transactions.skip || 0,
    take: data?.transactions.take || ITEMS_PER_PAGE,
    loading,
    error,
    filters,
    setFilters: updateFilters,
    setPage: setSkip,
    refetch,
  }
}
