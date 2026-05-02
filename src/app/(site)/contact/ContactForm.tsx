'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [fields, setFields] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, message } = fields
    const subject = encodeURIComponent(`Message from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.open(`mailto:lrnbeer@gmail.com?subject=${subject}&body=${body}`)
    setSent(true)
  }

  const inputClass =
    'w-full px-4 py-3 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 text-stone-800 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-stone-500 dark:focus:border-stone-400 transition-colors'

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4 py-12">
        <CheckCircle size={28} className="text-emerald-500" />
        <p className="text-stone-700 dark:text-stone-200 font-medium">Your email client should have opened.</p>
        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-md">
          If it didn&apos;t, you can reach me directly at{' '}
          <a href="mailto:lrnbeer@gmail.com" className="underline hover:text-stone-800 dark:hover:text-white transition-colors">
            lrnbeer@gmail.com
          </a>.
        </p>
        <button
          onClick={() => { setSent(false); setFields({ name: '', email: '', message: '' }) }}
          className="mt-2 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors underline"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium tracking-widest uppercase text-stone-400 mb-2">
            Name
          </label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium tracking-widest uppercase text-stone-400 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={fields.email}
            onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium tracking-widest uppercase text-stone-400 mb-2">
          Message
        </label>
        <textarea
          required
          rows={8}
          placeholder="What would you like to say?"
          value={fields.message}
          onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
          className={`${inputClass} resize-none`}
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 text-sm bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-6 py-3 hover:bg-stone-700 dark:hover:bg-white transition-colors duration-200"
      >
        <Send size={14} /> Send message
      </button>
    </form>
  )
}

