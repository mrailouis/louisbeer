import { getTechMeta, hexToAlpha } from '@/lib/techMeta'
import { cn } from '@/lib/cn'

interface TechTagProps {
  name: string
  variant?: 'default' | 'muted' | 'pill'
  className?: string
}

// Dynamically pull the SVG path from simple-icons
function getIconPath(slug: string): string | null {
  try {
    // simple-icons exports an object keyed by `si${Slug}` with { path, hex, title }
    // We do a dynamic require so this only runs server-side at build time
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const icons = require('simple-icons')
    const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`
    return icons[key]?.path ?? null
  } catch {
    return null
  }
}

export function TechTag({ name, variant = 'default', className }: TechTagProps) {
  const meta = getTechMeta(name)

  if (!meta) {
    // Fallback: plain tag with no icon
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded border font-mono',
          variant === 'muted'
            ? 'text-stone-500 dark:text-stone-400 border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800'
            : 'text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/60',
          className
        )}
      >
        {name}
      </span>
    )
  }

  const iconPath = getIconPath(meta.icon)
  const bg = hexToAlpha(meta.color, 0.08)
  const border = hexToAlpha(meta.color, 0.25)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded border font-mono whitespace-nowrap',
        className
      )}
      style={{
        color: meta.color === '#F7DF1E' ? '#92700A' : meta.color, // darken yellow for readability
        backgroundColor: bg,
        borderColor: border,
      }}
    >
      {iconPath && (
        <svg
          role="img"
          viewBox="0 0 24 24"
          className="w-3 h-3 shrink-0"
          fill="currentColor"
          aria-label={name}
        >
          <path d={iconPath} />
        </svg>
      )}
      {name}
    </span>
  )
}

// Drop-in replacement for the plain Tag when used for stack items
export function StackTagList({ stack, limit }: { stack: string[]; limit?: number }) {
  const items = limit ? stack.slice(0, limit) : stack
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s) => (
        <TechTag key={s} name={s} />
      ))}
    </div>
  )
}

