import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/format'
import type { Category, Transaction } from '@/types'
import { ChevronRight } from 'lucide-react'

interface CategorySummaryProps {
  categories: Category[]
  transactions: Transaction[]
}

export function CategorySummary({ categories, transactions }: CategorySummaryProps) {
  const categoryStats = categories.map((cat) => {
    const catTransactions = transactions.filter((t) => t.category?.id === cat.id)
    const total = catTransactions.reduce((sum, t) => {
      return t.type === 'EXPENSE' ? sum - t.amount : sum + t.amount
    }, 0)
    return { ...cat, count: catTransactions.length, total }
  })

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
          {categoryStats.map((cat) => {
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
          }).slice(0, 5)}
        </div>
      )}
    </Card>
  )
}
