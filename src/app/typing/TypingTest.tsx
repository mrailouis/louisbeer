'use client'

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'

const WORD_POOL = [
  'signal', 'market', 'policy', 'vector', 'reason', 'system', 'memory', 'engine',
  'domain', 'theory', 'timing', 'syntax', 'render', 'kernel', 'method', 'typing',
  'stable', 'random', 'format', 'packet', 'thread', 'static', 'runtime', 'metric',
  'absorb', 'silver', 'planet', 'candle', 'impact', 'sudden', 'travel', 'vision',
  'border', 'future', 'object', 'figure', 'screen', 'motion', 'manual', 'branch',
]

type WordState = 'idle' | 'correct' | 'incorrect' | 'active'

interface CandlePoint {
  index: number
  low: number
  high: number
  open: number
  close: number
}

function shuffleWords() {
  const pool = [...WORD_POOL]
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, 10)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getWordState(word: string, typed: string, active: boolean): WordState {
  if (active) return 'active'
  if (!typed) return 'idle'
  return typed === word ? 'correct' : 'incorrect'
}

function buildCandles(wordTimings: number[]): CandlePoint[] {
  if (wordTimings.length === 0) return []

  const samples = wordTimings.map((ms) => 60000 / (ms / 5))
  const candles: CandlePoint[] = []

  for (let i = 0; i < samples.length; i += 2) {
    const chunk = samples.slice(i, i + 2)
    const previous = candles[candles.length - 1]?.close ?? chunk[0]
    candles.push({
      index: candles.length,
      low: Math.min(...chunk),
      high: Math.max(...chunk),
      open: previous,
      close: chunk[chunk.length - 1],
    })
  }

  return candles
}

function getConsistency(wordTimings: number[]) {
  if (wordTimings.length < 2) return 100

  const mean = wordTimings.reduce((sum, value) => sum + value, 0) / wordTimings.length
  const variance =
    wordTimings.reduce((sum, value) => sum + (value - mean) ** 2, 0) / wordTimings.length
  const deviation = Math.sqrt(variance)
  return clamp(Math.round(100 - (deviation / mean) * 100), 0, 100)
}

function formatMetric(value: number) {
  if (!Number.isFinite(value)) return '0'
  return value.toFixed(1)
}

