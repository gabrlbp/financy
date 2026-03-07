import type { TransactionType } from '@/types'
import CircleArrowDown from 'lucide-react/dist/esm/icons/circle-arrow-down'
import CircleArrowUp from 'lucide-react/dist/esm/icons/circle-arrow-up'

interface ToggleProps {
  value: TransactionType
  onChange: (value: TransactionType) => void
}

export function Toggle({ value, onChange }: ToggleProps) {
  return (
    <div className="flex gap-1 p-2 rounded-lg border border-gray-300 overflow-hidden">
      <button
        type="button"
        onClick={() => onChange('EXPENSE')}
        className={`flex-1 py-3.5 transition-colors cursor-pointer ${
          value === 'EXPENSE'
            ? 'rounded-lg border-2 border-danger text-gray-800 font-medium bg-gray-100'
            : 'bg-white text-gray-600 hover:bg-gray-100 font-normal'
        }`}
      >
        <div className='flex justify-center items-center gap-3'>
          <CircleArrowDown size={16} className={`${value === 'EXPENSE' ? 'text-danger' : 'text-gray-500'}`} />
          Despesa
        </div>
      </button>
      <button
        type="button"
        onClick={() => onChange('INCOME')}
        className={`flex-1 py-3.5 transition-colors cursor-pointer ${
          value === 'INCOME'
            ? 'rounded-lg border-2 border-brand text-gray-800 font-medium bg-gray-100'
            : 'bg-white text-gray-600 hover:bg-gray-100 font-normal'
        }`}
      >
        <div className='flex justify-center items-center gap-3'>
          <CircleArrowUp size={16} className={`${value === 'INCOME' ? 'text-brand' : 'text-gray-500'}`} />
          Receita
        </div>
      </button>
    </div>
  )
}
