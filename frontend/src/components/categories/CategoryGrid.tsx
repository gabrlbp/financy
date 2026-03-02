import { CategoryCard } from './CategoryCard'
import type { Category } from '@/types'

interface CategoryGridProps {
  categories: Category[]
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
}

export function CategoryGrid({ categories, onEdit, onDelete }: CategoryGridProps) {
  if (categories.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
        <p className="text-sm text-gray-500">Nenhuma categoria encontrada</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
