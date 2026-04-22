import { z } from 'zod'

// ─── Project Schema ───────────────────────────────────────────────
export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  problem: z.string(),
  what: z.string(),
  stack: z.array(z.string()),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
  status: z.enum(['live', 'active', 'archived', 'concept', 'prototype']),
  year: z.number(),
  link: z.string().optional(),
  github: z.string().optional(),
})

export type Project = z.infer<typeof ProjectSchema>

// ─── Essay Schema ─────────────────────────────────────────────────
export const EssaySchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
  readingTime: z.string().optional(),
})

export type Essay = z.infer<typeof EssaySchema>

// ─── Update Schema ────────────────────────────────────────────────
export const UpdateSchema = z.object({
  date: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(['release', 'milestone', 'note', 'project']),
})

export type Update = z.infer<typeof UpdateSchema>

// ─── Reading Schema ───────────────────────────────────────────────
export const ReadingItemSchema = z.object({
  title: z.string(),
  author: z.string(),
  category: z.string(),
  note: z.string().optional(),
  status: z.enum(['reading', 'read', 'reference']),
})

export type ReadingItem = z.infer<typeof ReadingItemSchema>

// ─── System Schema ────────────────────────────────────────────────
export const SystemSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(['active', 'prototype', 'conceptual', 'paused']),
  tags: z.array(z.string()),
})

export type System = z.infer<typeof SystemSchema>

// ─── Projects Data ────────────────────────────────────────────────
export const projects: Project[] = [
  {
    slug: 'larpclient',
    title: 'LarpClient',
    summary:
      'A fully custom Minecraft mod client built with Kotlin, featuring a bespoke authentication system, webserver integration, code obfuscation pipeline, and shader-driven GUI rendered in GLSL.',
    problem:
      'Standard Minecraft modding frameworks provide no clean abstraction for authentication, custom rendering pipelines, or reliable injection into both obfuscated and deobfuscated Minecraft bytecode simultaneously. Achieving feature parity with commercial clients required building infrastructure from scratch.',
    what:
      'LarpClient is a production-grade Minecraft mod client that combines low-level JVM injection with a high-level Kotlin feature layer. It includes a custom HTTP authentication server, a code obfuscation pipeline for distribution, a GLSL shader-driven GUI system, and a custom loader that bridges obfuscated and deobfuscated method references via mixin remapping.',
    stack: ['Kotlin', 'Java', 'GLSL', 'Mixin', 'Gradle', 'Node.js', 'LWJGL'],
    tags: ['systems', 'reverse-engineering', 'jvm', 'rendering', 'authentication'],
    featured: true,
    status: 'archived',
    year: 2024,
  },
  {
    slug: 'peacemetrics',
    title: 'Peacemetrics',
    summary:
      'A geopolitical analysis platform that aggregates UN Security Council voting records, economic indicators, and conflict datasets into a configurable world heatmap model for stability and risk assessment.',
    problem:
      'Existing geopolitical dashboards either reduce complex situations to opaque risk scores, or present raw data without interpretive structure. There is no accessible tool that allows a researcher to configure weighted criteria — trade dependency, democratic backsliding, conflict adjacency — and observe the resulting global pattern.',
    what:
      'Peacemetrics ingests structured data from multiple international sources, normalises indicators across different scales and reporting cadences, and renders a configurable world heatmap. Users can adjust the relative weighting of political, economic, and conflict variables to explore how different analytical frameworks produce different risk landscapes.',
    stack: ['Next.js', 'TypeScript', 'Python', 'PostgreSQL', 'D3.js', 'Tailwind CSS'],
    tags: ['geopolitics', 'data', 'modelling', 'visualisation', 'political-economy'],
    featured: true,
    status: 'active',
    year: 2024,
  },
  {
    slug: 'bazaar-tracker',
    title: 'Bazaar Tracker',
    summary:
      'A market intelligence system for the Hypixel Skyblock bazaar economy, combining a long-running data ingestion pipeline (2019–present) with trend analysis, predictive signals, and a Discord bot interface.',
    problem:
      'Bazaar markets exhibit high-frequency volatility driven by player behaviour, patch events, and seasonal patterns. Without historical data and signal extraction, profitable positions are indistinguishable from noise. Most publicly available tools offer only current snapshots.',
    what:
      'Bazaar Tracker maintains a continuous time-series database of item prices, order book states, and volume metrics. A set of analytical routines identify trend breakpoints, liquidity conditions, and historical analogues. The Discord bot exposes this analysis in a structured, query-driven interface accessible to end users.',
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Discord.js', 'Next.js', 'Chart.js'],
    tags: ['economics', 'market-systems', 'data', 'prediction', 'discord'],
    featured: true,
    status: 'archived',
    year: 2022,
  },
  {
    slug: 'systems-modelling-toolkit',
    title: 'Systems Modelling Toolkit',
    summary:
      'A collection of composable modelling primitives for analysing institutional behaviour, incentive structures, and emergent dynamics in political and economic systems.',
    problem:
      'Systems thinking as practised in PPE contexts is often qualitative and imprecise. Translating structural arguments about institutions, incentives, and feedback loops into quantitative or computational form requires tooling that does not yet exist at an accessible level.',
    what:
      'A set of typed, composable modelling primitives built in TypeScript that allow formal representation of actors, incentives, rules, and feedback mechanisms. Intended as a foundation for building simulation environments around specific political or economic scenarios.',
    stack: ['TypeScript', 'Node.js', 'React', 'D3.js'],
    tags: ['systems', 'modelling', 'political-economy', 'simulation'],
    featured: false,
    status: 'concept',
    year: 2025,
  },
  {
    slug: 'conflict-pattern-analysis',
    title: 'Conflict Pattern Analysis',
    summary:
      'An ongoing research project applying pattern detection techniques to historical conflict datasets to identify structural preconditions and escalation dynamics.',
    problem:
      'Most conflict analysis is retrospective. The academic literature on early warning systems is rich but computationally underexplored. Systematic pattern matching across historical cases could surface signatures that precede escalation.',
    what:
      'A structured pipeline for ingesting conflict event datasets (ACLED, UCDP), extracting temporal features, and running comparative analysis across historical cases to identify structural similarities between developing situations and past escalation sequences.',
    stack: ['Python', 'pandas', 'scikit-learn', 'PostgreSQL', 'Next.js'],
    tags: ['conflict', 'geopolitics', 'pattern-detection', 'data', 'analysis'],
    featured: false,
    status: 'prototype',
    year: 2025,
  },
]

