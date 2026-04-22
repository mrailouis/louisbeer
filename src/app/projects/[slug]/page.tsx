import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, GitBranch } from 'lucide-react'
import { projects } from '@/lib/content'
import { getRepoCommits } from '@/lib/github'
import { Tag, StatusBadge, Callout, Section } from '@/components/ui'
import { CommitFeed } from '@/components/CommitFeed'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
  }
}

// Extended project content — rich descriptions per project
const projectContent: Record<string, {
  architecture: string
  challenges: string
  systemsNote: string
  technicalBreakdown: string[]
}> = {
  larpclient: {
    architecture: `
LarpClient is structured around three distinct layers with well-defined boundaries between them.
The loader layer handles class injection into the Minecraft JVM at startup, using a custom agent
that intercepts class loading and applies mixin transformations before classes are used. The feature
layer is written in Kotlin and implements all client-side functionality — from movement systems to
GUI state management. The GUI layer is a fully custom GLSL shader pipeline that bypasses Minecraft's
standard rendering stack entirely.

Authentication is handled through a lightweight HTTP server that issues signed tokens, validated
on the client side via a challenge-response protocol. This prevents trivial session sharing without
requiring a heavyweight backend.
    `,
    technicalBreakdown: [
      'Custom Java agent with class transformer for pre-load mixin application',
      'Mixin remapping pipeline that handles both obfuscated and deobfuscated Minecraft targets simultaneously',
      'GLSL-based GUI system with layer composition, transform hierarchy, and event routing',
      'Kotlin feature layer with typed state management and lifecycle hooks',
      'HTTP authentication server with challenge-response token validation',
      'Obfuscation pipeline for distribution — ProGuard-based with custom rule generation',
      'Gradle multi-module build with separate loader, core, and feature modules',
    ],
    challenges: `
The primary challenge was the mixin mapping problem. Minecraft in development mode uses deobfuscated
names; in production it uses obfuscated names. Most mixin targets are specified by development name.
The loader needs to translate these mappings at runtime, which requires maintaining and querying a
mapping table during class transformation — adding latency that must be minimised.

The second major challenge was the GUI rendering pipeline. LWJGL's OpenGL bindings operate at a
different abstraction level than Minecraft's rendering stack. Building a GUI that correctly handles
Minecraft's rendering lifecycle — including its frame-buffer state, projection matrices, and rendering
passes — required careful attention to state management and extensive debugging of GPU state.
    `,
    systemsNote: `
LarpClient is an exercise in operating at multiple levels of abstraction simultaneously. At the lowest
level, it manipulates bytecode. At the highest level, it presents a feature-rich user experience. The
complexity arises precisely because the boundaries between levels are not clean — Minecraft's rendering
system bleeds into LWJGL's state machine, and the JVM's class loading mechanics constrain what mixin
transformations are possible.

This kind of multi-level systems thinking is the same skill that makes geopolitical analysis tractable:
the ability to hold simultaneously a view at the level of mechanism and a view at the level of outcome,
and to reason about how disturbances at one level propagate to the other.
    `,
  },
  peacemetrics: {
    architecture: `
Peacemetrics is built around a data pipeline that ingests from multiple sources — UN Security Council
voting records, World Bank development indicators, SIPRI conflict and arms data, Freedom House
democracy indices — normalises these onto comparable scales, and stores them in a PostgreSQL database
with a clear schema that separates raw source data from derived indicators.

The frontend is a Next.js application using D3.js for the world map visualisation. Indicator weights
are stored in configuration objects that the user can modify; the weighted composite score for each
country is computed on the server and passed to the client as a GeoJSON feature collection.
    `,
    technicalBreakdown: [
      'Python ingestion pipeline with source-specific parsers and a shared normalisation layer',
      'PostgreSQL schema separating raw source data, derived indicators, and composite scores',
      'Configurable weighting system with validated configuration objects (Zod)',
      'Server-side score computation with country-level GeoJSON output',
      'D3.js choropleth map with configurable colour scale and tooltip system',
      'Historical playback mode: scroll through indicator values over time',
      'REST API for querying individual country indicator history',
    ],
    challenges: `
The normalisation problem is harder than it appears. Different sources report data at different
frequencies (annual, quarterly, event-based), with different coverage (not all countries appear
in all datasets), and with different definitional choices. A governance index and a conflict event
count are not directly comparable. The normalisation layer must make explicit choices about how
to handle missing data, how to rescale different value ranges, and how to aggregate events into
continuous scores.

These are not technical problems — they are epistemological ones. Every normalisation decision
encodes an assumption about what the indicator is measuring. Peacemetrics is designed to make
those assumptions visible and modifiable.
    `,
    systemsNote: `
The most interesting aspect of Peacemetrics is not the technology — it is the question it is
trying to answer. Conventional geopolitical risk tools present opaque scores. Peacemetrics is
built on the premise that the weighting system is the analysis: by making the weights configurable,
the tool allows you to explore how different theoretical frameworks — realist, liberal, constructivist
— produce different risk landscapes from the same underlying data. That is itself a form of analysis.
    `,
  },
  'bazaar-tracker': {
    architecture: `
Bazaar Tracker operates as a continuous data ingestion system. A background process polls the
Hypixel API at regular intervals, storing time-stamped snapshots of the full bazaar order book
to a PostgreSQL database. A separate analytical layer runs asynchronously, computing derived
metrics — moving averages, volatility estimates, order book depth ratios — and storing these
alongside the raw snapshots.

The Discord bot is a query interface over this analytical layer. Users issue structured commands
to retrieve current state, historical ranges, trend summaries, or regime classifications for
specific items.
    `,
    technicalBreakdown: [
      'Continuous ingestion pipeline polling Hypixel API with backoff and error recovery',
      'PostgreSQL time-series schema with efficient range query patterns',
      'Analytical layer computing moving averages, volatility, and order book metrics',
      'Market regime classifier: trending, mean-reverting, illiquid, manipulated',
      'Discord.js bot with structured command interface and pagination',
      'Next.js dashboard for visual inspection of historical data',
      'Historical dataset covering 2019 to present — approximately 2TB of raw snapshots',
    ],
    challenges: `
The primary challenge is signal extraction from a noisy, adversarially-influenced environment.
Bazaar prices are manipulated by large players who can move markets deliberately. A naive trend
signal will track manipulations as well as genuine trends. The regime classifier attempts to
distinguish between organic price movement and artificial manipulation by looking at order book
structure: genuine trends are accompanied by depth; manipulation typically involves thin order
books on one side.

The historical dataset itself presented storage and query challenges. Naive storage of full order
book snapshots at high frequency produces extremely large tables. The current schema uses compression
and selective retention — full snapshots are archived, but the analytical layer retains only
derived metrics in the hot path.
    `,
    systemsNote: `
The Hypixel Skyblock bazaar is a useful laboratory for applied economics. The trading population
is large (millions of players), the environment is structured (fixed rules, visible order books),
and the data is accessible. These conditions make it possible to apply market microstructure
reasoning in a context where the ground truth is observable — which is not always the case in
real financial markets.

The behavioural patterns that emerge — front-running, spoofing, momentum chasing, mean reversion
trading — are recognisable from financial economics literature. The bazaar is not a toy; it is a
small, fast, observable market that allows empirical investigation of market dynamics at low cost.
    `,
  },
  'systems-modelling-toolkit': {
    architecture: 'Composable TypeScript primitives for modelling actors, incentive structures, and institutional rules. Designed for eventual integration with simulation and visualisation layers.',
    technicalBreakdown: [
      'Typed actor model with configurable payoff functions',
      'Rule engine for encoding institutional constraints',
      'Feedback loop primitives for modelling recursive dynamics',
      'Export format compatible with D3.js visualisation',
    ],
    challenges: 'The primary challenge is designing an API that is simultaneously expressive enough to model real institutional complexity and simple enough to be useful without extensive configuration.',
    systemsNote: 'This toolkit is the direct translation of PPE analytical frameworks into software primitives. The goal is to make it possible to write formal models of institutional behaviour that can be inspected, modified, and run.',
  },
  'conflict-pattern-analysis': {
    architecture: 'Python pipeline ingesting ACLED and UCDP datasets, extracting temporal and spatial features, and running similarity search against a historical case library.',
    technicalBreakdown: [
      'ACLED and UCDP dataset ingestion with schema normalisation',
      'Feature extraction: event velocity, geographic clustering, actor network analysis',
      'Similarity search using temporal distance metrics',
      'Historical case library with annotated escalation outcomes',
    ],
    challenges: 'Conflict data is messy, incomplete, and politically contested. Different datasets encode different definitions of what constitutes a conflict event. The analytical pipeline must be explicit about which definitions it is using.',
    systemsNote: 'This project applies the intuition that structural similarities between situations are predictive — not deterministically, but probabilistically. The historical record is not a prediction engine; it is a reference library. The tool surfaces analogues; the analyst evaluates them.',
  },
}

