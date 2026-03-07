import { Link } from 'react-router-dom'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right'
import CircleArrowDown from 'lucide-react/dist/esm/icons/circle-arrow-down'
import CircleArrowUp from 'lucide-react/dist/esm/icons/circle-arrow-up'
import Plus from 'lucide-react/dist/esm/icons/plus'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatDate } from '@/lib/format'
import { getIcon } from '@/lib/constants'
import type { Transaction } from '@/types/transaction'

interface RecentTransactionsProps {
  transactions: Transaction[]
  onNewTransaction: () => void
}

export function RecentTransactions({ transactions, onNewTransaction }: RecentTransactionsProps) {
  return (
    <Card>
      <div className="flex items-center justify-between border-b border-gray-200 py-5 px-6">
        <h2 className="text-xs font-medium text-gray-500 uppercase">Transações recentes</h2>
        <div className="flex items-center gap-3">
          <Link to="/transacoes" className="flex items-center text-sm font-medium text-brand hover:text-brand-dark">
            Ver todas <ChevronRight size={20} />
          </Link>
        </div>
      </div>

      {transactions.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">Nenhuma transação encontrada</p>
      ) : (
        <>
          {transactions.map((t) => {
            const Icon = getIcon(t.category.icon)
            return (
              <div key={t.id} className="flex items-center justify-between py-5 px-6 border-b border-b-gray-200">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: t.category ? `${t.category.color}1A` : '#E5E7EB',
                      color: t.category?.color || '#6B7280',
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{t.description}</p>
                    <p className="text-xs text-gray-500">{formatDate(t.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                  {t.category && <Badge label={t.category.title} color={t.category.color} />}
                  <span className='flex items-center gap-2 text-sm font-semibold text-gray-800'>
                    {t.type === 'INCOME' ? '+' : '-'} {formatCurrency(t.amount)}
                    {t.type === 'INCOME' ? <CircleArrowUp size={16} className='text-brand' /> : <CircleArrowDown size={16} className='text-danger' />}
                  </span>
                </div>
              </div>
            )
          }).slice(0, 5)}
        </>
      )}
      <Button className='text-sm py-5 px-6' icon={Plus} onClick={onNewTransaction} fullWidth variant='invisible'>
        Nova transação
      </Button>
    </Card>
  )
}
