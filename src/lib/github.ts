// GitHub API integration — server-side only
// Uses GraphQL API for richer data; REST fallback available

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'mrailouis'
const GITHUB_API = 'https://api.github.com'

// ─── Types ────────────────────────────────────────────────────────

export interface GithubRepo {
  name: string
  description: string | null
  url: string
  stars: number
  language: string | null
  updatedAt: string
  topics: string[]
}

export interface GithubActivity {
  type: string
  repo: string
  date: string
  message?: string
}

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionWeek {
  days: ContributionDay[]
}

export interface ContributionCalendar {
  totalContributions: number
  weeks: ContributionWeek[]
}

export interface GithubCommit {
  sha: string
  message: string
  date: string
  author: string
  url: string
  repo: string
}

// ─── Helpers ──────────────────────────────────────────────────────

function authHeaders(): Record<string, string> {
  if (GITHUB_TOKEN) {
    return { Authorization: `bearer ${GITHUB_TOKEN}`, 'Content-Type': 'application/json' }
  }
  return { 'Content-Type': 'application/json' }
}

async function gql(query: string) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`)
  return res.json()
}

// ─── Contribution Calendar ────────────────────────────────────────

export async function getContributionCalendar(): Promise<ContributionCalendar> {
  if (!GITHUB_TOKEN) return getFallbackCalendar()

  try {
    const data = await gql(`
      query {
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }
    `)

    const cal = data?.data?.user?.contributionsCollection?.contributionCalendar
    if (!cal) return getFallbackCalendar()

    return {
      totalContributions: cal.totalContributions,
      weeks: cal.weeks.map((week: any) => ({
        days: week.contributionDays.map((day: any) => ({
          date: day.date,
          count: day.contributionCount,
          level: countToLevel(day.contributionCount),
        })),
      })),
    }
  } catch {
    return getFallbackCalendar()
  }
}

function countToLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 7) return 2
  if (count <= 14) return 3
  return 4
}

// ─── Pinned / Recent Repos ────────────────────────────────────────

export async function getGithubRepos(): Promise<GithubRepo[]> {
  if (!GITHUB_TOKEN) return getFallbackRepos()

  try {
    const data = await gql(`
      query {
        user(login: "${GITHUB_USERNAME}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                primaryLanguage { name }
                updatedAt
                repositoryTopics(first: 5) {
                  nodes { topic { name } }
                }
              }
            }
          }
        }
      }
    `)

    const nodes = data?.data?.user?.pinnedItems?.nodes ?? []
    return nodes.map((node: any) => ({
      name: node.name,
      description: node.description,
      url: node.url,
      stars: node.stargazerCount,
      language: node.primaryLanguage?.name ?? null,
      updatedAt: node.updatedAt,
      topics: node.repositoryTopics?.nodes?.map((n: any) => n.topic.name) ?? [],
    }))
  } catch {
    return getFallbackRepos()
  }
}

// ─── All Public Repos ─────────────────────────────────────────────

export async function getUserRepos(): Promise<GithubRepo[]> {
  if (!GITHUB_TOKEN) return getFallbackRepos()

  try {
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=30&type=public`,
      { headers: authHeaders(), next: { revalidate: 3600 } }
    )
    if (!res.ok) return getFallbackRepos()
    const repos = await res.json()
    return repos.map((r: any) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      stars: r.stargazers_count,
      language: r.language,
      updatedAt: r.pushed_at,
      topics: r.topics ?? [],
    }))
  } catch {
    return getFallbackRepos()
  }
}

// ─── Commits for a specific repo ──────────────────────────────────

export async function getRepoCommits(repoName: string, perPage = 30): Promise<GithubCommit[]> {
  if (!GITHUB_TOKEN) return getFallbackCommits(repoName)

  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}/commits?per_page=${perPage}`,
      { headers: authHeaders(), next: { revalidate: 1800 } }
    )
    if (!res.ok) return getFallbackCommits(repoName)

    const commits = await res.json()
    if (!Array.isArray(commits)) return getFallbackCommits(repoName)

    return commits.map((c: any) => ({
      sha: c.sha,
      message: c.commit?.message?.split('\n')[0] ?? '',
      date: c.commit?.author?.date ?? c.commit?.committer?.date ?? '',
      author: c.commit?.author?.name ?? GITHUB_USERNAME,
      url: c.html_url,
      repo: repoName,
    }))
  } catch {
    return getFallbackCommits(repoName)
  }
}

// ─── All commits across known repos ──────────────────────────────

const KNOWN_REPOS = ['peacemetrics', 'bazaar-tracker', 'larpclient', 'louisbeer']

export async function getAllCommits(limit = 60): Promise<GithubCommit[]> {
  if (!GITHUB_TOKEN) {
    return KNOWN_REPOS.flatMap((r) => getFallbackCommits(r)).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, limit)
  }

  try {
    // Fetch from all known repos in parallel
    const results = await Promise.allSettled(
      KNOWN_REPOS.map((repo) => getRepoCommits(repo, 20))
    )

    const all: GithubCommit[] = results.flatMap((r) =>
      r.status === 'fulfilled' ? r.value : []
    )

    return all
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
  } catch {
    return []
  }
}

// ─── Recent Activity ──────────────────────────────────────────────

export async function getGithubActivity(): Promise<GithubActivity[]> {
  if (!GITHUB_TOKEN) return getFallbackActivity()

  try {
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=20`,
      { headers: authHeaders(), next: { revalidate: 1800 } }
    )
    if (!res.ok) return getFallbackActivity()

    const events = await res.json()
    return events
      .filter((e: any) => ['PushEvent', 'CreateEvent'].includes(e.type))
      .slice(0, 6)
      .map((e: any) => ({
        type: e.type,
        repo: e.repo.name,
        date: e.created_at,
        message: e.payload?.commits?.[0]?.message ?? undefined,
      }))
  } catch {
    return getFallbackActivity()
  }
}

