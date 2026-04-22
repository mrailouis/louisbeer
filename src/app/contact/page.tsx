import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'
import { Section } from '@/components/ui'
import { Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Louis Beer.',
}

const socials = [
  {
    label: 'Email',
    value: 'lrnbeer@gmail.com',
    href: 'mailto:lrnbeer@gmail.com',
    icon: 'email',
  },
  {
    label: 'GitHub',
    value: 'mrailouis',
    href: 'https://github.com/mrailouis',
    icon: 'github',
  },
  {
    label: 'YouTube',
    value: '@mrailouis',
    href: 'https://www.youtube.com/@mrailouis',
    icon: 'youtube',
  },
  {
    label: 'Twitch',
    value: 'mrailouis1',
    href: 'https://www.twitch.tv/mrailouis1',
    icon: 'twitch',
  },
  {
    label: 'osu!',
    value: 'mrailouis',
    href: 'https://osu.ppy.sh/users/24851764',
    icon: 'osu',
  },
  {
    label: 'Discord',
    value: '@lrnbeer',
    href: 'https://discord.com/users/lrnbeer',
    icon: 'discord',
  },
  {
    label: 'Instagram',
    value: '@llouisbeer',
    href: 'https://www.instagram.com/llouisbeer/',
    icon: 'instagram',
  },
]

// Brand colours for each icon
const brandColour: Record<string, string> = {
  email: '#6b7280',
  github: '#181717',
  youtube: '#FF0000',
  twitch: '#9146FF',
  osu: '#FF66AA',
  discord: '#5865F2',
  instagram: '#E4405F',
}

function getIconPath(slug: string): string | null {
  if (slug === 'email') return null
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const icons = require('simple-icons')
    const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`
    return icons[key]?.path ?? null
  } catch {
    return null
  }
}

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <section className="pt-20 pb-12 border-b border-stone-200 dark:border-stone-700">
        <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-4">Contact</p>
        <h1 className="text-3xl md:text-4xl font-light text-stone-800 dark:text-stone-100 tracking-tight max-w-2xl">
          Get in touch.
        </h1>
        <p className="mt-4 text-stone-500 dark:text-stone-400 max-w-xl leading-relaxed">
          For project enquiries, academic collaboration, or just to say hello.
        </p>
      </section>

      <Section>
        <div className="grid md:grid-cols-3 gap-16">
          {/* Form */}
          <div className="md:col-span-2">
            <ContactForm />
          </div>

          {/* Social links */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-stone-400 mb-6">
              Find me elsewhere
            </p>
            <ul className="space-y-4">
              {socials.map(({ label, value, href, icon }) => {
                const path = getIconPath(icon)
                const colour = brandColour[icon]
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-sm text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
                    >
                      <span
                        className="w-8 h-8 flex items-center justify-center rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 group-hover:border-stone-400 dark:group-hover:border-stone-500 transition-colors shrink-0"
                        style={{ color: colour }}
                      >
                        {path ? (
                          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-label={label}>
                            <path d={path} />
                          </svg>
                        ) : (
                          <Mail size={14} />
                        )}
                      </span>
                      <div>
                        <p className="text-xs text-stone-400 leading-none mb-0.5">{label}</p>
                        <p className="font-mono text-xs">{value}</p>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Section>
    </div>
  )
}

