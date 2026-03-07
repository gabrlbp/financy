import ArrowDownCircle from 'lucide-react/dist/esm/icons/arrow-down-circle'
import ArrowUpCircle from 'lucide-react/dist/esm/icons/arrow-up-circle'
import SquarePen from 'lucide-react/dist/esm/icons/square-pen'
import Trash from 'lucide-react/dist/esm/icons/trash'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatDate } from '@/lib/format'
import { getIcon } from '@/lib/constants'
import type { Transaction } from '@/types/transaction'

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
    <div className="overflow-hidden rounded-xl rounded-b-none border border-gray-200 bg-white">
      <table className="w-full text-center">
        <thead>
          <tr className="uppercase text-xs border-b border-gray-200 text-gray-500">
            <th className="px-6 py-5 text-left font-medium">
              Descrição
            </th>
            <th className="px-6 py-5 text-center font-medium">
              Data
            </th>
            <th className="px-6 py-5 text-center font-medium">
              Categoria
            </th>
            <th className="px-6 py-5 text-center font-medium">
              Tipo
            </th>
            <th className="px-6 py-5 text-right font-medium">
              Valor
            </th>
            <th className="px-6 py-5 text-right font-medium">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transactions.map((t) => {
            // Destructure to avoid repeated property access
            const { id, description, amount, type, date, category } = t
            const Icon = getIcon(category.icon)

            return (
              <tr key={id} className="hover:bg-gray-100">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${category.color}1A`,
                        color: category.color,
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-gray-800">{description}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{formatDate(date)}</td>
                <td className="px-6 py-4">
                  {category ? <Badge label={category.title} color={category.color} /> : null}
                </td>
                <td className="px-6 py-4">
                  <span className='inline-flex items-center gap-2 rounded-full px-2 py-0.5 text-sm font-medium'>
                    {
                      type === 'INCOME'
                        ? <><ArrowUpCircle className='text-brand' size={16} /> <span className='text-brand-dark'>Entrada</span></>
                        : <><ArrowDownCircle className='text-danger' size={16} /> <span className='text-danger-dark'>Saída</span></>}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className='text-sm font-semibold text-gray-800'>
                    {type === 'INCOME' ? '+' : '-'} {formatCurrency(amount)}
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
