import { cn } from '@/lib/cn'
import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
}

export function Section({ children, className }: SectionProps) {
  return (
    <section className={cn('py-16 md:py-20', className)}>
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-10">
      {label && (
        <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-3">
          {label}
        </p>
      )}
      <h2 className="text-2xl font-light text-stone-800 tracking-tight">{title}</h2>
      {description && (
        <p className="mt-3 text-stone-500 max-w-2xl leading-relaxed">{description}</p>
      )}
    </div>
  )
}

interface TagProps {
  children: ReactNode
  variant?: 'default' | 'muted'
}

export function Tag({ children, variant = 'default' }: TagProps) {
  return (
    <span
      className={cn(
        'inline-block text-xs px-2.5 py-1 rounded border font-mono',
        variant === 'muted'
          ? 'text-stone-400 border-stone-200 bg-transparent'
          : 'text-stone-600 border-stone-300 bg-stone-100'
      )}
    >
      {children}
    </span>
  )
}

interface StatusBadgeProps {
  status: string
}

const statusStyles: Record<string, string> = {
  active: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  live: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  prototype: 'text-amber-700 bg-amber-50 border-amber-200',
  concept: 'text-stone-500 bg-stone-100 border-stone-200',
  archived: 'text-stone-400 bg-stone-50 border-stone-200',
  paused: 'text-stone-400 bg-stone-50 border-stone-200',
  reading: 'text-blue-700 bg-blue-50 border-blue-200',
  read: 'text-stone-500 bg-stone-100 border-stone-200',
  reference: 'text-violet-700 bg-violet-50 border-violet-200',
  conceptual: 'text-stone-400 bg-stone-50 border-stone-200',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-block text-xs px-2.5 py-1 rounded border capitalize',
        statusStyles[status] ?? 'text-stone-500 border-stone-200'
      )}
    >
      {status}
    </span>
  )
}

export function Divider() {
  return <hr className="border-stone-200 my-12" />
}

interface CalloutProps {
  children: ReactNode
  className?: string
}

export function Callout({ children, className }: CalloutProps) {
  return (
    <blockquote
      className={cn(
        'border-l-2 border-stone-800 pl-6 my-8 text-stone-600 italic leading-relaxed',
        className
      )}
    >
      {children}
    </blockquote>
  )
}

