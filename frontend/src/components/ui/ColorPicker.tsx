import { COLOR_PALETTE } from '@/lib/constants'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Cor</label>
      <div className="flex gap-3">
        {COLOR_PALETTE.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`h-9 w-14 cursor-pointer rounded-lg border-2 p-1 transition-all ${
              value === color ? '' : 'border-gray-300'
            }`}
            style={{
              backgroundColor: 'white',
              borderColor: value === color ? color : undefined,
            }}
          >
            <div
              className="h-full w-full rounded-sm"
              style={{ backgroundColor: color }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
