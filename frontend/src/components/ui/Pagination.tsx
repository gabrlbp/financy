import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  total: number
  skip: number
  take: number
  onPageChange: (skip: number) => void
}

export function Pagination({ total, skip, take, onPageChange }: PaginationProps) {
  const currentPage = Math.floor(skip / take) + 1
  const totalPages = Math.ceil(total / take)
  const from = skip + 1
  const to = Math.min(skip + take, total)

  if (totalPages <= 1) return null

  const pages: number[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">
        <span className='font-medium'>{from}</span> a <span className='font-medium'>{to}</span> | <span className='font-medium'>{total}</span> resultados
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(skip - take)}
          disabled={currentPage === 1}
          className="rounded-lg border border-gray-300 p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-100 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {pages.map((page, idx) => {
          const prev = pages[idx - 1]
          const showEllipsis = prev !== undefined && page - prev > 1
          return (
            <span key={page} className="flex items-center">
              {showEllipsis && <span className="px-1 text-gray-400">...</span>}
              <button
                onClick={() => onPageChange((page - 1) * take)}
                className={`h-8 w-8 rounded-lg border border-gray-300 text-sm font-medium cursor-pointer ${
                  page === currentPage
                    ? 'bg-brand text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            </span>
          )
        })}
        <button
          onClick={() => onPageChange(skip + take)}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-gray-300 p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-100 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
