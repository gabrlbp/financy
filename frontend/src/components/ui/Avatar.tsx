import { getInitials } from '@/lib/format'

interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-16 w-16 text-xl',
}

export function Avatar({ name, size = 'md' }: AvatarProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-300 text-gray-800 font-medium ${sizes[size]}`}
    >
      {getInitials(name)}
    </div>
  )
}
