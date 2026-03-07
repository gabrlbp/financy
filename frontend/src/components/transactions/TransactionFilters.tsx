import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client/react'
import Search from 'lucide-react/dist/esm/icons/search'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { CATEGORIES_QUERY } from '@/graphql/queries/categories'
import type { TransactionFilter } from '@/types/transaction'
import type { Category } from '@/types/category'
import type { PaginatedResponse } from '@/types/pagination'

interface TransactionFiltersProps {
  filters: TransactionFilter
  onFilterChange: (filters: Partial<TransactionFilter>) => void
}

const MONTHS = new Map([
  ['1', 'Janeiro'],
  ['2', 'Fevereiro'],
  ['3', 'Março'],
  ['4', 'Abril'],
  ['5', 'Maio'],
  ['6', 'Junho'],
  ['7', 'Julho'],
  ['8', 'Agosto'],
  ['9', 'Setembro'],
  ['10', 'Outubro'],
  ['11', 'Novembro'],
  ['12', 'Dezembro'],
])

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

  const periodOptions: { value: string; label: string }[] = []
  for (let year = currentYear; year >= currentYear; year--) {
    for (let month = 12; month >= 1; month--) {
      periodOptions.push({
        value: `${month}/${year}`,
        label: `${MONTHS.get(String(month))} / ${year}`,
      })
    }
  }

  // Current selected period value
  const currentPeriod = filters.month && filters.year
    ? `${filters.month}/${filters.year}`
    : `${new Date().getMonth() + 1}/${currentYear}`

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        label="Período"
        placeholder="Selecione o período"
        options={periodOptions}
        value={currentPeriod}
        onChange={(e) => {
          const [month, year] = e.target.value.split('/')
          onFilterChange({
            month: parseInt(month),
            year: parseInt(year)
          })
        }}
      />
    </div>
  )
}
