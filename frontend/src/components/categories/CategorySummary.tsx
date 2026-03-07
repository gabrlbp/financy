import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/format'
import type { Category } from '@/types/category'
import type { Transaction } from '@/types/transaction'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right'

interface CategorySummaryProps {
  categories: Category[]
  transactions: Transaction[]
}

export function CategorySummary({ categories, transactions }: CategorySummaryProps) {
  const categoryStats = useMemo(() => {
    const txByCategory = new Map<string, Transaction[]>()
    transactions.forEach(t => {
      const catId = t.category?.id
      if (!catId) return
      if (!txByCategory.has(catId)) txByCategory.set(catId, [])
      txByCategory.get(catId)!.push(t)
    })

    return categories.map(cat => {
      const catTransactions = txByCategory.get(cat.id) || []
      const total = catTransactions.reduce((sum, t) =>
        t.type === 'EXPENSE' ? sum - t.amount : sum + t.amount, 0)
      return { ...cat, count: catTransactions.length, total }
    })
  }, [categories, transactions])

  return (
    <Card className='max-h-fit'>
      <div className="flex items-center justify-between border-b border-gray-200 py-5 px-6">
        <h2 className="text-sm font-medium text-gray-500 uppercase">Categorias</h2>
        <Link to="/categorias" className="flex items-center text-sm font-medium text-brand hover:text-brand-dark">
          Gerenciar <ChevronRight size={20} />
        </Link>
      </div>

      {categoryStats.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">Nenhuma categoria encontrada</p>
      ) : (
        <div className='px-5 py-6'>
          {categoryStats.slice(0, 5).map((cat) => {
            return (
              <div key={cat.id} className="flex items-center justify-between py-3">
                <Badge label={cat.title} color={cat.color} />
                <div className='flex gap-4'>
                  <p className="text-sm text-left text-gray-500">{cat.count === 1 ? `${cat.count} item` : `${cat.count} itens`}</p>
                  <span className="text-sm font-semibold text-gray-700">
                    {formatCurrency(Math.abs(cat.total))}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}
