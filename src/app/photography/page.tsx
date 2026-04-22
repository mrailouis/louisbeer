import type { Metadata } from 'next'
import { Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Photography',
  description: 'Urban photography and visual observation.',
}

// Placeholder photo data — replace with real images
const photos = [
  { id: 1, caption: 'Southampton Civic Centre, morning', location: 'Southampton, UK', year: '2025' },
  { id: 2, caption: 'Old Market Hall interior', location: 'Southampton, UK', year: '2025' },
  { id: 3, caption: 'Bargate — civic space, low light', location: 'Southampton, UK', year: '2024' },
  { id: 4, caption: 'West Quay periphery', location: 'Southampton, UK', year: '2024' },
  { id: 5, caption: 'Abandoned freight terminal', location: 'Southampton Docks, UK', year: '2024' },
  { id: 6, caption: 'Terraced housing, afternoon', location: 'Portswood, UK', year: '2024' },
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
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group">
              {/* Placeholder image */}
              <div className="aspect-[4/3] bg-stone-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-stone-400 text-xs font-mono">
                  {photo.id.toString().padStart(2, '0')}
                </div>
                {/* 
                  Replace the div above with:
                  <Image
                    src={`/photography/${photo.id}.jpg`}
                    alt={photo.caption}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                */}
              </div>
              <div className="mt-2 px-0.5">
                <p className="text-xs text-stone-600">{photo.caption}</p>
                <p className="text-xs text-stone-400 mt-0.5">{photo.location} · {photo.year}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-stone-200 p-8">
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
        </div>
      </Section>
    </div>
  )
}