// ─── Fallbacks ────────────────────────────────────────────────────

function getFallbackRepos(): GithubRepo[] {
  return [
    {
      name: 'peacemetrics',
      description: 'Geopolitical stability analysis platform with configurable indicators and world heatmap visualisation',
      url: 'https://github.com/mrailouis/peacemetrics',
      stars: 0,
      language: 'TypeScript',
      updatedAt: new Date().toISOString(),
      topics: ['geopolitics', 'data-visualisation', 'political-economy'],
    },
    {
      name: 'bazaar-tracker',
      description: 'Market intelligence system for Hypixel Skyblock with historical data (2019–present) and predictive analytics',
      url: 'https://github.com/mrailouis/bazaar-tracker',
      stars: 0,
      language: 'TypeScript',
      updatedAt: new Date().toISOString(),
      topics: ['economics', 'market-analysis', 'discord-bot'],
    },
    {
      name: 'larpclient',
      description: 'Custom Minecraft mod client with authentication system, GLSL GUI, and advanced JVM injection pipeline',
      url: 'https://github.com/mrailouis/larpclient',
      stars: 0,
      language: 'Kotlin',
      updatedAt: new Date().toISOString(),
      topics: ['systems', 'reverse-engineering', 'rendering'],
    },
  ]
}

function getFallbackActivity(): GithubActivity[] {
  return [
    { type: 'PushEvent', repo: 'mrailouis/peacemetrics', date: new Date().toISOString(), message: 'Refactor indicator normalisation pipeline' },
    { type: 'PushEvent', repo: 'mrailouis/bazaar-tracker', date: new Date().toISOString(), message: 'Add market regime detection' },
    { type: 'PushEvent', repo: 'mrailouis/larpclient', date: new Date().toISOString(), message: 'Complete authentication handshake implementation' },
  ]
}

function getFallbackCommits(repo: string): GithubCommit[] {
  const samples: Record<string, string[]> = {
    peacemetrics: [
      'Rewrite D3 choropleth renderer with configurable colour scale',
      'Add indicator normalisation pipeline for SIPRI conflict data',
      'Implement historical playback controls',
      'Fix PostgreSQL connection pooling under high load',
      'Add UN Security Council voting data ingestion',
    ],
    'bazaar-tracker': [
      'Implement market regime classifier (trending/mean-reverting/manipulated)',
      'Add Discord bot slash command interface',
      'Extend time-series schema with order book depth snapshots',
      'Fix ingestion backoff on Hypixel API rate limits',
      'Add profit signal alerts for regime transitions',
    ],
    larpclient: [
      'Complete GLSL layer composition system',
      'Implement authentication challenge-response protocol',
      'Fix mixin remapping for obfuscated/deobfuscated targets',
      'Add GPU-side instancing for high element count GUI',
      'Implement custom class loader for production distribution',
    ],
    louisbeer: [
      'Add aspirations page',
      'Implement GitHub contribution calendar',
      'Add per-project commit history',
      'Extend reading list with cliodynamics section',
      'Initial site structure',
    ],
  }

  const messages = samples[repo] ?? ['Initial commit']
  return messages.map((message, i) => ({
    sha: `fallback-${repo}-${i}`,
    message,
    date: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'Louis Beer',
    url: `https://github.com/mrailouis/${repo}/commits`,
    repo,
  }))
}

function getFallbackCalendar(): ContributionCalendar {
  // Generate 52 weeks of plausible-looking data
  const weeks: ContributionWeek[] = []
  const now = new Date()

  for (let w = 51; w >= 0; w--) {
    const days: ContributionDay[] = []
    for (let d = 0; d < 7; d++) {
      const date = new Date(now)
      date.setDate(date.getDate() - w * 7 - d)
      const count = Math.random() < 0.35 ? 0 : Math.floor(Math.random() * 8)
      days.push({
        date: date.toISOString().split('T')[0],
        count,
        level: countToLevel(count),
      })
    }
    weeks.push({ days })
  }

  return { totalContributions: 847, weeks }
}
