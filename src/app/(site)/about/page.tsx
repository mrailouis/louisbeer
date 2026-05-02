import type { Metadata } from 'next'
import { Callout, Divider, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Louis Beer — PPE student at the University of Southampton working at the intersection of political economy, geopolitical analysis, and systems-level software engineering.',
}

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6">

      {/* Header */}
      <section className="pt-20 pb-12 border-b border-stone-200 dark:border-stone-700">
        <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
          About
        </p>
        <h1 className="text-3xl md:text-4xl font-light text-stone-800 dark:text-stone-100 tracking-tight max-w-2xl">
          Systems are everywhere. The question is whether you can see them.
        </h1>
      </section>

      <Section>
        <div className="grid md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-10">

            {/* Who */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                Orientation
              </p>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                I am a Philosophy, Politics, and Economics student at the University of Southampton.
                I am also a software engineer. These are not two separate identities — they are two
                modes of the same underlying interest: how do complex systems behave, and what can
                be built to understand or influence them?
              </p>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                I am drawn to problems that exist at the edges of conventional categorisation —
                where economic reasoning intersects with geopolitical reality, where philosophy
                clarifies what engineering obscures, and where software can operationalise what
                theory can only describe.
              </p>
            </div>

            <Divider />

            {/* Why PPE */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                Why PPE
              </p>

              <h2 className="text-base font-medium text-stone-800 dark:text-stone-100 mb-3">Philosophy</h2>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                Philosophy teaches clarity. More specifically, it teaches you to notice when a
                question is confused — when apparent disagreement is actually a semantic dispute,
                when a claim is empirical that presents itself as conceptual, when a framework is
                producing bad outputs because its foundations are quietly broken. This is not merely
                academic. It is a debugging skill for reasoning.
              </p>

              <h2 className="text-base font-medium text-stone-800 dark:text-stone-100 mb-3">Politics</h2>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                Politics, studied properly, is a study of institutions, power, and incentive
                structures. It asks why states behave as they do, how international orders are
                maintained and disrupted, what conditions produce cooperation or conflict, and how
                institutional design shapes individual behaviour in ways that aggregate to collective
                outcomes. These are systems questions — they just happen to involve humans and
                governments rather than code.
              </p>

              <h2 className="text-base font-medium text-stone-800 dark:text-stone-100 mb-3">Economics</h2>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                Economics provides the most rigorous vocabulary for reasoning about tradeoffs,
                incentives, and equilibria. Its modelling tools — game theory, mechanism design,
                general equilibrium analysis — translate naturally into questions about any system
                where actors make choices under constraints. It also forces precision: in economics,
                vague reasoning is quickly exposed by formal structure.
              </p>
            </div>

            <Divider />

            {/* Why Coding */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                Why Software Engineering
              </p>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                A theory that cannot be implemented is a theory that cannot be fully tested.
                Software engineering is the discipline of turning ideas into systems that interact
                with reality — and reality has a way of exposing assumptions that survive perfectly
                well in the abstract.
              </p>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                I am particularly drawn to systems-level work: authentication architectures,
                rendering pipelines, low-level JVM injection, data ingestion pipelines, market
                modelling. These problems reward the same kind of thinking that good analytical
                philosophy rewards — precision about state, clear reasoning about edge cases,
                attention to what is explicitly defined versus what is assumed.
              </p>

              <Callout>
                The act of building a system teaches you things about it that description alone cannot.
                When a model fails at the implementation stage, that is not an engineering problem — it
                is a conceptual one. The code is just honest about it.
              </Callout>
            </div>

            <Divider />

            {/* Why they fit */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                The Synthesis
              </p>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                Political and economic systems can be modelled, analysed, visualised, simulated, and
                in some cases operationalised. The tools that allow this are software tools. A
                researcher who understands both the substantive domain and the technical infrastructure
                can do things that neither a pure social scientist nor a pure engineer can.
              </p>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                This is the operating premise of most of my project work. Peacemetrics is not a
                visualisation exercise — it is an attempt to make the implicit weighting systems in
                geopolitical analysis explicit and configurable. The Bazaar Tracker is not a scraping
                project — it is an application of market microstructure reasoning to a constrained
                but real economic environment.
              </p>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                The combination of PPE and engineering does not produce a generalist. It produces
                someone who can reason rigorously about complex systems and then build tools to
                investigate them.
              </p>
            </div>

            <Divider />

            {/* Technical philosophy */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                Technical Philosophy
              </p>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                I have a strong preference for understanding systems from the inside. When I work with
                a piece of technology, I want to know how it works at the level below the abstraction
                I am using. This is partly epistemic — I distrust abstractions I cannot see through
                — and partly practical. Edge cases live at the level below the documentation.
              </p>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                I am willing to engage with problems that most engineers avoid because the success
                probability is unclear. Reverse engineering obfuscated bytecode. Building custom
                rendering pipelines from scratch. Extracting predictive signal from noisy time-series
                data. These problems are difficult precisely because they require reasoning under
                uncertainty without a clear path — which is, not coincidentally, the condition under
                which most important problems exist.
              </p>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                I prefer explicit systems over clever ones. If something is difficult to understand
                in retrospect, it was probably not well-reasoned at the time.
              </p>
            </div>

            <Divider />

            {/* Personal note */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                Outside the Work
              </p>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                I take urban photography seriously as a practice of observation — the same quality
                of attention that makes a geopolitical analysis sharp also makes a photograph honest.
                I read broadly: political science, economic history, philosophy of mind, cliodynamics,
                technical theory. I am genuinely interested in the long run: what happens to
                institutions over centuries, how civilisations accumulate and lose the capacity to
                sustain themselves, and what it would take to detect those transitions early.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6">
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                Beliefs about systems
              </p>
              <ul className="space-y-3">
                {[
                  'Incentives explain more than intentions.',
                  'Institutions are crystallised power distributions.',
                  'Emergence is what happens when the model is incomplete.',
                  'Clarity precedes correctness.',
                  'The most dangerous assumption is the one no one questions.',
                  'A system you cannot understand you cannot safely depend on.',
                ].map((belief, i) => (
                  <li key={i} className="flex gap-3 text-sm text-stone-600 dark:text-stone-300">
                    <span className="text-stone-300 dark:text-stone-600 mt-0.5 shrink-0">—</span>
                    {belief}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6">
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                What kinds of problems
              </p>
              <ul className="space-y-3">
                {[
                  'Problems where the solution space is unclear',
                  'Systems where the output is hard to observe directly',
                  'Situations requiring reasoning across domains',
                  'Environments where most participants are reasoning shallowly',
                  'Problems with high analytical leverage',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-stone-600 dark:text-stone-300">
                    <span className="text-stone-300 dark:text-stone-600 mt-0.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-6">
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                Coordinates
              </p>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-stone-400">Institution</dt>
                  <dd className="text-stone-600 dark:text-stone-300">University of Southampton</dd>
                </div>
                <div>
                  <dt className="text-stone-400">Degree</dt>
                  <dd className="text-stone-600 dark:text-stone-300">PPE (Philosophy, Politics & Economics)</dd>
                </div>
                <div>
                  <dt className="text-stone-400">Location</dt>
                  <dd className="text-stone-600 dark:text-stone-300">Southampton, UK</dd>
                </div>
                <div>
                  <dt className="text-stone-400">GitHub</dt>
                  <dd className="text-stone-600 dark:text-stone-300">mrailouis</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

