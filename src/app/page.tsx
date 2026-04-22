import Link from "next/link";
import { ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import { projects, essays, updates } from "@/lib/content";
import { getGithubActivity } from "@/lib/github";
import { Section, SectionHeader, Tag, StatusBadge } from "@/components/ui";

export default async function HomePage() {
  const activity = await getGithubActivity();
  const featuredProjects = projects.filter((p) => p.featured);
  const featuredEssays = essays.filter((e) => e.featured);
  const recentUpdates = updates.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-28 border-b border-stone-200">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-6">
            Louis Beer
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-stone-800 tracking-tight leading-tight mb-6">
            Political economy,<br />
            geopolitical systems,<br />
            and software engineering.
          </h1>
          <p className="text-lg text-stone-500 leading-relaxed max-w-2xl">
            PPE student at the University of Southampton. I study political, economic, and
            institutional systems — and build software implementations of those ideas.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-stone-800 border border-stone-800 px-5 py-2.5 hover:bg-stone-800 hover:text-stone-50 transition-colors"
            >
              Projects <ArrowRight size={14} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-stone-500 border border-stone-300 px-5 py-2.5 hover:border-stone-500 hover:text-stone-700 transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Intro ────────────────────────────────────────────── */}
      <Section>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-6">
              Orientation
            </p>
            <p className="text-stone-600 leading-relaxed mb-4">
              Philosophy, politics, and economics are not three separate subjects. They are
              three analytical lenses on the same underlying problem: how do rational and
              semi-rational actors behave within structured systems, and what emerges from
              that behaviour at scale?
            </p>
            <p className="text-stone-600 leading-relaxed mb-4">
              Software engineering, for me, is the natural extension of that inquiry. A
              system described is a system partially understood. A system implemented is a
              system tested against reality.
            </p>
            <p className="text-stone-600 leading-relaxed">
              My work sits at this intersection — from modelling geopolitical risk to
              reverse engineering complex software systems, from writing analytically about
              institutions to building the tools to analyse them directly.
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-3">
                Current focus
              </p>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex gap-2">
                  <span className="text-stone-300 mt-0.5">—</span>
                  Peacemetrics stability index v2
                </li>
                <li className="flex gap-2">
                  <span className="text-stone-300 mt-0.5">—</span>
                  Conflict precondition pattern analysis
                </li>
                <li className="flex gap-2">
                  <span className="text-stone-300 mt-0.5">—</span>
                  LarpClient rendering pipeline
                </li>
                <li className="flex gap-2">
                  <span className="text-stone-300 mt-0.5">—</span>
                  Writing: incentives and institutional failure
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-3">
                Based
              </p>
              <p className="text-sm text-stone-600">Southampton, UK</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Featured Projects ────────────────────────────────── */}
      <Section className="border-t border-stone-200">
        <SectionHeader
          label="Selected Work"
          title="Projects"
          description="Systems built at the intersection of political, economic, and computational thinking."
        />
        <div className="space-y-px">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-stone-200 hover:border-stone-400 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-sm font-medium text-stone-800 group-hover:text-stone-600 transition-colors">
                    {project.title}
                  </h3>
                  <StatusBadge status={project.status} />
                </div>
                <p className="text-sm text-stone-500 leading-relaxed max-w-xl">
                  {project.summary.split(".")[0]}.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {project.stack.slice(0, 3).map((s) => (
                  <Tag key={s} variant="muted">
                    {s}
                  </Tag>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 transition-colors"
          >
            All projects <ArrowRight size={14} />
          </Link>
        </div>
      </Section>

      {/* ─── Writing Preview ──────────────────────────────────── */}
      <Section className="border-t border-stone-200">
        <SectionHeader
          label="Writing"
          title="Recent Essays"
          description="Analytical writing on geopolitics, institutional behaviour, systems thinking, and the theory behind the engineering."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {featuredEssays.map((essay) => (
            <Link
              key={essay.slug}
              href={`/writing/${essay.slug}`}
              className="group border border-stone-200 p-6 hover:border-stone-400 transition-colors"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {essay.tags.slice(0, 2).map((t) => (
                  <Tag key={t} variant="muted">
                    {t}
                  </Tag>
                ))}
              </div>
              <h3 className="text-sm font-medium text-stone-800 leading-snug mb-3 group-hover:text-stone-600 transition-colors">
                {essay.title}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed line-clamp-3">
                {essay.summary}
              </p>
              <p className="text-xs text-stone-400 mt-4">{essay.readingTime}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 transition-colors"
          >
            All writing <ArrowRight size={14} />
          </Link>
        </div>
      </Section>

      {/* ─── GitHub Activity ──────────────────────────────────── */}
      <Section className="border-t border-stone-200">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Activity */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-6">
              GitHub Activity
            </p>
            <div className="space-y-4">
              {activity.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <GitBranch size={14} className="text-stone-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-stone-400 font-mono mb-0.5">
                      {item.repo.split("/")[1]}
                    </p>
                    {item.message && (
                      <p className="text-sm text-stone-600 leading-snug">
                        {item.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="https://github.com/mrailouis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 transition-colors mt-6"
            >
              github.com/mrailouis <ExternalLink size={12} />
            </Link>
          </div>

          {/* Updates */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-6">
              Recent Updates
            </p>
            <div className="space-y-5">
              {recentUpdates.map((u, i) => (
                <div key={i} className="flex gap-4">
                  <p className="text-xs text-stone-400 font-mono pt-0.5 shrink-0 w-20">
                    {u.date.slice(0, 7)}
                  </p>
                  <div>
                    <p className="text-sm font-medium text-stone-700">{u.title}</p>
                    <p className="text-sm text-stone-500 mt-0.5 leading-snug">
                      {u.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 transition-colors mt-6"
            >
              Full changelog <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </Section>

      {/* ─── Navigation Strip ─────────────────────────────────── */}
      <Section className="border-t border-stone-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: "/systems", label: "Systems", desc: "Active models and prototypes" },
            { href: "/aspirations", label: "Aspirations", desc: "Long-term direction" },
            { href: "/reading", label: "Reading", desc: "Influences and references" },
            { href: "/photography", label: "Photography", desc: "Visual observation" },
          ].map(({ href, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="group border border-stone-200 p-5 hover:border-stone-400 transition-colors"
            >
              <p className="text-sm font-medium text-stone-800 mb-1 group-hover:text-stone-600 transition-colors">
                {label}
              </p>
              <p className="text-xs text-stone-400">{desc}</p>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