// ─── Essays Data ──────────────────────────────────────────────────
export const essays: Essay[] = [
  {
    slug: 'are-there-truths-you-should-not-assert',
    title: 'Are There Some Truths You Should Not Assert?',
    summary:
      'Truth alone is not sufficient to license assertion. When asserting a true proposition would misrepresent one\'s epistemic position or foreseeably mislead an audience, that truth ought not to be asserted.',
    date: '2025-03-10',
    tags: ['philosophy', 'epistemology', 'language'],
    featured: true,
    readingTime: '8 min read',
  },
  {
    slug: 'foot-killing-and-letting-die',
    title: 'Does Foot Succeed in Establishing a Moral Distinction Between Killing and Letting Die?',
    summary:
      'Philippa Foot argues that actively initiating harm carries greater moral weight than failing to prevent it. The distinction is persuasive as an account of moral agency, but insufficient as a decisive principle.',
    date: '2025-02-14',
    tags: ['philosophy', 'ethics', 'moral-philosophy'],
    featured: true,
    readingTime: '10 min read',
  },
  {
    slug: 'do-colours-exist',
    title: 'Do Colours Exist?',
    summary:
      'Naïve realism, eliminativism, and dispositionalism each offer distinct answers to the metaphysical status of colour. Dispositionalism — colours as powers of objects to produce experiences — offers the most defensible account.',
    date: '2025-01-28',
    tags: ['philosophy', 'metaphysics', 'perception'],
    featured: false,
    readingTime: '9 min read',
  },
  {
    slug: 'corruption-and-republican-thought',
    title: 'Why Is the Problem of Corruption So Central to Republican Thought?',
    summary:
      'Corruption is not merely a moral problem for republicans — it is a structural one. It erodes civic virtue, enables elite capture of institutions, and thereby converts self-governance into domination.',
    date: '2024-12-05',
    tags: ['politics', 'republicanism', 'political-theory'],
    featured: false,
    readingTime: '9 min read',
  },
  {
    slug: 'gandhi-non-violence',
    title: "Gandhi's Argument for Non-Violence: Ethical and Pragmatic?",
    summary:
      'Gandhi\'s defence of non-violence is ethically coherent within his conception of freedom as self-rule, and pragmatically effective under specific conditions of imperial rule — though not universally so.',
    date: '2024-11-18',
    tags: ['politics', 'ethics', 'political-philosophy'],
    featured: false,
    readingTime: '11 min read',
  },
  {
    slug: 'allison-cuban-missile-crisis',
    title: "Graham Allison's Three Models and the Cuban Missile Crisis",
    summary:
      'Of Allison\'s three models of foreign policy decision-making, the bureaucratic politics model best explains the Cuban Missile Crisis — revealing how competing actors within the US government shaped the final outcome.',
    date: '2024-10-20',
    tags: ['politics', 'international-relations', 'foreign-policy'],
    featured: false,
    readingTime: '10 min read',
  },
]

