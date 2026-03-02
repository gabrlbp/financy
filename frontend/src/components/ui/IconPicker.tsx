import { ICON_MAP } from '@/lib/constants'

interface IconPickerProps {
  value: string
  onChange: (icon: string) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Ícone</label>
      <div className="grid grid-cols-8 gap-2">
        {Object.entries(ICON_MAP).map(([name, Icon]) => (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-colors cursor-pointer ${
              value === name
                ? 'border-brand'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            <Icon className="h-5 w-5" />
          </button>
        ))}
      </div>
    </div>
  )
}
