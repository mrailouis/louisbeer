import type { MetadataRoute } from 'next'
import { projects, essays } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://louisbeer.net'

  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/writing',
    '/updates',
    '/aspirations',
    '/now',
    '/systems',
    '/reading',
    '/photography',
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const essayRoutes = essays.map((e) => ({
    url: `${base}/writing/${e.slug}`,
    lastModified: new Date(e.date),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes, ...essayRoutes]
}

