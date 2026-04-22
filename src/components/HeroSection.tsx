'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

export function HeroSection() {
  return (
    <section className="pt-24 pb-20 md:pt-32 md:pb-28 border-b-2 border-stone-300 dark:border-stone-700">
      <motion.div
        className="max-w-3xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="text-xs font-medium tracking-widest uppercase text-slate-500 dark:text-stone-400 mb-6"
        >
          Louis Beer
        </motion.p>
        <motion.h1
          variants={item}
          className="text-4xl md:text-5xl font-light text-stone-900 dark:text-stone-100 tracking-tight leading-tight mb-6"
        >
          Ethical and political economy,<br />
          geopolitical systems,<br />
          and software engineering.
        </motion.h1>
        <motion.p
          variants={item}
          className="text-lg text-stone-500 dark:text-stone-400 leading-relaxed max-w-2xl"
        >
          Politics, Philosophy and Economics student at the University of Southampton.
          I study political, economic, and institutional systems — and build software
          implementations of those ideas.
        </motion.p>
        <motion.div variants={item} className="flex flex-wrap gap-4 mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-5 py-2.5 hover:bg-stone-700 dark:hover:bg-white transition-colors duration-200"
          >
            Projects <ArrowRight size={14} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300 border border-stone-400 dark:border-stone-600 bg-white dark:bg-transparent px-5 py-2.5 hover:border-stone-600 dark:hover:border-stone-400 hover:text-stone-800 dark:hover:text-stone-100 transition-colors duration-200"
          >
            About
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
