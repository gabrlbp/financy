import { ChevronDown } from 'lucide-react';
import { type SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export function Select({ label, error, options, placeholder, className = '', ...props }: SelectProps) {
  return (
    <div className="space-y-1 relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <select
        className={`appearance-none w-full rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm text-gray-800 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none ${error ? 'border-danger' : ''} ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-3 bottom-5 text-gray-900" />
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  )
}