// ─── Updates Data ─────────────────────────────────────────────────
export const updates: Update[] = [
  {
    date: '2025-04-01',
    title: 'Peacemetrics heatmap renderer v2',
    description:
      'Rewrote the D3 visualisation layer to support configurable weighting of geopolitical indicators. Improved data normalisation pipeline.',
    category: 'release',
  },
  {
    date: '2025-03-10',
    title: 'Published: Incentives over Intentions',
    description: 'First major essay published to the writing section.',
    category: 'milestone',
  },
  {
    date: '2025-02-20',
    title: 'LarpClient authentication system complete',
    description:
      'Custom HTTP authentication server and client-side handshake protocol fully implemented and tested.',
    category: 'project',
  },
  {
    date: '2025-01-15',
    title: 'Conflict Pattern Analysis prototype initialised',
    description:
      'ACLED dataset ingestion pipeline operational. Initial feature extraction routines under development.',
    category: 'project',
  },
  {
    date: '2024-12-01',
    title: 'Bazaar Tracker historical dataset milestone',
    description:
      'Data pipeline now maintains continuous records from 2019 to present. Predictive routines running in background.',
    category: 'milestone',
  },
  {
    date: '2024-10-15',
    title: 'Began PPE at University of Southampton',
    description: 'Started undergraduate study in Philosophy, Politics, and Economics.',
    category: 'milestone',
  },
]

// ─── Reading Data ─────────────────────────────────────────────────
export const reading: ReadingItem[] = [
  {
    title: 'The Origins of Political Order',
    author: 'Francis Fukuyama',
    category: 'Political Science',
    note: 'The most rigorous account of how stable institutions emerge from statelessness. Essential reading for understanding path dependency.',
    status: 'read',
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: 'Behavioural Economics',
    note: 'The empirical foundation of modern behavioural economics. Useful less for its conclusions than for its methodology.',
    status: 'read',
  },
  {
    title: 'Complexity: A Guided Tour',
    author: 'Melanie Mitchell',
    category: 'Systems Science',
    note: 'A rigorous but accessible treatment of emergence, feedback, and complex adaptive systems.',
    status: 'reading',
  },
  {
    title: 'Governing the Commons',
    author: 'Elinor Ostrom',
    category: 'Political Economy',
    note: 'Empirical demolition of the standard tragedy-of-the-commons narrative. Important for institutional analysis.',
    status: 'read',
  },
  {
    title: 'The Art of War',
    author: 'Sun Tzu',
    category: 'Strategy',
    status: 'read',
  },
  {
    title: 'The Precipice',
    author: 'Toby Ord',
    category: 'Philosophy',
    note: 'A serious treatment of existential risk that takes the long run seriously without becoming millenarian.',
    status: 'read',
  },
  {
    title: 'Debt: The First 5000 Years',
    author: 'David Graeber',
    category: 'Political Economy',
    note: 'Provocative revisionist history of credit and obligation. Useful for interrogating assumed economic foundations.',
    status: 'reading',
  },
  {
    title: 'Structure and Interpretation of Computer Programs',
    author: 'Abelson & Sussman',
    category: 'Computer Science',
    note: 'The canonical text on computational thinking. Highly relevant to understanding programs as systems.',
    status: 'reference',
  },
  {
    title: 'War and Peace and War',
    author: 'Peter Turchin',
    category: 'Cliodynamics',
    note: 'Quantitative modelling of historical cycles. A rare attempt to bring rigour to grand historical narrative.',
    status: 'reading',
  },
  {
    title: 'The Entrepreneurial State',
    author: 'Mariana Mazzucato',
    category: 'Political Economy',
    status: 'read',
  },
]

// ─── Systems Data ─────────────────────────────────────────────────
export const systems: System[] = [
  {
    title: 'Peacemetrics Stability Index',
    description:
      'A configurable composite index that aggregates UN voting patterns, conflict adjacency, economic volatility, and democratic backsliding indicators into a single, weighted stability score per country. The model is designed to be epistemically transparent — every weight is exposed, and the scoring logic is auditable.',
    status: 'active',
    tags: ['geopolitics', 'data', 'modelling'],
  },
  {
    title: 'Institutional Incentive Mapper',
    description:
      'A typed modelling framework for representing the incentive structures of political and economic institutions. Given a set of actors, rules, and payoff conditions, the system outputs likely equilibrium behaviours and identifies structural points of instability.',
    status: 'prototype',
    tags: ['systems', 'institutions', 'modelling'],
  },
  {
    title: 'Conflict Precondition Classifier',
    description:
      'An ML pipeline trained on ACLED and UCDP conflict datasets to identify structural similarities between current geopolitical conditions and historical precursors to large-scale escalation. Not a predictive oracle — a structured similarity search.',
    status: 'prototype',
    tags: ['conflict', 'pattern-detection', 'ml'],
  },
  {
    title: 'Bazaar Market Regime Detector',
    description:
      'A time-series analysis routine that classifies Hypixel Skyblock bazaar items into market regime states — trending, mean-reverting, illiquid, manipulated — and triggers alerts when regime transitions are detected.',
    status: 'active',
    tags: ['economics', 'market-systems', 'signal-processing'],
  },
  {
    title: 'LarpClient Rendering Pipeline',
    description:
      'A GLSL shader-driven GUI system embedded within a Minecraft mod client. The pipeline manages layer composition, transform hierarchies, and event routing for a fully custom in-game interface — bypassing the standard Minecraft GUI entirely.',
    status: 'active',
    tags: ['rendering', 'systems', 'glsl'],
  },
]

