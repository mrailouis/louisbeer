import type { Metadata } from 'next'
import { reading } from '@/lib/content'
import { Section, SectionHeader, StatusBadge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Reading',
  description: 'Books, essays, and writers that inform the work.',
}

const categories = Array.from(new Set(reading.map((r) => r.category)))

export default function ReadingPage() {
  const current = reading.filter((r) => r.status === 'reading')
  const byCategory = categories.map((cat) => ({
    category: cat,
    items: reading.filter((r) => r.category === cat && r.status !== 'reading'),
  })).filter((c) => c.items.length > 0)

  return (
    <div className="max-w-6xl mx-auto px-6">
      <section className="pt-20 pb-12 border-b border-stone-200 dark:border-stone-700">
        <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
          Reading
        </p>
        <h1 className="text-3xl md:text-4xl font-light text-stone-800 dark:text-stone-100 tracking-tight max-w-2xl">
          Books, writers, and intellectual influences.
        </h1>
        <p className="mt-4 text-stone-500 dark:text-stone-400 max-w-xl leading-relaxed">
          A structured list of what I am reading, have read, and return to. Notes where they
          add something; none where the title speaks for itself.
        </p>
      </section>

      <Section>
        {/* Currently reading */}
        {current.length > 0 && (
          <div className="mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-6">
              Currently reading
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {current.map((item, i) => (
                <div key={i} className="border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-sm font-medium text-stone-800 dark:text-stone-100">{item.title}</p>
                      <p className="text-xs text-stone-400 mt-0.5">{item.author}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  {item.note && (
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-3 leading-relaxed">{item.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* By category */}
        <div className="space-y-10">
          {byCategory.map(({ category, items }) => (
            <div key={category}>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                {category}
              </p>
              <div className="space-y-px">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row md:items-start gap-3 py-4 border-b border-stone-200 dark:border-stone-700"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-medium text-stone-700 dark:text-stone-200">{item.title}</p>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5">{item.author}</p>
                      {item.note && (
                        <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 leading-relaxed max-w-xl">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

