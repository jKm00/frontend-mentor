export function Button({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
}) {
  return (
    <button
      className={`border rounded-md text-sm px-2 py-1 ${active ? 'bg-blue-400/10 border-blue-400 text-blue-400' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
