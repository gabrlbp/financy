import { useState, type InputHTMLAttributes } from 'react'

interface MoneyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string
  value: number
  onChange: (value: number) => void
  error?: string
  infoText?: string
}

export function MoneyInput({ label, value, onChange, error, infoText, className = '', ...props }: MoneyInputProps) {
  const [displayValue, setDisplayValue] = useState(() => formatCurrency(value))
  const [isFocused, setIsFocused] = useState(false)

  // Format number to Brazilian Real currency
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  // Parse currency string back to number
  function parseCurrency(value: string): number {
    // Remove currency symbol and whitespace, then parse
    const cleanValue = value.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.')
    const num = parseFloat(cleanValue)
    return isNaN(num) || num < 0 ? 0 : num
  }

  function handleFocus() {
    setIsFocused(true)
    // Show raw number on focus for easier editing
    setDisplayValue(value === 0 ? '' : value.toString().replace('.', ','))
  }

  function handleBlur() {
    setIsFocused(false)
    // Format on blur
    const numValue = parseCurrency(displayValue)
    setDisplayValue(formatCurrency(numValue))
    onChange(numValue)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newValue = e.target.value
    
    // Allow only numbers, comma, and one decimal point
    newValue = newValue.replace(/[^\d,]/g, '')
    
    // Prevent negative values
    if (newValue.includes('-')) {
      newValue = newValue.replace(/-/g, '')
    }
    
    setDisplayValue(newValue)
    
    // Update parent with numeric value in real-time
    const numValue = parseCurrency(newValue)
    onChange(numValue)
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed ${error ? 'border-danger' : ''} ${className}`}
          value={isFocused ? displayValue : formatCurrency(value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
      </div>
      {infoText && <p className='text-xs text-gray-500'>{infoText}</p>}
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  )
}