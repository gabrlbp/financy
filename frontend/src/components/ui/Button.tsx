import { type ButtonHTMLAttributes } from 'react'
import Loader2 from 'lucide-react/dist/esm/icons/loader-2'
import type { LucideIcon } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'invisible'
  icon?: LucideIcon
  iconColor?: string
  loading?: boolean
  fullWidth?: boolean
}

const variants = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-100',
  danger: 'bg-danger text-white hover:bg-red-600',
  invisible: 'text-brand hover:text-brand-dark',
}

export function Button({
  variant = 'primary',
  icon: Icon,
  iconColor,
  loading,
  fullWidth,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 font-medium transition-colors disabled:opacity-100 disabled:cursor-not-allowed cursor-pointer ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : Icon ? (
        <Icon className="h-4 w-4" style={{ color: iconColor ? iconColor : undefined }} />
      ) : null}
      {children}
    </button>
  )
}
