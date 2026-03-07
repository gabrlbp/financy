import { useMemo } from 'react'
import type { Category } from '@/types/category'

export function useCategoryAnalytics(categories: Category[]) {
  const totalTransactions = useMemo(
    () => categories.reduce((sum, c) => sum + (c.transactions?.length || 0), 0),
    [categories]
  )

  const mostUsed = useMemo(() => {
    if (categories.length === 0) return null
    return [...categories].sort(
      (a, b) => (b.transactions?.length || 0) - (a.transactions?.length || 0)
    )[0]
  }, [categories])

  return {
    totalTransactions,
    mostUsed,
  }
}
