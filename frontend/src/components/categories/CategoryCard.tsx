import { SquarePen, Trash } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { getIcon } from '@/lib/constants'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  const Icon = getIcon(category.icon)
  const transactionCount = category.transactions.length

  return (
    <Card className='p-6'>
      <div className="flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${category.color}1A`, color: category.color }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onDelete(category)}
            className="rounded-lg p-2 text-danger border border-gray-300 hover:bg-danger-light cursor-pointer transition-all"
          >
            <Trash className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(category)}
            className="rounded-lg p-2 text-gray-700 border border-gray-300 hover:bg-gray-200 cursor-pointer transition-all"
          >
            <SquarePen className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-sm font-semibold text-gray-800">{category.title}</h3>
        {category.description && (
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">{category.description}</p>
        )}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <Badge label={category.title} color={category.color} />
        <span className="text-xs text-gray-500">
          {transactionCount === 1 ? `${transactionCount} item` : `${transactionCount} itens`}
        </span>
      </div>
    </Card>
  )
}