export function TypingTest() {
  const [words, setWords] = useState<string[]>(() => shuffleWords())
  const [typedWords, setTypedWords] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [completedAt, setCompletedAt] = useState<number | null>(null)
  const [wordTimings, setWordTimings] = useState<number[]>([])
  const [liveNow, setLiveNow] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const wordStartRef = useRef<number | null>(null)

  const hostState = useSyncExternalStore(
    () => () => {},
    () => {
      const host = window.location.hostname
      return {
        ready: true,
        allowed: host === 'typing.louisbeer.net' || host === 'localhost' || host === '127.0.0.1',
      }
    },
    () => ({ ready: false, allowed: false })
  )

  const currentIndex = typedWords.length
  const isFinished = currentIndex >= words.length

  const resetTest = () => {
    setWords(shuffleWords())
    setTypedWords([])
    setCurrentInput('')
    setStartedAt(null)
    setCompletedAt(null)
    setWordTimings([])
    setLiveNow(null)
    wordStartRef.current = null
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault()
        resetTest()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!startedAt || completedAt) return

    const interval = window.setInterval(() => {
      setLiveNow(performance.now())
    }, 150)

    return () => window.clearInterval(interval)
  }, [completedAt, startedAt])

  const handleChange = (value: string) => {
    if (isFinished) return

    if (!startedAt && value.length > 0) {
      const now = performance.now()
      setStartedAt(now)
      setLiveNow(now)
      wordStartRef.current = now
    }

    setCurrentInput(value)
  }

  const commitWord = () => {
    if (isFinished || !currentInput.trim()) return

    const now = performance.now()
    if (wordStartRef.current !== null) {
      setWordTimings((prev) => [...prev, now - wordStartRef.current!])
    }

    const nextTyped = [...typedWords, currentInput.trim()]
    setTypedWords(nextTyped)
    setCurrentInput('')
    wordStartRef.current = now

    if (nextTyped.length === words.length) {
      setCompletedAt(now)
      inputRef.current?.blur()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      event.preventDefault()
      commitWord()
    }
  }

  const stats = useMemo(() => {
    const endTime = completedAt ?? liveNow ?? startedAt ?? 0
    const elapsedMs = startedAt ? Math.max(endTime - startedAt, 1) : 0
    const elapsedMinutes = elapsedMs / 60000

    const typedText = [...typedWords, currentInput].join(' ').trim()
    const rawChars = typedText.length

    let correctChars = 0
    let incorrectWords = 0

    typedWords.forEach((typed, index) => {
      const target = words[index] ?? ''
      if (typed === target) {
        correctChars += target.length
      } else {
        incorrectWords += 1
      }
    })

    const rawWpm = elapsedMinutes > 0 ? rawChars / 5 / elapsedMinutes : 0
    const wpm = elapsedMinutes > 0 ? correctChars / 5 / elapsedMinutes : 0
    const charsPerMin = elapsedMinutes > 0 ? correctChars / elapsedMinutes : 0
    const consistency = getConsistency(wordTimings)
    const accuracy =
      typedWords.length > 0
        ? ((typedWords.length - incorrectWords) / typedWords.length) * 100
        : 100
    const adjusted = wpm * (accuracy / 100)

    return {
      rawWpm,
      wpm,
      charsPerMin,
      consistency,
      adjusted,
    }
  }, [completedAt, currentInput, liveNow, startedAt, typedWords, wordTimings, words])

  const candles = useMemo(() => buildCandles(wordTimings), [wordTimings])

  if (!hostState.ready) {
    return <div className="min-h-screen bg-[#5f5f5f]" />
  }

  if (!hostState.allowed) {
    return (
      <div
        className="min-h-screen bg-[#5f5f5f] text-white flex items-center justify-center px-6"
        style={{ fontFamily: '"JetBrainsMono Nerd Font", "JetBrainsMono NFM", "JetBrains Mono", monospace' }}
      >
        <p className="text-sm text-white/70">This page is only available on typing.louisbeer.net.</p>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-[#5f5f5f] text-white"
      style={{ fontFamily: '"JetBrainsMono Nerd Font", "JetBrainsMono NFM", "JetBrains Mono", monospace' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/45">
          <span>Typing Test</span>
          <span>Tab = new test</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/12 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
          <div className="mb-8 flex flex-wrap gap-x-4 gap-y-5 text-3xl leading-relaxed md:text-4xl">
            {words.map((word, index) => {
              const typed = typedWords[index] ?? ''
              const active = index === currentIndex && !isFinished
              const state = getWordState(word, typed, active)

              return (
                <span
                  key={`${word}-${index}`}
                  className={
                    state === 'correct'
                      ? 'text-white'
                      : state === 'incorrect'
                        ? 'text-red-300'
                        : state === 'active'
                          ? 'text-white/90 underline decoration-white/40 underline-offset-8'
                          : 'text-white/35'
                  }
                >
                  {active && currentInput ? (
                    <span>
                      <span className="text-white">{currentInput}</span>
                      <span className="text-white/35">{word.slice(currentInput.length)}</span>
                    </span>
                  ) : (
                    word
                  )}
                </span>
              )
            })}
          </div>

          <input
            ref={inputRef}
            value={currentInput}
            onChange={(event) => handleChange(event.target.value.replace(/\s+/g, ''))}
            onKeyDown={handleKeyDown}
            disabled={isFinished}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="sr-only"
            aria-label="Typing test input"
          />

          <div className="mb-8 rounded-xl border border-white/10 bg-black/10 p-4">
            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-white/45">Consistency</div>
            <svg viewBox="0 0 520 160" className="h-40 w-full">
              <line x1="0" y1="140" x2="520" y2="140" className="stroke-white/10" />
              {candles.length === 0 && (
                <text x="260" y="84" textAnchor="middle" className="fill-white/35 text-[12px]">
                  Complete words to plot pace candles
                </text>
              )}
              {candles.map((candle, index) => {
                const max = Math.max(...candles.map((item) => item.high), 1)
                const min = Math.min(...candles.map((item) => item.low), max)
                const scale = (value: number) => {
                  if (max === min) return 70
                  return 140 - ((value - min) / (max - min)) * 110
                }

                const x = 44 + index * 96
                const openY = scale(candle.open)
                const closeY = scale(candle.close)
                const highY = scale(candle.high)
                const lowY = scale(candle.low)
                const bodyTop = Math.min(openY, closeY)
                const bodyHeight = Math.max(Math.abs(openY - closeY), 6)
                const rising = candle.close >= candle.open

                return (
                  <g key={candle.index}>
                    <line x1={x} y1={highY} x2={x} y2={lowY} className="stroke-white/55" strokeWidth="2" />
                    <rect
                      x={x - 20}
                      y={bodyTop}
                      width="40"
                      height={bodyHeight}
                      rx="3"
                      className={rising ? 'fill-white/70' : 'fill-white/25'}
                    />
                  </g>
                )
              })}
            </svg>
          </div>

          <div className="grid gap-3 text-sm md:grid-cols-5">
            {[
              ['WPM', formatMetric(stats.wpm)],
              ['Chars/min', formatMetric(stats.charsPerMin)],
              ['Consistency', `${stats.consistency}%`],
              ['Raw WPM', formatMetric(stats.rawWpm)],
              ['Adjusted', formatMetric(stats.adjusted)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                <div className="mb-1 text-[11px] uppercase tracking-[0.2em] text-white/45">{label}</div>
                <div className="text-xl text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
