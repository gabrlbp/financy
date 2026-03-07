import { useState, useEffect, type InputHTMLAttributes } from 'react'

interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string
  value: string // ISO date string
  onChange: (value: string) => void
  error?: string
  infoText?: string
}

export function DateInput({ label, value, onChange, error, infoText, className = '', ...props }: DateInputProps) {
  const [displayValue, setDisplayValue] = useState('')

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
    
    // Remove any non-digit characters except /
    const cleanString = dateString.replace(/[^\d/]/g, '')
    
    // Try to parse dd/mm/yyyy format
    const parts = cleanString.split('/')
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10)
      const month = parseInt(parts[1], 10) - 1 // Month is 0-indexed
      const year = parseInt(parts[2], 10)
      
      // Validate date parts
      if (day > 0 && day <= 31 && month >= 0 && month <= 11 && year >= 1000) {
        const date = new Date(year, month, day)
        if (!isNaN(date.getTime()) && date.getDate() === day) {
          return date.toISOString()
        }
      }
    }
    
    return '' // Return empty if parsing fails
  }

  // Update display value when prop value changes
  useEffect(() => {
    setDisplayValue(formatDate(value))
  }, [value])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newValue = e.target.value
    
    // Remove any non-digit characters
    newValue = newValue.replace(/\D/g, '')
    
    // Auto-format as dd/mm/yyyy while typing
    if (newValue.length >= 2) {
      newValue = newValue.slice(0, 2) + '/' + newValue.slice(2)
    }
    if (newValue.length >= 5) {
      newValue = newValue.slice(0, 5) + '/' + newValue.slice(5, 9)
    }
    
    // Limit to dd/mm/yyyy format (10 characters)
    newValue = newValue.slice(0, 10)
    
    setDisplayValue(newValue)
    
    // Try to parse and update parent
    const isoDate = parseDate(newValue)
    if (isoDate && isoDate !== value) {
      onChange(isoDate)
    }
  }

  function handleBlur() {
    // Format properly on blur
    const isoDate = parseDate(displayValue)
    if (isoDate) {
      setDisplayValue(formatDate(isoDate))
      if (isoDate !== value) {
        onChange(isoDate)
      }
    } else {
      // If invalid, reset to current value or empty
      setDisplayValue(formatDate(value))
    }
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed ${error ? 'border-danger' : ''} ${className}`}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="dd/mm/aaaa"
          maxLength={10}
          {...props}
        />
      </div>
      {infoText && <p className='text-xs text-gray-500'>{infoText}</p>}
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  )
}