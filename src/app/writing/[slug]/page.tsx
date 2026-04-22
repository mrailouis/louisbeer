import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { essays } from '@/lib/content'
import { Tag, Callout } from '@/components/ui'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return essays.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const essay = essays.find((e) => e.slug === slug)
  if (!essay) return {}
  return {
    title: essay.title,
    description: essay.summary,
  }
}

// Full essay content per slug
const essayContent: Record<string, string> = {
  'incentives-over-intentions': `
Policy failures rarely stem from bad intentions. Most policymakers, at least in democratic states, are
attempting to improve the conditions they govern. The persistence of failures — the welfare traps, the
perverse incentives, the unintended consequences — is not adequately explained by assuming malice or
incompetence.

The more parsimonious explanation is structural: the incentive environment facing actors within
institutional systems does not consistently reward the behaviours that would produce the stated
objectives. This is not a cynical observation. It is an architectural one.

## The Distinction

Intentions are the stated or genuine preferences of individuals. Incentives are the reward and
penalty structures that constrain and shape behaviour within a given institutional context. These
are analytically distinct, and the distinction matters.

A tax inspector who wants to be fair but is evaluated on the volume of penalties issued will, over
time, issue more penalties than strict fairness would require. Not because they have changed their
preferences, but because the institutional environment has selected for a particular behaviour
regardless of preferences.

This is not a pathological edge case. It is the ordinary condition of institutional life.

## Institutional Incentive Structures

Every institution encodes an incentive structure, whether deliberately or by accident. Hierarchies
reward upward signalling. Democracies reward positions that aggregate votes in the short run.
Markets reward profit regardless of how it is generated. These structural features shape behaviour
at scale, in ways that aggregate to collective outcomes no individual necessarily intended.

The lesson is not that institutions are bad. It is that the incentive structure of an institution
is a more reliable predictor of its outputs than the intentions of the individuals within it.

## The Policy Design Implication

If this analysis is correct, it changes what we should look for in policy evaluation. The relevant
question is not: do the people implementing this policy intend to achieve the stated outcome? The
relevant question is: does the incentive structure facing implementing actors consistently reward
behaviours that would produce that outcome?

These questions frequently have different answers.

## A Note on Reform

This framing has implications for institutional reform. Reforms that focus on changing personnel
without changing incentive structures will typically reproduce the behaviours of the previous
personnel. The institutional environment selects for behaviours; changing the people changes the
individuals but not the selection pressure.

Effective reform targets the incentive structure itself — which is harder, slower, and less visible
than personnel change, and therefore less politically attractive.

## Conclusion

Understanding institutions through their incentive structures rather than their stated purposes
is not a counsel of despair. It is a more accurate model. Accurate models are prerequisites for
effective intervention. The starting point for improving outcomes is understanding, clearly, why
the current outcomes exist.
  `,
  'modelling-conflict': `
Conflict is not irrational. This claim is not a defence of conflict, and it is not a claim that
the parties to a conflict are maximising some coherent utility function in a frictionless environment.
It is a structural observation: conflict, in the cases that concern us most, is the outcome of a
rational process — one that proceeds from interests, information constraints, and the failure of
alternative mechanisms.

Understanding why conflict is rational is the prerequisite for understanding how it might be
prevented.

## The Bargaining Model

The foundational insight in the economics of conflict comes from the bargaining literature. Two
parties who have incompatible claims over some resource — territory, policy, status — face a choice
between fighting and settling. Fighting is costly: it consumes resources, produces casualties, and
introduces uncertainty about the outcome. If both parties could identify the likely outcome of
fighting in advance, they would have a strong incentive to agree to that outcome without fighting,
capturing the surplus that would otherwise be destroyed by conflict.

This generates a puzzle: if conflict is costly and the outcome is probabilistically predictable,
why does it happen? The answer lies in the conditions under which bargaining fails.

## Why Bargaining Fails

Three failure modes dominate the academic literature, and each has empirical traction.

**Incomplete information** — parties do not know each other's true capabilities or resolve. Each
has incentives to misrepresent these. When the uncertainty is large enough, the expected value of
fighting exceeds the expected value of settling, because each party is optimistic about its
relative position.

**Commitment problems** — even if parties agree on a settlement, they may not be able to credibly
commit to it. A rising power and a declining power cannot credibly commit to a distribution of
resources today that will feel unfair to both once the power transition completes. This is the
classic preventive war mechanism.

**Indivisibility** — some resources are not easily divided. A capital city, a religious site, a
symbolic claim to sovereignty. When the object of dispute is indivisible, the bargaining space
collapses.

## The Implications for Analysis

The bargaining model does not tell us that conflict is always preventable. It tells us the
conditions under which prevention is possible: when information can be revealed, when commitment
mechanisms can be established, and when the disputed resource can be partitioned or compensated.

This is useful because it focuses attention on mechanism rather than character. The question is
not whether the parties are aggressive or peaceful; it is whether the structural conditions for
bargaining failure are present.

## From Economics to Geopolitics

Geopolitical analysis frequently operates with implicit versions of this framework without making
the structure explicit. Analysts talk about miscalculation, about credibility, about the difficulty
of partition — these are the core concepts of the bargaining model, expressed in a different
vocabulary.

Making the structure explicit has value. It makes the relevant variables legible, it permits
comparison across cases, and it creates the possibility of building tools that track the relevant
indicators — information asymmetries, commitment mechanisms, divisibility of disputed goods — rather
than simply narrating events.

## Conclusion

Conflict is rational in the sense that it is the predictable output of specific structural
conditions. The policy implication is that prevention is a design problem, not a psychology problem.
If we can identify the structural conditions that produce bargaining failure, we can work on the
mechanisms that address them.
  `,
  'systems-thinking-engineering': `
The vocabulary of systems thinking — feedback loops, emergence, attractors, path dependency — is
widely used in both engineering and the social sciences. Less often noticed is that the underlying
intellectual structure is the same in both contexts. The questions that systems thinking poses are
the same whether you are modelling an economy or a distributed software system.

This is not a metaphor. It is a structural observation that has practical consequences.

## The Common Questions

Both software architecture and institutional analysis are fundamentally concerned with:

- How does local behaviour aggregate to global outcomes?
- Where are the feedback loops, and are they stabilising or destabilising?
- What are the failure modes, and under what conditions do they activate?
- How does the system respond to perturbation?
- What are the invariants — the things that remain stable across changes in state?

A software engineer asking these questions about a distributed system is using the same analytical
tools as a political economist asking them about a market or a polity. The domain is different; the
structure of the inquiry is not.

## Emergence and Unintended Consequences

The concept of emergence — system-level properties that are not predictable from component-level
descriptions — is central to both fields. Software engineers encounter it when a system under load
exhibits behaviours that did not appear in testing. Political economists encounter it when policy
interventions produce outcomes that were not anticipated from the analysis of individual incentives.

In both cases, the lesson is the same: the model of the system is incomplete. Emergence is what
happens at the boundary of your understanding.

## Path Dependency

Path dependency — the claim that the current state of a system is a function of its history, not
just its current inputs — is a core concept in both institutional economics and software engineering.

Institutional economists use it to explain why inefficient institutions persist: the switching
costs of institutional change are high, and early choices constrain the feasible set of later ones.
Software engineers encounter the same phenomenon in legacy systems: the architecture of a ten-year-old
codebase shapes what changes are feasible today.

The implications for intervention are similar in both cases: path dependency does not mean change is
impossible, but it means that the order of operations matters, and that the costs of change are
often underestimated.

## The Engineering Implication

The value of recognising this overlap is practical. A software engineer who understands systems
thinking in the social science sense is better equipped to reason about the social systems their
software will interact with. A social scientist who understands software architecture has better
tools for making their theoretical models precise and testable.

The combination is more powerful than either alone — which is the argument for treating PPE and
software engineering not as adjacent disciplines but as overlapping ones.
  `,
  'on-reverse-engineering': `
Reverse engineering is commonly understood as a technical practice: taking a compiled binary,
a closed API, or an undocumented protocol and working backwards to a description of how it operates.
This is accurate but incomplete. Reverse engineering is also an epistemic stance — a mode of inquiry
that applies wherever systems operate opaquely.

## The Core Assumption

Reverse engineering begins with the assumption that the system does not want to be understood. This
is true of obfuscated code in the obvious sense. It is also true, in a weaker but important sense,
of any complex system that was not designed with comprehensibility as a primary objective.

Most real systems — political institutions, financial markets, large organisations, legacy codebases
— were not designed to be transparent. They accumulated. They were patched, modified, extended, and
repurposed in ways their original designers did not anticipate. The documentation, if it exists, is
incomplete. The people who understood the original design have left or forgotten.

To understand such a system, you have to reverse engineer it.

## Empirical Discovery Over Received Description

The defining feature of reverse engineering as an epistemic practice is its preference for empirical
discovery over received description. You do not trust the manual. You do not trust the official account.
You trust what you observe when you probe the system — what it does when you change inputs, what fails
when you remove components, what invariants hold under stress.

This is not cynicism about documentation. Documentation may be accurate. But it should be verified,
not assumed. The reverse engineer treats every description as a hypothesis to be tested, not an
authority to be deferred to.

## Authority and Opacity

Received descriptions of how systems operate often serve interests. Official accounts of institutions
describe them as they were designed to operate, not as they do operate. Corporate documentation describes
APIs as they are supposed to behave, not as they do behave under edge conditions. Political science
textbooks describe how constitutions work; working politicians describe how power is actually exercised.

The reverse engineer is not satisfied by official descriptions. This produces friction, and it should.
Friction with authority is the cost of genuine understanding.

## Limits

Reverse engineering has limits. Some systems are genuinely opaque, not because of deliberate concealment
but because their complexity exceeds the capacity of any individual to model. In these cases, the reverse
engineering approach yields partial models — accurate as far as they go, but not complete.

Acknowledging this is important. A partial model that is honest about its limits is more useful than a
complete model that is dishonest about its assumptions.

## Conclusion

Reverse engineering, understood as an epistemic practice, is the commitment to understand how systems
actually work rather than how they are described as working. Applied consistently, it produces less
comfortable but more accurate models. In an environment where opacity is common and received descriptions
often serve interests, that is a significant advantage.
  `,
  'the-geopolitics-of-data': `
Data is commonly understood as an economic resource. This framing is useful but insufficient. Data is
also a strategic resource — a basis for intelligence, for operational capability, and for structural
advantage in geopolitical competition. The implications of this are not widely understood, and the
policy environment has not caught up with the material reality.

## The Strategic Properties of Data

Unlike most economic goods, data has properties that make it unusual as a strategic resource.

It is non-rivalrous: the same dataset can be used simultaneously by multiple actors without depletion.
This means that the strategic value of data lies not in exclusive possession but in the differential
quality of access — having more, better, or earlier data than competitors.

It has network effects: the value of a dataset increases with the number of observations, with the
diversity of sources, and with the ability to correlate it with other datasets. This creates structural
advantages for actors who have achieved scale.

It is a feedstock for capability development: in the current technological environment, AI capabilities
are a function of training data. An actor with access to larger, more diverse, or more targeted datasets
can develop superior predictive and generative capabilities. Data advantage compounds into capability
advantage.

## The Concentration of Data Access

A small number of actors — primarily US-headquartered technology companies, with increasing competition
from Chinese platforms — have accumulated data positions that no government or research institution can
match. These positions were not accumulated through strategic intent, initially; they were the commercial
byproduct of providing services at scale.

The geopolitical significance has become clear as the dependency of AI development on data has become
apparent. States are now attempting to regulate, constrain, or replicate private data positions — with
limited success.

## Data Sovereignty as a Policy Response

The policy response that has attracted most attention is data sovereignty: the claim that data generated
within a jurisdiction should be subject to that jurisdiction's laws, and should not flow to foreign
jurisdictions without consent.

This is conceptually coherent but practically difficult. Data flows across borders continuously and at
scale, in ways that are difficult to monitor and even harder to enforce. The technical infrastructure
of the internet was not designed with sovereignty in mind.

More importantly, data sovereignty does not address the differential in data processing capabilities.
A state may control data flows across its borders and still lack the analytical capability to extract
value from that data comparable to a sophisticated foreign actor.

## The Long Run

The structural condition that matters in the long run is not who owns which data today, but which
actors can most effectively convert data into capability — analytical, operational, military. This is
a function not just of data access but of computational resources, algorithmic development, and the
human capital to exploit both.

States that understand this are investing in the full stack: data access, computational infrastructure,
and the scientific and engineering talent capable of translating data into capability. States that focus
only on data sovereignty as a regulatory question are addressing a real concern but missing the
strategically decisive one.

## Conclusion

Data is a strategic resource with unusual properties: non-rival, scalable, compounding, and foundational
for the development of AI capabilities. The geopolitics of data is therefore not a secondary question
— it is a first-order question about the structural bases of power in the coming decades. The analytical
frameworks for understanding it are just beginning to be developed.
  `,
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params
  const essay = essays.find((e) => e.slug === slug)

  if (!essay) notFound()

  const content = essayContent[slug] ?? essay.summary

  // Simple markdown-like rendering
  const sections = content.trim().split('\n\n').filter(Boolean)

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="pt-12 pb-6">
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700 transition-colors"
        >
          <ArrowLeft size={14} /> Writing
        </Link>
      </div>

      <div className="max-w-2xl">
        <div className="flex flex-wrap gap-2 mb-6">
          {essay.tags.map((t) => <Tag key={t} variant="muted">{t}</Tag>)}
        </div>
        <h1 className="text-2xl md:text-3xl font-light text-stone-800 tracking-tight leading-snug mb-4">
          {essay.title}
        </h1>
        <div className="flex items-center gap-4 text-xs text-stone-400 mb-12 pb-8 border-b border-stone-200">
          <span>{essay.date}</span>
          <span>{essay.readingTime}</span>
        </div>

        <div className="prose-like space-y-5">
          {sections.map((block, i) => {
            if (block.startsWith('## ')) {
              return (
                <h2 key={i} className="text-base font-medium text-stone-800 mt-10 mb-2">
                  {block.replace('## ', '')}
                </h2>
              )
            }
            if (block.startsWith('**') && block.endsWith('**')) {
              return (
                <p key={i} className="font-medium text-stone-700 leading-relaxed">
                  {block.replace(/\*\*/g, '')}
                </p>
              )
            }
            // Handle inline bold
            const parts = block.split(/(\*\*[^*]+\*\*)/)
            return (
              <p key={i} className="text-stone-600 leading-relaxed text-[0.95rem]">
                {parts.map((part, j) =>
                  part.startsWith('**') ? (
                    <strong key={j} className="font-medium text-stone-700">
                      {part.replace(/\*\*/g, '')}
                    </strong>
                  ) : (
                    part
                  )
                )}
              </p>
            )
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-stone-200">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700 transition-colors"
          >
            <ArrowLeft size={14} /> Back to writing
          </Link>
        </div>
      </div>
    </div>
  )
}

