import type { Metadata } from 'next'
import { updates } from '@/lib/content'
import { Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Updates',
  description: 'Project milestones, releases, and meaningful progress.',
}

const categoryStyles: Record<string, string> = {
  release: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  milestone: 'text-blue-600 bg-blue-50 border-blue-200',
  note: 'text-stone-500 bg-stone-100 border-stone-200',
  project: 'text-amber-600 bg-amber-50 border-amber-200',
}

export default function UpdatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <section className="pt-20 pb-12 border-b border-stone-200">
        <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
          Updates
        </p>
        <h1 className="text-3xl md:text-4xl font-light text-stone-800 tracking-tight max-w-2xl">
          A record of progress.
        </h1>
        <p className="mt-4 text-stone-500 max-w-xl leading-relaxed">
          Releases, milestones, and meaningful movement. A precise, chronological record of
          what has shipped and what has changed.
        </p>
      </section>

      <Section>
        <div className="max-w-2xl">
          <div className="relative">
            <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-stone-200" />
            <div className="space-y-10">
              {updates.map((update, i) => (
                <div key={i} className="flex gap-8 relative">
                  <div className="w-20 shrink-0 text-right">
                    <span className="text-xs text-stone-400 font-mono pt-0.5 block">
                      {update.date.slice(0, 7)}
                    </span>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-[-1px] top-2 w-2.5 h-2.5 rounded-full bg-stone-300 ring-2 ring-stone-50" />
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-sm font-medium text-stone-800">{update.title}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded border capitalize ${categoryStyles[update.category] ?? ''}`}
                      >
                        {update.category}
                      </span>
                    </div>
                    <p className="text-sm text-stone-500 leading-relaxed">{update.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

