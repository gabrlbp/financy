import { ArrowDownCircle, ArrowUpCircle, SquarePen, Trash } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatDate } from '@/lib/format'
import { getIcon } from '@/lib/constants'
import type { Transaction } from '@/types'

interface TransactionTableProps {
  transactions: Transaction[]
  onEdit: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
}

export function TransactionTable({ transactions, onEdit, onDelete }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
        <p className="text-sm text-gray-500">Nenhuma transação encontrada</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-center">
        <thead>
          <tr className="border-b border-gray-200 bg-white">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Descrição
            </th>
            <th className="px-6 py-3 text-xs font-medium uppercase text-gray-500">
              Data
            </th>
            <th className="px-6 py-3 text-xs font-medium uppercase text-gray-500">
              Categoria
            </th>
            <th className="px-6 py-3 text-xs font-medium uppercase text-gray-500">
              Tipo
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
              Valor
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((t) => {
            const Icon = t.category ? getIcon(t.category.icon) : getIcon('wbriefcaset')
            return (
              <tr key={t.id} className="hover:bg-gray-100">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: t.category ? `${t.category.color}1A` : '#E5E7EB',
                        color: t.category?.color || '#6B7280',
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{t.description}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{formatDate(t.date)}</td>
                <td className="px-6 py-4">
                  {t.category && <Badge label={t.category.title} color={t.category.color} />}
                </td>
                <td className="px-6 py-4">
                  <span className='inline-flex items-center gap-2 rounded-full px-2 py-0.5 text-sm font-medium'>
                    {
                      t.type === 'INCOME'
                        ? <><ArrowUpCircle className='text-brand' size={16} /> <span className='text-brand-dark'>Entrada</span></>
                        : <><ArrowDownCircle className='text-danger' size={16} /> <span className='text-danger-dark'>Saída</span></>}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className='text-sm font-semibold'>
                    {t.type === 'INCOME' ? '+' : '-'} {formatCurrency(t.amount)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onDelete(t)}
                      className="rounded-lg p-2 text-danger border border-gray-300 hover:bg-danger-light cursor-pointer transition-all"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(t)}
                      className="rounded-lg p-2 text-gray-700 border border-gray-300 hover:bg-gray-200 cursor-pointer transition-all"
                    >
                      <SquarePen className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
