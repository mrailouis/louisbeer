import type { Metadata } from 'next'
import { systems } from '@/lib/content'
import { Section, SectionHeader, Tag, StatusBadge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Systems',
  description: 'Active models and systems under development.',
}

export default function SystemsPage() {
  const active = systems.filter((s) => s.status === 'active')

  return (
    <div className="max-w-6xl mx-auto px-6">
      <section className="pt-20 pb-12 border-b border-stone-200 dark:border-stone-700">
        <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">Systems</p>
        <h1 className="text-3xl md:text-4xl font-light text-stone-800 dark:text-stone-100 tracking-tight max-w-2xl">
          Active models and ongoing work.
        </h1>
        <p className="mt-4 text-stone-500 dark:text-stone-400 max-w-xl leading-relaxed">
          A working notebook for systems in active use. These are not finished products nor
          idle speculation — they are live objects producing output.
        </p>
      </section>

      <Section>
        <SectionHeader label="Active" title="Running Systems" />
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {active.map((system, i) => (
            <div key={i} className="border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-7">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-sm font-medium text-stone-800 dark:text-stone-100">{system.title}</h2>
                <StatusBadge status={system.status} />
              </div>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-4">{system.description}</p>
              <div className="flex flex-wrap gap-2">
                {system.tags.map((t) => <Tag key={t} variant="muted">{t}</Tag>)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 p-8">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">On this section</p>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
            A system in active use is producing output and being maintained. The distinction matters:
            this page lists only things that currently exist and run, not aspirations or designs.
          </p>
        </div>
      </Section>
    </div>
  )
}
