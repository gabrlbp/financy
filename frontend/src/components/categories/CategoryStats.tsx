import Star from 'lucide-react/dist/esm/icons/star'
import ArrowUpDown from 'lucide-react/dist/esm/icons/arrow-up-down'
import Tag from 'lucide-react/dist/esm/icons/tag'
import { Card } from '@/components/ui/Card'
import { getIcon } from '@/lib/constants'
import type { Category } from '@/types/category'

interface CategoryStatsProps {
  totalCategories: number
  totalTransactions: number
  mostUsed: Category | null
}

export function CategoryStats({ totalCategories, totalTransactions, mostUsed }: CategoryStatsProps) {
  const MostUsedIcon = mostUsed ? getIcon(mostUsed.icon) : Star
  const isHexColor = (iconColor: string | null) => iconColor?.startsWith('#')

  const stats = [
    {
      title: 'Total de categorias',
      value: String(totalCategories),
      icon: Tag,
      iconColor: 'text-gray-700',
    },
    {
      title: 'Total de transações',
      value: String(totalTransactions),
      icon: ArrowUpDown,
      iconColor: 'text-purple-base',
    },
    {
      title: 'Categoria mais utilizada',
      value: mostUsed ? mostUsed.title : '-',
      icon: MostUsedIcon,
      iconColor: mostUsed ? mostUsed.color : '#000',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {stats.map((stat) => {
        return (
          <Card key={stat.title} className='p-6'>
            <div className="flex items-start gap-4">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg`}>
                <stat.icon
                  className={`h-6 w-6 ${!isHexColor(stat.iconColor) ? stat.iconColor : ''}`}
                  style={isHexColor(stat.iconColor) ? { color: stat.iconColor } : undefined}
                />
              </div>
              <div>
                <p className="text-3xl mb-2 font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm font-medium text-gray-500 uppercase">{stat.title}</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
