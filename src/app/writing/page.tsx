import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllEssayMeta } from '@/lib/mdx'
import { Section, SectionHeader, Tag } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Analytical essays and notes on geopolitics, political economy, systems thinking, and the theory behind the engineering.',
}

export default async function WritingPage() {
  const essays = await getAllEssayMeta()
  const featured = essays.filter((e) => e.featured)
  const rest = essays.filter((e) => !e.featured)

  return (
    <div className="max-w-6xl mx-auto px-6">
      <section className="pt-20 pb-12 border-b border-stone-200">
        <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
          Writing
        </p>
        <h1 className="text-3xl md:text-4xl font-light text-stone-800 tracking-tight max-w-2xl">
          Essays and analytical notes.
        </h1>
        <p className="mt-4 text-stone-500 max-w-xl leading-relaxed">
          Writing is where the reasoning gets tested. These pieces cover geopolitics, institutional
          behaviour, systems thinking, and the theory underneath the engineering.
        </p>
      </section>

      <Section>
        <SectionHeader label="Featured" title="Selected Essays" />
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {featured.map((essay) => (
            <Link
              key={essay.slug}
              href={`/writing/${essay.slug}`}
              className="group border border-stone-200 p-7 hover:border-stone-400 transition-colors"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {essay.tags.map((t) => <Tag key={t} variant="muted">{t}</Tag>)}
              </div>
              <h2 className="text-sm font-medium text-stone-800 leading-snug mb-3 group-hover:text-stone-600 transition-colors">
                {essay.title}
              </h2>
              <p className="text-sm text-stone-500 leading-relaxed mb-4">{essay.summary}</p>
              <div className="flex items-center gap-4 text-xs text-stone-400">
                <span>{essay.date}</span>
                <span>{essay.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="border-t border-stone-200 pt-10">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-6">
            All Writing
          </p>
          <div className="space-y-px">
            {[...featured, ...rest].map((essay) => (
              <Link
                key={essay.slug}
                href={`/writing/${essay.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-5 border-b border-stone-200 hover:border-stone-400 transition-colors"
              >
                <div>
                  <h3 className="text-sm font-medium text-stone-800 mb-1 group-hover:text-stone-600 transition-colors">
                    {essay.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {essay.tags.slice(0, 3).map((t) => <Tag key={t} variant="muted">{t}</Tag>)}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-stone-400 shrink-0">
                  <span className="font-mono">{essay.date.slice(0, 7)}</span>
                  <span>{essay.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}

