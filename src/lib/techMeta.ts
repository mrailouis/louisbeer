// Tech brand colours and simple-icons slugs
// Brand colours sourced from official brand guidelines / simple-icons
export interface TechMeta {
  color: string        // hex, used for the icon fill and badge tint
  icon: string         // simple-icons slug (matches si<Slug> export)
  label?: string       // override display label if different from key
}

const tech: Record<string, TechMeta> = {
  // Languages
  Kotlin:       { color: '#7F52FF', icon: 'kotlin' },
  Java:         { color: '#ED8B00', icon: 'openjdk' },
  TypeScript:   { color: '#3178C6', icon: 'typescript' },
  JavaScript:   { color: '#F7DF1E', icon: 'javascript' },
  Python:       { color: '#3776AB', icon: 'python' },
  GLSL:         { color: '#5586A4', icon: 'opengl' },
  Rust:         { color: '#CE412B', icon: 'rust' },
  Go:           { color: '#00ACD7', icon: 'go' },

  // Frameworks / runtimes
  'Next.js':    { color: '#000000', icon: 'nextdotjs' },
  React:        { color: '#61DAFB', icon: 'react' },
  'Node.js':    { color: '#339933', icon: 'nodedotjs' },
  'Discord.js': { color: '#5865F2', icon: 'discord' },

  // Styling
  'Tailwind CSS': { color: '#06B6D4', icon: 'tailwindcss' },

  // Databases
  PostgreSQL:   { color: '#4169E1', icon: 'postgresql' },
  Redis:        { color: '#DC382D', icon: 'redis' },
  MongoDB:      { color: '#47A248', icon: 'mongodb' },

  // Data / ML
  'D3.js':      { color: '#F9A03C', icon: 'd3dotjs' },
  'Chart.js':   { color: '#FF6384', icon: 'chartdotjs' },
  pandas:       { color: '#150458', icon: 'pandas' },
  'scikit-learn': { color: '#F7931E', icon: 'scikitlearn' },

  // Build / tooling
  Gradle:       { color: '#02303A', icon: 'gradle' },
  Docker:       { color: '#2496ED', icon: 'docker' },
  Git:          { color: '#F05032', icon: 'git' },

  // JVM / Minecraft ecosystem
  Mixin:        { color: '#ED8B00', icon: 'openjdk' },     // no dedicated icon, use JVM
  LWJGL:        { color: '#ED8B00', icon: 'openjdk' },
}

export function getTechMeta(name: string): TechMeta | null {
  return tech[name] ?? null
}

// Returns a light tinted background colour for a given hex
export function hexToAlpha(hex: string, alpha = 0.1): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

