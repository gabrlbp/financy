import { type InputHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: LucideIcon
  error?: string
  infoText?: string
}

export function Input({ label, icon: Icon, error, infoText, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        )}
        <input
          className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed ${Icon ? 'pl-10' : ''} ${error ? 'border-danger' : ''} ${className}`}
          {...props}
        />
      </div>
      {infoText && <p className='text-xs text-gray-500'>{infoText}</p>}
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  )
}
