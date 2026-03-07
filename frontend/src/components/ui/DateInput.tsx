import { useState, type InputHTMLAttributes } from 'react'

interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string
  value: string // ISO date string
  onChange: (value: string) => void
  error?: string
  infoText?: string
}

export function DateInput({ label, value, onChange, error, infoText, className = '', ...props }: DateInputProps) {
  const [displayValue, setDisplayValue] = useState(() => formatDate(value))
  const [isFocused, setIsFocused] = useState(false)

  // Format ISO date to dd/mm/yyyy
  function formatDate(isoDate: string): string {
    if (!isoDate) return ''
    try {
      const date = new Date(isoDate)
      if (isNaN(date.getTime())) return ''
      
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(date)
    } catch {
      return ''
    }
  }

  // Parse dd/mm/yyyy back to ISO date string
  function parseDate(dateString: string): string {
    if (!dateString) return ''
    
    // Try to parse dd/mm/yyyy format
    const parts = dateString.split('/')
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10)
      const month = parseInt(parts[1], 10) - 1 // Month is 0-indexed
      const year = parseInt(parts[2], 10)
      
      const date = new Date(year, month, day)
      if (!isNaN(date.getTime())) {
        return date.toISOString()
      }
    }
    
    return value // Return original if parsing fails
  }

  function handleFocus() {
    setIsFocused(true)
    // Show ISO date format on focus for easier editing
    if (value) {
      const date = new Date(value)
      if (!isNaN(date.getTime())) {
        setDisplayValue(date.toISOString().split('T')[0]) // yyyy-mm-dd for native date input
      }
    }
  }

  function handleBlur() {
    setIsFocused(false)
    // Format on blur
    const isoDate = parseDate(displayValue)
    setDisplayValue(formatDate(isoDate))
    if (isoDate !== value) {
      onChange(isoDate)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setDisplayValue(newValue)
    
    // If it's an ISO date (from native date picker), convert immediately
    if (newValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const date = new Date(newValue)
      if (!isNaN(date.getTime())) {
        onChange(date.toISOString())
      }
    }
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <input
          type={isFocused ? 'date' : 'text'}
          className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed ${error ? 'border-danger' : ''} ${className}`}
          value={isFocused ? (value ? new Date(value).toISOString().split('T')[0] : '') : displayValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="dd/mm/aaaa"
          {...props}
        />
      </div>
      {infoText && <p className='text-xs text-gray-500'>{infoText}</p>}
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  )
}