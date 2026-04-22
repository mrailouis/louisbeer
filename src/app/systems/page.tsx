import type { Metadata } from 'next'
import { systems } from '@/lib/content'
import { Section, SectionHeader, Tag, StatusBadge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Systems',
  description: 'Active models, prototypes, and conceptual architectures under development.',
}

export default function SystemsPage() {
  const active = systems.filter((s) => s.status === 'active')
  const others = systems.filter((s) => s.status !== 'active')

  return (
    <div className="max-w-6xl mx-auto px-6">
      <section className="pt-20 pb-12 border-b border-stone-200">
        <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
          Systems
        </p>
        <h1 className="text-3xl md:text-4xl font-light text-stone-800 tracking-tight max-w-2xl">
          Active models, prototypes, and ongoing work.
        </h1>
        <p className="mt-4 text-stone-500 max-w-xl leading-relaxed">
          A working notebook for systems under investigation. These are neither finished projects
          nor idle speculation — they are live objects in various states of development.
        </p>
      </section>

      <Section>
        <SectionHeader label="Active" title="Running Systems" />
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {active.map((system, i) => (
            <div key={i} className="border border-stone-200 p-7">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-sm font-medium text-stone-800">{system.title}</h2>
                <StatusBadge status={system.status} />
              </div>
              <p className="text-sm text-stone-500 leading-relaxed mb-4">{system.description}</p>
              <div className="flex flex-wrap gap-2">
                {system.tags.map((t) => <Tag key={t} variant="muted">{t}</Tag>)}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-200 pt-10">
          <SectionHeader label="In progress" title="Prototypes & Concepts" />
          <div className="space-y-6">
            {others.map((system, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 py-6 border-b border-stone-200">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm font-medium text-stone-800">{system.title}</h3>
                    <StatusBadge status={system.status} />
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed">{system.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 md:w-48 md:justify-end content-start">
                  {system.tags.map((t) => <Tag key={t} variant="muted">{t}</Tag>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border border-stone-200 p-8 bg-stone-50">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
            On this section
          </p>
          <p className="text-sm text-stone-600 leading-relaxed max-w-2xl">
            A system in active use is producing output and being maintained. A prototype has a working
            implementation but is not yet reliable enough for regular use. A conceptual system has a
            clear design and motivation but lacks a full implementation. The distinction matters:
            I am not listing ideas — I am listing things that exist at varying stages of completion.
          </p>
        </div>
      </Section>
    </div>
  )
}

