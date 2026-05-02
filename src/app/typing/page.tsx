import type { Metadata } from 'next'
import { TypingTest } from './TypingTest'

export const metadata: Metadata = {
  title: 'Typing',
  description: 'A minimal typing test for typing.louisbeer.net.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function TypingPage() {
  return <TypingTest />
}
