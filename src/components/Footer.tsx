import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-stone-200 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-sm text-stone-500">
            Louis Beer — PPE &amp; Systems Engineering
          </p>
          <p className="text-xs text-stone-400 mt-1">
            University of Southampton · louisbeer.net
          </p>
        </div>

        <nav className="flex flex-wrap gap-6">
          {[
            { href: '/about', label: 'About' },
            { href: '/projects', label: 'Projects' },
            { href: '/writing', label: 'Writing' },
            { href: '/aspirations', label: 'Aspirations' },
            { href: '/updates', label: 'Updates' },
            { href: '/photography', label: 'Photography' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-stone-400 hover:text-stone-700 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-stone-400">© {year}</p>
      </div>
    </footer>
  )
}

