import type { Metadata } from 'next'
import { Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Aspirations',
  description: 'Long-term direction and the kind of work worth doing.',
}

export default function AspirationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <section className="pt-20 pb-12 border-b border-stone-200">
        <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
          Aspirations
        </p>
        <h1 className="text-3xl md:text-4xl font-light text-stone-800 tracking-tight max-w-2xl">
          Towards the analysis and mitigation of serious global risk.
        </h1>
      </section>

      <Section>
        <div className="grid md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-10">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                Direction
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                My long-term aspiration is to work as a high-level geopolitical analyst, with
                particular focus on the preemptive detection and mitigation of serious political
                violence — including, but not limited to, organised terrorism and mass atrocities.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                This is not a romantic ambition. It is a systems analysis problem. The conditions
                that produce large-scale political violence are not arbitrary or purely idiosyncratic.
                They are structured: they emerge from the interaction of institutional failure,
                incentive misalignment, information asymmetry, and the commitment problems that
                make preventive intervention difficult.
              </p>
              <p className="text-stone-600 leading-relaxed">
                The question that motivates me is whether those conditions can be detected earlier,
                characterised more precisely, and addressed more effectively than current practice
                allows. I believe the answer is yes, and I believe the tools for doing so are partly
                analytical and partly technical.
              </p>
            </div>

            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                The Analytical Frame
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                Geopolitical risk analysis at its best is not narrative. It is a structured
                assessment of the conditions that make particular outcomes more or less probable.
                The relevant variables are not exotic: they include state capacity and legitimacy,
                economic stress and distributional conflict, information environments and the
                availability of extremist networks, and the presence or absence of effective
                international commitment mechanisms.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                These variables can be measured, tracked, and modelled — imperfectly, but usefully.
                Historical case analysis provides a basis for identifying patterns. Comparative
                analysis across contemporaneous cases allows calibration. Statistical methods can
                surface structural similarities that qualitative analysis might miss.
              </p>
              <p className="text-stone-600 leading-relaxed">
                The goal is not a prediction system. Prediction in complex social systems is neither
                reliable nor, at the policy-relevant margin, necessary. The goal is a detection
                system — one that identifies structural risk conditions early enough that preventive
                action is possible.
              </p>
            </div>

            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                The Technical Dimension
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                Analytical frameworks without technical implementation remain qualitative and
                subjective. The contribution I aim to make is in operationalising those frameworks:
                building tools that allow analysts to work with structured data, track indicators
                over time, run systematic comparisons, and surface non-obvious patterns.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                Peacemetrics is an early version of this ambition: a system that aggregates
                geopolitical indicators and allows configurable analysis. The conflict pattern
                analysis project is a more direct application: using historical datasets to identify
                structural preconditions that precede escalation.
              </p>
              <p className="text-stone-600 leading-relaxed">
                These are prototypes. The goal is a research and analytical infrastructure that
                supports serious work in this domain at an institutional level.
              </p>
            </div>

            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                What this requires
              </p>
              <ul className="space-y-3">
                {[
                  'Deep familiarity with the academic literature on conflict, terrorism, and political violence',
                  'Quantitative research methods and the ability to work with large, messy datasets',
                  'Technical capability to build the analytical tools the domain requires',
                  'Institutional access — research universities, policy institutions, intelligence-adjacent organisations',
                  'The patience to work on problems where feedback is slow and uncertainty is irreducible',
                  'The judgement to distinguish actionable signal from noise in high-stakes environments',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-stone-600">
                    <span className="text-stone-300 mt-0.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                A note on seriousness
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                Work in this domain carries a temptation towards grandiosity. The topics are serious,
                the stakes are real, and the vocabulary of national security and geopolitical risk can
                easily become a form of performance.
              </p>
              <p className="text-stone-600 leading-relaxed">
                I am attempting to resist that. The work I aspire to is unglamorous: careful data
                collection, rigorous analytical method, honest uncertainty quantification, and
                incremental progress on hard problems. The ambition is serious. The posture should
                be modest.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-stone-200 p-6">
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                Domain focus
              </p>
              <ul className="space-y-2 text-sm text-stone-600">
                {[
                  'Geopolitical risk analysis',
                  'Conflict early warning',
                  'Counter-terrorism analysis',
                  'Political violence prevention',
                  'Institutional resilience',
                  'Strategic pattern detection',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-stone-300 mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-stone-200 p-6">
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                Methods
              </p>
              <ul className="space-y-2 text-sm text-stone-600">
                {[
                  'Comparative case analysis',
                  'Quantitative indicator tracking',
                  'Historical pattern matching',
                  'Network and actor analysis',
                  'Structured analytical techniques',
                  'Computational modelling',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-stone-300 mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-stone-200 p-6">
              <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
                Current preparation
              </p>
              <ul className="space-y-2 text-sm text-stone-600">
                {[
                  'PPE — substantive domain knowledge',
                  'Systems engineering — technical capability',
                  'Peacemetrics — applied geopolitical modelling',
                  'Conflict pattern project — direct domain application',
                  'Reading — academic literature in conflict studies',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-stone-300 mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

