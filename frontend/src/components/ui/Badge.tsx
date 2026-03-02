interface BadgeProps {
  label: string
  color: string
}

export function Badge({ label, color }: BadgeProps) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
      style={{
        backgroundColor: `${color}1A`,
        color,
      }}
    >
      {label}
    </span>
  )
}
