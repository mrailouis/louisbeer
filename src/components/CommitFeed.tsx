import { GithubCommit } from '@/lib/github'
import { GitCommitHorizontal, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/cn'

interface CommitFeedProps {
  commits: GithubCommit[]
  showRepo?: boolean
  limit?: number
  compact?: boolean
}

const repoColours: Record<string, string> = {
  peacemetrics: 'text-blue-600 bg-blue-50 border-blue-200',
  'bazaar-tracker': 'text-amber-600 bg-amber-50 border-amber-200',
  larpclient: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  louisbeer: 'text-violet-600 bg-violet-50 border-violet-200',
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function timeAgo(iso: string): string {
  if (!iso) return ''
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 86400 * 30) return `${Math.floor(seconds / 86400)}d ago`
  return formatDate(iso)
}

export function CommitFeed({ commits, showRepo = true, limit, compact = false }: CommitFeedProps) {
  const shown = limit ? commits.slice(0, limit) : commits

  if (shown.length === 0) {
    return (
      <p className="text-sm text-stone-400 py-4">No commits found.</p>
    )
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[11px] top-3 bottom-3 w-px bg-stone-200" />

      <div className={cn('space-y-0', compact ? '' : '')}>
        {shown.map((commit, i) => (
          <div key={commit.sha + i} className="flex gap-4 group relative">
            {/* Node */}
            <div className="relative mt-3 shrink-0">
              <div className="w-[22px] h-[22px] rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center group-hover:border-stone-400 transition-colors z-10 relative">
                <GitCommitHorizontal size={10} className="text-stone-400" />
              </div>
            </div>

            {/* Content */}
            <div className={cn('flex-1 pb-4', compact ? 'pb-3' : 'pb-5')}>
              {showRepo && (
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={cn(
                      'text-[10px] px-2 py-0.5 rounded border font-mono',
                      repoColours[commit.repo] ?? 'text-stone-500 bg-stone-100 border-stone-200'
                    )}
                  >
                    {commit.repo}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {timeAgo(commit.date)}
                  </span>
                </div>
              )}

              <div className="flex items-start gap-2">
                <p className={cn(
                  'text-stone-700 leading-snug flex-1',
                  compact ? 'text-xs' : 'text-sm'
                )}>
                  {commit.message}
                </p>
                {commit.url && !commit.sha.startsWith('fallback') && (
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-stone-300 hover:text-stone-600 transition-colors mt-0.5"
                    aria-label="View commit on GitHub"
                  >
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>

              {!showRepo && (
                <p className="text-[10px] text-stone-400 font-mono mt-1">
                  {timeAgo(commit.date)} · {commit.sha.startsWith('fallback') ? '' : commit.sha.slice(0, 7)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

