import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { CATEGORIES_QUERY } from '@/graphql/queries/categories'
import type { Category } from '@/types/category'
import type { PaginatedResponse } from '@/types/pagination'

const ITEMS_PER_PAGE = 8

export function useCategories() {
  const [skip, setSkip] = useState(0)

  const { data, loading, error, refetch } = useQuery<{
    categories: PaginatedResponse<Category>
  }>(CATEGORIES_QUERY, {
    variables: {
      pagination: { skip, take: ITEMS_PER_PAGE },
    },
  })

  const items = data?.categories.items || []
  const total = data?.categories.total || 0

  return {
    items,
    total,
    skip: data?.categories.skip || 0,
    take: data?.categories.take || ITEMS_PER_PAGE,
    loading,
    error,
    setPage: setSkip,
    refetch,
  }
}
