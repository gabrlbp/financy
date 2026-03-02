import { useState, type InputHTMLAttributes } from 'react'
import { Eye, EyeClosed, Lock } from 'lucide-react'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  infoText?: string
}

export function PasswordInput({ label, error, infoText, className = '', ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type={visible ? 'text' : 'password'}
          className={`w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none ${error ? 'border-danger' : ''} ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          {visible ? <Eye className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />}
        </button>
      </div>
      {infoText && <span className='text-xs text-gray-500'>{infoText}</span>}
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  )
}
