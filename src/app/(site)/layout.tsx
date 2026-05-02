import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

interface Props {
  children: React.ReactNode
}

export default function SiteLayout({ children }: Props) {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-14">{children}</main>
      <Footer />
    </>
  )
}
