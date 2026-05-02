import type { Metadata } from 'next'
import { Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Photography',
  description: 'Urban photography and visual observation.',
}

const photos = [
  { id: 1, caption: 'Southampton Civic Centre, morning', location: 'Southampton, UK', year: '2025' },
  { id: 2, caption: 'Old Market Hall interior', location: 'Southampton, UK', year: '2025' },
  { id: 3, caption: 'Bargate — civic space, low light', location: 'Southampton, UK', year: '2024' },
  { id: 4, caption: 'West Quay periphery', location: 'Southampton, UK', year: '2024' },
  { id: 5, caption: 'Abandoned freight terminal', location: 'Southampton Docks, UK', year: '2024' },
  { id: 6, caption: 'Terraced housing, afternoon', location: 'Portswood, UK', year: '2024' },
]

// Subtle tones for placeholder compositions
const tones = [
  'bg-stone-300',
  'bg-stone-350',
  'bg-zinc-300',
  'bg-stone-400',
  'bg-zinc-350',
  'bg-stone-300',
]

export default function PhotographyPage() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <section className="pt-20 pb-12 border-b border-stone-200">
        <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">
          Photography
        </p>
        <h1 className="text-3xl md:text-4xl font-light text-stone-800 tracking-tight max-w-2xl">
          Urban observation.
        </h1>
        <p className="mt-4 text-stone-500 max-w-xl leading-relaxed">
          Documentary-adjacent photography. Civic space, ordinary infrastructure, the texture
          of places that are not typically photographed. Attention is a transferable skill.
        </p>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-300">
          {photos.map((photo, idx) => (
            <div key={photo.id} className="group bg-stone-200">
              <div className="aspect-[4/3] bg-stone-300 relative overflow-hidden">
                {/* Elegant placeholder — filmstrip-style numbered frame */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[3rem] font-light text-stone-400/40 leading-none select-none">
                    {String(photo.id).padStart(2, '0')}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-mono text-stone-500 bg-stone-200/80 px-1.5 py-0.5">
                    {photo.year}
                  </span>
                </div>
              </div>
              <div className="p-3 border-t border-stone-300">
                <p className="text-xs text-stone-700 leading-snug">{photo.caption}</p>
                <p className="text-[11px] text-stone-400 mt-1 font-mono">{photo.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-stone-300 bg-white p-8">
          <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-3">
            On the practice
          </p>
          <p className="text-sm text-stone-600 leading-relaxed max-w-2xl">
            Photography, for me, is a practice of structured attention — looking at something
            closely enough to see what is actually there rather than what you expect to see.
            This is the same skill that makes careful reading useful, or systematic analysis
            productive. The subject matter tends towards civic space, ordinary infrastructure,
            and the built environment of places that carry significant social meaning without
            being visually spectacular.
          </p>
          <p className="text-xs text-stone-400 mt-4 font-mono">Images to be added shortly.</p>
        </div>
      </Section>
    </div>
  )
}

