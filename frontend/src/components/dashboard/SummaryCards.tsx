import { Wallet, CircleArrowUp, CircleArrowDown } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { formatCurrency, toUpperCase } from '@/lib/format'

interface SummaryCardsProps {
  balance: number
  income: number
  expenses: number
}

export function SummaryCards({ balance, income, expenses }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Saldo total',
      value: balance,
      icon: Wallet,
      iconColor: 'text-purple-base',
    },
    {
      title: 'Receitas do mês',
      value: income,
      icon: CircleArrowUp,
      iconColor: 'text-brand',
    },
    {
      title: 'Despesas do mês',
      value: expenses,
      icon: CircleArrowDown,
      iconColor: 'text-danger',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title} className='py-5 px-6'>
          <div className="flex flex-col items-start gap-4">
            <div className='flex items-center justify-center gap-3'>
              <card.icon className={`h-6 w-6 ${card.iconColor}`} />
              <p className="text-xs font-medium text-gray-500">{toUpperCase(card.title)}</p>
            </div>
            <div>
              <p className="text-[28px] font-bold text-gray-800">{formatCurrency(card.value)}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
