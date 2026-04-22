'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'
import { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/systems', label: 'Systems' },
  { href: '/reading', label: 'Reading' },
  { href: '/now', label: 'Now' },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-900 border-b border-stone-700">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-medium tracking-wide text-white hover:text-stone-300 transition-colors"
        >
          Louis Beer
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'text-sm px-3 py-1.5 rounded transition-colors',
                  isActive(href)
                    ? 'text-white bg-stone-700'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/search"
            aria-label="Search"
            className={cn(
              'text-stone-400 hover:text-white transition-colors p-1.5 rounded',
              pathname === '/search' && 'text-white bg-stone-700'
            )}
          >
            <Search size={16} />
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Link href="/search" aria-label="Search" className="text-stone-400 hover:text-white transition-colors p-1.5">
            <Search size={16} />
          </Link>
          <ThemeToggle />
          <button
            className="text-stone-400 hover:text-white transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-stone-700 bg-stone-900 px-6 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block text-sm px-3 py-2 rounded transition-colors',
                    isActive(href)
                      ? 'text-white bg-stone-700'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}


