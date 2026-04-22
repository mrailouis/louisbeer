'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Tag } from '@/components/ui'
import { Document } from 'flexsearch'

interface SearchItem {
  type: 'essay' | 'project'
  slug: string
  title: string
  summary: string
  tags: string[]
}

interface Props {
  items: SearchItem[]
}

export function SearchClient({ items }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const indexRef = useRef<InstanceType<typeof Document> | null>(null)

  useEffect(() => {
    const index = new Document({
      document: {
        id: 'slug',
        index: ['title', 'summary', 'tags'],
        store: true,
      },
      tokenize: 'forward',
    })
    items.forEach((item) =>
      index.add({ ...item, tags: item.tags.join(' ') })
    )
    indexRef.current = index
  }, [items])

  useEffect(() => {
    if (!query.trim() || !indexRef.current) {
      setResults([])
      return
    }
    const raw = indexRef.current.search(query, { enrich: true, limit: 12 }) as unknown as Array<{ result: Array<{ doc: SearchItem }> }>
    const seen = new Set<string>()
    const found: SearchItem[] = []
    if (Array.isArray(raw)) {
      for (const field of raw) {
        if (field?.result) {
          for (const result of field.result) {
            const doc = result.doc
            if (doc && !seen.has(doc.slug)) {
              seen.add(doc.slug)
              found.push(doc)
            }
          }
        }
      }
    }
    setResults(found)
  }, [query])

  const href = (item: SearchItem) =>
    item.type === 'essay' ? `/writing/${item.slug}` : `/projects/${item.slug}`

  const typeLabel = (type: 'essay' | 'project') =>
    type === 'essay' ? 'Essay' : 'Project'

  return (
    <div className="py-8">
      {/* Input */}
      <div className="relative max-w-xl mb-10">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Search essays, projects, topics…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full pl-9 pr-4 py-3 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 text-stone-800 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-slate-500 transition-colors"
        />
      </div>

      {/* Results */}
      {query.trim() && results.length === 0 && (
        <p className="text-sm text-stone-400">No results for <span className="font-mono">"{query}"</span></p>
      )}

      {!query.trim() && (
        <p className="text-sm text-stone-400">Start typing to search across all essays and projects.</p>
      )}

      <div className="space-y-px">
        {results.map((item) => (
          <Link
            key={item.slug}
            href={href(item)}
            className="group flex flex-col md:flex-row md:items-start justify-between gap-4 py-5 border-b border-stone-200 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 border border-stone-300 dark:border-stone-600 px-1.5 py-0.5">
                  {typeLabel(item.type)}
                </span>
                <h3 className="text-sm font-medium text-stone-800 dark:text-stone-100 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2">
                {item.summary}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 shrink-0 md:max-w-[200px] md:justify-end">
              {item.tags.slice(0, 3).map((t) => (
                <Tag key={t} variant="muted">{t}</Tag>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}





