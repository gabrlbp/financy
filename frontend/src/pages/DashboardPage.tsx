import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { RecentTransactions } from '@/components/transactions/RecentTransactions'
import { CategorySummary } from '@/components/categories/CategorySummary'
import { TransactionModal } from '@/components/transactions/TransactionModal'
import { TRANSACTIONS_QUERY } from '@/graphql/queries/transactions'
import { CATEGORIES_QUERY } from '@/graphql/queries/categories'
import type { Transaction, Category, PaginatedResponse } from '@/types'
import Loader2 from 'lucide-react/dist/esm/icons/loader-2'

const now = new Date()
const currentMonth = now.getMonth() + 1
const currentYear = now.getFullYear()

export function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false)

  const { data: allTxData, loading: loadingAll, refetch: refetchAll } = useQuery<{
    transactions: PaginatedResponse<Transaction>
  }>(TRANSACTIONS_QUERY, {
    variables: {
      filter: { month: currentMonth, year: currentYear },
      pagination: { take: 1000 },
    },
  })

  const { data: recentTxData, loading: loadingRecent, refetch: refetchRecent } = useQuery<{
    transactions: PaginatedResponse<Transaction>
  }>(TRANSACTIONS_QUERY, {
    variables: {
      filter: { month: currentMonth, year: currentYear },
      pagination: { take: 5 },
    },
  })

  const { data: categoriesData, loading: loadingCategories, refetch: refetchCategories } = useQuery<{
    categories: PaginatedResponse<Category>
  }>(CATEGORIES_QUERY, {
    variables: { pagination: { take: 100 } },
  })

  const allTransactions = allTxData?.transactions.items || []
  const recentTransactions = recentTxData?.transactions.items || []
  const categories = categoriesData?.categories.items || []

  const income = allTransactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0)
  const expenses = allTransactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0)
  const balance = income - expenses

  const loading = loadingAll || loadingRecent || loadingCategories

  function handleSuccess() {
    refetchAll()
    refetchRecent()
    refetchCategories()
  }

  if (loading && !allTxData) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SummaryCards balance={balance} income={income} expenses={expenses} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2.055fr_1fr]">
        <RecentTransactions
          transactions={recentTransactions}
          onNewTransaction={() => setModalOpen(true)}
        />
        <CategorySummary categories={categories} transactions={allTransactions} />
      </div>

      <TransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
