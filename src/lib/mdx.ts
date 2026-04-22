import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const CONTENT_DIR = path.join(process.cwd(), 'src/content/writing')

export interface EssayFrontmatter {
  title: string
  summary: string
  date: string
  tags: string[]
  featured?: boolean
}

export interface EssayMeta extends EssayFrontmatter {
  slug: string
  readingTime: string
}

export async function getEssayMeta(slug: string): Promise<EssayMeta | null> {
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, `${slug}.mdx`), 'utf-8')
    const { data, content } = matter(raw)
    const stats = readingTime(content)
    return {
      slug,
      title: data.title,
      summary: data.summary,
      date: data.date,
      tags: data.tags ?? [],
      featured: data.featured ?? false,
      readingTime: stats.text,
    }
  } catch {
    return null
  }
}

export async function getAllEssayMeta(): Promise<EssayMeta[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR)
    const slugs = files.filter((f) => f.endsWith('.mdx')).map((f) => f.replace('.mdx', ''))
    const metas = await Promise.all(slugs.map(getEssayMeta))
    return (metas.filter(Boolean) as EssayMeta[]).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  } catch {
    return []
  }
}

export async function getEssayContent(slug: string): Promise<string | null> {
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, `${slug}.mdx`), 'utf-8')
    const { content } = matter(raw)
    return content
  } catch {
    return null
  }
}

