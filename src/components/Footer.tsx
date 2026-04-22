import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-stone-900 border-t border-stone-700 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-sm text-stone-300">
            Louis Beer — PPE &amp; Systems Engineering
          </p>
          <p className="text-xs text-stone-500 mt-1">
            University of Southampton · louisbeer.net
          </p>
        </div>

        <nav className="flex flex-wrap gap-6">
          {[
            { href: '/aspirations', label: 'Aspirations' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-stone-500 hover:text-stone-200 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-stone-600">© {year}</p>
      </div>
    </footer>
  )
}
