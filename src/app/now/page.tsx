import type { Metadata } from 'next'
import { Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Now',
  description: 'Current priorities, projects, and lines of inquiry.',
}

export default function NowPage() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <section className="pt-20 pb-12 border-b border-stone-200 dark:border-stone-700">
        <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
          Now
        </p>
        <h1 className="text-3xl md:text-4xl font-light text-stone-800 dark:text-stone-100 tracking-tight max-w-2xl">
          What I am working on, reading, and thinking about.
        </h1>
        <p className="mt-3 text-xs text-stone-400">Updated April 2025</p>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column */}
          <div className="space-y-10">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-5">
                Building
              </p>
              <div className="space-y-5">
                {[
                  {
                    title: 'Peacemetrics v2',
                    note: 'Rewriting the indicator normalisation pipeline and adding historical playback to the world heatmap. Improving the configurability of the weighting system so it can represent a wider range of analytical frameworks.',
                  },
                  {
                    title: 'LarpClient rendering pipeline',
                    note: 'Working through the GLSL layer composition system. The current approach handles transforms correctly but is not performing well at high element counts. Investigating GPU-side instancing.',
                  },
                  {
                    title: 'Conflict pattern analysis',
                    note: 'ACLED ingestion pipeline is stable. Currently building out the feature extraction layer — event velocity, geographic clustering, actor co-occurrence. The similarity search component is next.',
                  },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-stone-200 dark:border-stone-700 pl-4">
                    <p className="text-sm font-medium text-stone-800 dark:text-stone-100 mb-1">{item.title}</p>
                    <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-5">
                Writing
              </p>
              <div className="space-y-3">
                {[
                  'Draft: The commitment problem in counter-terrorism policy',
                  'Notes: Institutional design and the problem of time horizons',
                  'Reading notes on Turchin — cliodynamics and pattern detection',
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm text-stone-600 dark:text-stone-300">
                    <span className="text-stone-300 dark:text-stone-600 mt-0.5 shrink-0">—</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-10">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-5">
                Reading
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Complexity: A Guided Tour', author: 'Melanie Mitchell', note: 'Rigorous treatment of emergence and complex adaptive systems.' },
                  { title: 'War and Peace and War', author: 'Peter Turchin', note: 'Quantitative modelling of historical cycles. Relevant to the conflict pattern project.' },
                  { title: 'Debt: The First 5000 Years', author: 'David Graeber', note: 'Revisionist history of credit. Useful for interrogating economic foundations.' },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium text-stone-700 dark:text-stone-200">{item.title}</p>
                    <p className="text-xs text-stone-400 mb-1">{item.author}</p>
                    <p className="text-sm text-stone-500 dark:text-stone-400 leading-snug">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-5">
                Lines of inquiry
              </p>
              <div className="space-y-3">
                {[
                  'How do information asymmetries affect the bargaining model of conflict at the sub-state level?',
                  'What are the structural limits of machine learning approaches to conflict prediction?',
                  'How does the architecture of a rendering pipeline constrain the expressiveness of a GUI system?',
                  'Can cliodynamic methods be usefully applied to shorter historical time series?',
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm text-stone-600 dark:text-stone-300">
                    <span className="text-stone-300 dark:text-stone-600 mt-0.5 shrink-0">—</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-5">
                Study
              </p>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                First year at the University of Southampton. Currently covering foundations in
                political philosophy, introductory economics (micro and macro), and political
                institutions and international relations. The engineering work runs in parallel —
                evenings and weekends.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

