import type { Metadata } from 'next'
import { essays } from '@/lib/content'
import { projects } from '@/lib/content'
import { SearchClient } from './SearchClient'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search essays and projects.',
}

export default function SearchPage() {
  const items = [
    ...essays.map((e) => ({
      type: 'essay' as const,
      slug: e.slug,
      title: e.title,
      summary: e.summary,
      tags: e.tags,
    })),
    ...projects.map((p) => ({
      type: 'project' as const,
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      tags: p.tags,
    })),
  ]

  return (
    <div className="max-w-6xl mx-auto px-6">
      <section className="pt-20 pb-10 border-b border-stone-200 dark:border-stone-700">
        <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">Search</p>
        <h1 className="text-3xl md:text-4xl font-light text-stone-800 dark:text-stone-100 tracking-tight">
          Find anything.
        </h1>
      </section>
      <SearchClient items={items} />
    </div>
  )
}

