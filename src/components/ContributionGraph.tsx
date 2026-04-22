'use client'

import { ContributionCalendar } from '@/lib/github'
import { cn } from '@/lib/cn'

const levelClasses: Record<number, string> = {
  0: 'bg-stone-100',
  1: 'bg-emerald-200',
  2: 'bg-emerald-400',
  3: 'bg-emerald-600',
  4: 'bg-emerald-800',
}

const DAYS = ['Mon', '', 'Wed', '', 'Fri', '', '']

interface Props {
  calendar: ContributionCalendar
}

export function ContributionGraph({ calendar }: Props) {
  const months = getMonthLabels(calendar.weeks)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium tracking-widest uppercase text-stone-400">
          Contribution activity
        </p>
        <p className="text-xs text-stone-400 font-mono">
          {calendar.totalContributions.toLocaleString()} contributions in the last year
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          {/* Month labels */}
          <div className="flex gap-[3px] mb-1 pl-8">
            {months.map((label, i) => (
              <div
                key={i}
                className="text-[10px] text-stone-400 font-mono"
                style={{ width: label.width * 11 + (label.width - 1) * 3 }}
              >
                {label.name}
              </div>
            ))}
          </div>

          <div className="flex gap-[3px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] mr-1">
              {DAYS.map((day, i) => (
                <div key={i} className="h-[10px] w-7 text-[9px] text-stone-400 font-mono leading-[10px]">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid */}
            {calendar.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.days.map((day, di) => (
                  <div
                    key={di}
                    title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                    className={cn(
                      'w-[10px] h-[10px] rounded-[2px] transition-opacity hover:opacity-70 cursor-default',
                      levelClasses[day.level]
                    )}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="text-[10px] text-stone-400">Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={cn('w-[10px] h-[10px] rounded-[2px]', levelClasses[level])}
              />
            ))}
            <span className="text-[10px] text-stone-400">More</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Utility: derive month label positions from week data ─────────

interface MonthLabel {
  name: string
  width: number // in weeks
}

function getMonthLabels(weeks: ContributionCalendar['weeks']): MonthLabel[] {
  const labels: MonthLabel[] = []
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  let currentMonth = -1
  let currentLabel: MonthLabel | null = null

  for (const week of weeks) {
    const firstDay = week.days.find((d) => d.date)
    if (!firstDay) continue
    const month = new Date(firstDay.date).getMonth()

    if (month !== currentMonth) {
      if (currentLabel) labels.push(currentLabel)
      currentLabel = { name: monthNames[month], width: 1 }
      currentMonth = month
    } else {
      if (currentLabel) currentLabel.width++
    }
  }

  if (currentLabel) labels.push(currentLabel)
  return labels
}

