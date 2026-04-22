import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { projects } from '@/lib/content'
import { getContributionCalendar, getAllCommits } from '@/lib/github'
import { Section, SectionHeader, Tag, StatusBadge } from '@/components/ui'
import { ContributionGraph } from '@/components/ContributionGraph'
import { CommitFeed } from '@/components/CommitFeed'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Systems built at the intersection of political economy, geopolitical analysis, and software engineering.',
}

export default async function ProjectsPage() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  const [calendar, commits] = await Promise.all([
    getContributionCalendar(),
    getAllCommits(60),
  ])

  return (
    <div className="max-w-6xl mx-auto px-6">

      {/* ─── Header ─────────────────────────────────────────────── */}
      <section className="pt-20 pb-12 border-b border-stone-200">
        <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
          Projects
        </p>
        <h1 className="text-3xl md:text-4xl font-light text-stone-800 tracking-tight max-w-2xl">
          Systems built. Problems investigated.
        </h1>
        <p className="mt-4 text-stone-500 max-w-xl leading-relaxed">
          Each project is an attempt to move from reasoning about a system to building something
          that interacts with it. The problems are chosen because they are hard, not because they
          are safe.
        </p>
        <div className="mt-4">
          <Link
            href="https://github.com/mrailouis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors"
          >
            github.com/mrailouis <ExternalLink size={11} />
          </Link>
        </div>
      </section>

      {/* ─── Contribution Graph ──────────────────────────────────── */}
      <Section>
        <div className="border border-stone-200 p-6 md:p-8">
          <ContributionGraph calendar={calendar} />
        </div>
      </Section>

      {/* ─── Featured Projects ───────────────────────────────────── */}
      <Section className="border-t border-stone-200">
        <SectionHeader label="Featured" title="Core Projects" />
        <div className="space-y-4">
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block border border-stone-200 p-7 hover:border-stone-400 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 className="text-base font-medium text-stone-800 group-hover:text-stone-600 transition-colors">
                      {project.title}
                    </h2>
                    <StatusBadge status={project.status} />
                    <span className="text-xs text-stone-400 font-mono">{project.year}</span>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed mb-4 max-w-2xl">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <Tag key={s} variant="muted">{s}</Tag>
                    ))}
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 text-sm text-stone-400 group-hover:text-stone-700 transition-colors">
                    View project <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ─── Other Projects ──────────────────────────────────────── */}
      {others.length > 0 && (
        <Section className="border-t border-stone-200">
          <SectionHeader label="Also" title="Other Work" />
          <div className="space-y-px">
            {others.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-5 border-b border-stone-200 hover:border-stone-400 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-sm font-medium text-stone-800 group-hover:text-stone-600 transition-colors">
                      {project.title}
                    </h3>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="text-sm text-stone-500">{project.summary.split('.')[0]}.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((t) => (
                    <Tag key={t} variant="muted">{t}</Tag>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* ─── All Commits Feed ────────────────────────────────────── */}
      <Section className="border-t border-stone-200">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <SectionHeader
              label="Commit history"
              title="All repositories"
              description="Every commit across active projects, merged and sorted by date."
            />
            <CommitFeed commits={commits} showRepo={true} />
          </div>

          {/* Sidebar — per-repo breakdown */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-6">
              By repository
            </p>
            <div className="space-y-3">
              {['peacemetrics', 'bazaar-tracker', 'larpclient', 'louisbeer'].map((repo) => {
                const count = commits.filter((c) => c.repo === repo).length
                const linked = projects.find(
                  (p) =>
                    p.slug === repo ||
                    p.slug.replace('-', '') === repo.replace('-', '')
                )
                return (
                  <div key={repo} className="flex items-center justify-between py-3 border-b border-stone-200">
                    <div>
                      {linked ? (
                        <Link
                          href={`/projects/${linked.slug}`}
                          className="text-sm text-stone-700 hover:text-stone-500 transition-colors font-mono"
                        >
                          {repo}
                        </Link>
                      ) : (
                        <span className="text-sm text-stone-700 font-mono">{repo}</span>
                      )}
                    </div>
                    <span className="text-xs text-stone-400 font-mono">
                      {count} commit{count !== 1 ? 's' : ''}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-stone-200">
              <Link
                href="https://github.com/mrailouis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors"
              >
                View all on GitHub <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

