import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllEssayMeta, getEssayMeta, getEssayContent } from '@/lib/mdx'
import { Tag } from '@/components/ui'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ')

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const essays = await getAllEssayMeta()
  return essays.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const essay = await getEssayMeta(slug)
  if (!essay) return {}
  return {
    title: essay.title,
    description: essay.summary,
  }
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="text-base font-semibold font-sans text-stone-800 dark:text-stone-100 mt-10 mb-3 tracking-tight" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="text-sm font-semibold font-sans text-stone-700 dark:text-stone-200 mt-6 mb-2" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="text-stone-700 dark:text-stone-300 leading-[1.85] text-[1rem] mb-0" />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="italic text-stone-700 dark:text-stone-300" />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="font-semibold text-stone-800 dark:text-stone-200" />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} className="text-slate-600 dark:text-slate-400 underline underline-offset-2 hover:text-stone-900 dark:hover:text-white transition-colors" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote {...props} className="border-l-2 border-stone-300 dark:border-stone-600 pl-4 text-stone-500 dark:text-stone-400 italic my-4" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="list-disc list-inside space-y-1 text-stone-700 dark:text-stone-300" />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="list-decimal list-inside space-y-1 text-stone-700 dark:text-stone-300" />
  ),
  hr: () => <hr className="border-stone-200 dark:border-stone-700 my-8" />,
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params
  const [essay, content] = await Promise.all([
    getEssayMeta(slug),
    getEssayContent(slug),
  ])

  if (!essay || !content) notFound()

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="pt-12 pb-6">
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
        >
          <ArrowLeft size={14} /> Writing
        </Link>
      </div>

      <div className="max-w-2xl">
        <div className="flex flex-wrap gap-2 mb-6">
          {essay.tags.map((t) => <Tag key={t} variant="muted">{cap(t)}</Tag>)}
        </div>
        <h1 className="text-2xl md:text-3xl font-light text-stone-800 dark:text-stone-100 tracking-tight leading-snug mb-4">
          {essay.title}
        </h1>
        <div className="flex items-center gap-4 text-xs text-stone-400 mb-12 pb-8 border-b border-stone-200 dark:border-stone-700">
          <span>{essay.date}</span>
          <span>{essay.readingTime}</span>
        </div>

        <article className="font-serif space-y-5">
          <MDXRemote source={content} components={mdxComponents} />
        </article>

        <div className="mt-16 pt-8 border-t border-stone-200 dark:border-stone-700">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <ArrowLeft size={14} /> Back to writing
          </Link>
        </div>
      </div>
    </div>
  )
}
