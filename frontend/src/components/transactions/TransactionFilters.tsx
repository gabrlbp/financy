import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client/react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { CATEGORIES_QUERY } from '@/graphql/queries/categories'
import type { TransactionFilter, Category, PaginatedResponse } from '@/types'

interface TransactionFiltersProps {
  filters: TransactionFilter
  onFilterChange: (filters: Partial<TransactionFilter>) => void
}

const MONTHS = [
  { value: '1', label: 'Janeiro' },
  { value: '2', label: 'Fevereiro' },
  { value: '3', label: 'Março' },
  { value: '4', label: 'Abril' },
  { value: '5', label: 'Maio' },
  { value: '6', label: 'Junho' },
  { value: '7', label: 'Julho' },
  { value: '8', label: 'Agosto' },
  { value: '9', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
]

export function TransactionFilters({ filters, onFilterChange }: TransactionFiltersProps) {
  const [search, setSearch] = useState(filters.description || '')

  const { data: categoriesData } = useQuery<{ categories: PaginatedResponse<Category> }>(
    CATEGORIES_QUERY,
    { variables: { pagination: { take: 100 } } },
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ description: search || undefined })
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const categoryOptions = (categoriesData?.categories.items || []).map((c) => ({
    value: c.id,
    label: c.title,
  }))

  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: 5 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i),
  }))

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <Input
        icon={Search}
        label='Buscar'
        placeholder="Buscar por transação"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select
      label='Tipo'
        placeholder="Todos"
        options={[
          { value: 'INCOME', label: 'Receita' },
          { value: 'EXPENSE', label: 'Despesa' },
        ]}
        value={filters.type || ''}
        onChange={(e) => onFilterChange({ type: (e.target.value as TransactionFilter['type']) || undefined })}
      />
      <Select
      label='Categorias'
        placeholder="Todas"
        options={categoryOptions}
        value={filters.categoryId || ''}
        onChange={(e) => onFilterChange({ categoryId: e.target.value || undefined })}
      />
      <Select
        options={MONTHS}
        value={String(filters.month)}
        onChange={(e) => onFilterChange({ month: parseInt(e.target.value) })}
      />
      <Select
        options={yearOptions}
        value={String(filters.year)}
        onChange={(e) => onFilterChange({ year: parseInt(e.target.value) })}
      />
    </div>
  )
}