// Map project slug → GitHub repo name
const slugToRepo: Record<string, string> = {
  larpclient: 'larpclient',
  peacemetrics: 'peacemetrics',
  'bazaar-tracker': 'bazaar-tracker',
  'systems-modelling-toolkit': 'systems-modelling-toolkit',
  'conflict-pattern-analysis': 'conflict-pattern-analysis',
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) notFound()

  const content = projectContent[slug]
  const repoName = slugToRepo[slug]
  const commits = repoName ? await getRepoCommits(repoName, 40) : []

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Breadcrumb */}
      <div className="pt-12 pb-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700 transition-colors"
        >
          <ArrowLeft size={14} /> Projects
        </Link>
      </div>

      {/* Header */}
      <section className="pb-12 border-b border-stone-200">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <StatusBadge status={project.status} />
          <span className="text-xs text-stone-400 font-mono">{project.year}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-light text-stone-800 tracking-tight mb-4">
          {project.title}
        </h1>
        <p className="text-stone-500 leading-relaxed max-w-2xl">{project.summary}</p>
        <div className="flex flex-wrap gap-2 mt-6">
          {project.stack.map((s) => <Tag key={s}>{s}</Tag>)}
        </div>
        <div className="flex gap-4 mt-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 transition-colors"
            >
              <GitBranch size={14} /> Repository
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 transition-colors"
            >
              <ExternalLink size={14} /> Live
            </a>
          )}
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-10">

            {/* Problem */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                Problem
              </p>
              <p className="text-stone-600 leading-relaxed">{project.problem}</p>
            </div>

            {/* What it does */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                What it does
              </p>
              <p className="text-stone-600 leading-relaxed">{project.what}</p>
            </div>

            {/* Architecture */}
            {content?.architecture && (
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                  Architecture
                </p>
                <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                  {content.architecture.trim()}
                </p>
              </div>
            )}

            {/* Technical breakdown */}
            {content?.technicalBreakdown && (
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                  Technical implementation
                </p>
                <ul className="space-y-2">
                  {content.technicalBreakdown.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-stone-600">
                      <span className="text-stone-300 mt-0.5 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges */}
            {content?.challenges && (
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                  Challenges &amp; constraints
                </p>
                <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                  {content.challenges.trim()}
                </p>
              </div>
            )}

            {/* Systems note */}
            {content?.systemsNote && (
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                  Systems thinking note
                </p>
                <Callout>{content.systemsNote.trim()}</Callout>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="border border-stone-200 p-6">
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => <Tag key={s} variant="muted">{s}</Tag>)}
              </div>
            </div>
            <div className="border border-stone-200 p-6">
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => <Tag key={t} variant="muted">{t}</Tag>)}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Commit History ───────────────────────────────────────── */}
      {commits.length > 0 && (
        <Section className="border-t border-stone-200">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <div className="mb-8">
                <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-2">
                  Commit history
                </p>
                <h2 className="text-xl font-light text-stone-800">
                  {project.title} — {commits.length} commits
                </h2>
                <p className="text-sm text-stone-500 mt-1">
                  Full commit log for this repository, most recent first.
                </p>
              </div>
              <CommitFeed commits={commits} showRepo={false} />
            </div>

            <div>
              <div className="border border-stone-200 p-6 sticky top-20">
                <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                  Repository
                </p>
                <p className="text-sm font-mono text-stone-700 mb-4">
                  mrailouis/{repoName}
                </p>
                <dl className="space-y-3 text-xs">
                  <div>
                    <dt className="text-stone-400">Commits shown</dt>
                    <dd className="text-stone-600 font-mono mt-0.5">{commits.length}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-400">Most recent</dt>
                    <dd className="text-stone-600 font-mono mt-0.5">
                      {commits[0]?.date
                        ? new Date(commits[0].date).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })
                        : '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-400">Oldest shown</dt>
                    <dd className="text-stone-600 font-mono mt-0.5">
                      {commits[commits.length - 1]?.date
                        ? new Date(commits[commits.length - 1].date).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })
                        : '—'}
                    </dd>
                  </div>
                </dl>
                {project.github && (
                  <a
                    href={`${project.github}/commits`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors mt-5"
                  >
                    Full history on GitHub <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </Section>
      )}
    </div>
  )
}

