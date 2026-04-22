# next-prompt.md — Continuation Notes for Louis Beer Website

## What has been implemented

### Framework & Architecture
- Next.js 15 with App Router, TypeScript, Tailwind CSS
- Server-first rendering throughout — all data fetching is server-side
- Modular component system: `Nav`, `Footer`, `ui.tsx` (Section, SectionHeader, Tag, StatusBadge, Callout, Divider)
- Strongly typed content model in `src/lib/content.ts` — projects, essays, updates, reading, systems
- GitHub API integration in `src/lib/github.ts` — GraphQL for pinned repos, REST for activity, graceful fallback

### Pages
- `/` — Full homepage with hero, intro, featured projects, writing preview, GitHub activity, updates
- `/about` — Narrative-driven about page with beliefs sidebar
- `/projects` — Project index with featured and secondary sections
- `/projects/[slug]` — Rich individual project pages with architecture, technical breakdown, challenges, systems notes
- `/writing` — Essay index with featured and full list
- `/writing/[slug]` — Individual essay pages with full content (5 complete essays written)
- `/updates` — Timeline changelog
- `/aspirations` — Long-form aspirations page covering geopolitical analysis and conflict detection
- `/now` — Current priorities, reading, lines of inquiry
- `/systems` — Active models and prototypes
- `/reading` — Annotated reading list by category
- `/photography` — Photography grid with placeholder images

### SEO & Infrastructure
- Root metadata with Open Graph and Twitter cards
- Per-page metadata on all routes
- `sitemap.ts` — dynamic sitemap covering all routes
- `robots.ts` — search engine configuration
- `.env.local.example` — environment variable documentation

---

## What is deferred / next steps

### Priority 1 — Content & Content Management

**Photography images**
The photography page uses placeholder divs. Add real images to `/public/photography/` and update the grid to use `next/image`. The data structure in `content.ts` supports `src` field — just add it and update the component.

**MDX integration**
Essays are currently stored as inline strings in the `[slug]/page.tsx` file. For production, migrate to:
1. Install `@next/mdx` and configure in `next.config.ts`
2. Create `src/content/writing/` directory with `.mdx` files
3. Use `gray-matter` for frontmatter parsing
4. Replace the inline content map with file system reads via `fs/promises`

This unlocks:
- Easier content editing
- Full Markdown/MDX feature set (code blocks, callouts, images, math)
- Metadata from frontmatter
- Automatic reading time via `reading-time` package

### Priority 2 — Design Refinements

**Typography system**
Currently using Inter (system sans). For the editorial reading experience, add a serif typeface for essay body text. Suggested approach:
- Add `Lora` via `next/font/google` in layout
- Apply `font-serif` class to essay body content
- Keep Inter for all interface elements

**Dark mode**
The design tokens are set up for clean dark mode. Approach:
- Add `darkMode: 'class'` to Tailwind config
- Create `ThemeToggle` client component
- Wrap with class on `<html>` using `localStorage`

**Hover animations**
Currently using `transition-colors` throughout. For subtle motion polish:
- Add `transition-all duration-200 ease-in-out` to interactive cards
- Consider `framer-motion` for the homepage hero staggered entry (very subtle)

### Priority 3 — GitHub Integration

**Activate live data**
1. Create a GitHub Personal Access Token with `read:user` and `public_repo` scopes
2. Copy `.env.local.example` to `.env.local`
3. Add your token value
4. The GraphQL query fetches pinned repositories; you'll need to pin the relevant repos on GitHub

**Contribution graph**
The GitHub API provides contribution data via GraphQL. A contribution heatmap component would add
a credible evidence signal to the homepage. Implementation:
```typescript
// Query to add to getGithubRepos or a new function
query {
  user(login: "mrailouis") {
    contributionsCollection {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
```

### Priority 4 — Analytics

For Cloudflare deployment, Cloudflare Web Analytics is zero-config and privacy-respecting.
Add the script tag to `layout.tsx` once deployed.

For more detailed analytics (page performance, reading engagement), consider:
- Plausible Analytics — privacy-first, self-hostable
- Vercel Analytics — if moving to Vercel hosting

### Priority 5 — Search

When writing grows, add search:
- `flexsearch` for client-side full-text search over essay content
- Or a dedicated search route using the content index

---

## Deployment — Cloudflare Pages

### Steps
1. Push to GitHub: `mrailouis/louisbeer`
2. Connect to Cloudflare Pages
3. Framework preset: Next.js
4. Build command: `npm run build`
5. Output directory: `.next`
6. Add environment variables: `GITHUB_TOKEN`, `GITHUB_USERNAME`

### Cloudflare-specific notes
- Use `@cloudflare/next-on-pages` adapter if deploying to Cloudflare Workers (edge runtime)
- Or deploy to Cloudflare Pages with Node.js runtime (simpler, recommended for this project)
- Images: consider Cloudflare Images for the photography section

### Domain configuration
Point `louisbeer.net` DNS to Cloudflare Pages project once deployed.

---

## Project structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout with Nav/Footer
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Base styles
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── about/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── writing/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── updates/page.tsx
│   ├── aspirations/page.tsx
│   ├── now/page.tsx
│   ├── systems/page.tsx
│   ├── reading/page.tsx
│   └── photography/page.tsx
├── components/
│   ├── Nav.tsx                 # Sticky navigation with mobile menu
│   ├── Footer.tsx              # Site footer
│   └── ui.tsx                  # Design system primitives
└── lib/
    ├── cn.ts                   # Class utility
    ├── content.ts              # All typed content data
    └── github.ts               # GitHub API integration
```

---

## Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority, zod
- **Content**: Inline TypeScript objects (MDX migration deferred)
- **API**: GitHub REST + GraphQL with fallback
- **Deployment target**: Cloudflare Pages
- **Package manager**: npm

---

## Content extension guide

### Adding a project
In `src/lib/content.ts`, add to the `projects` array:
```typescript
{
  slug: 'my-project',
  title: 'My Project',
  summary: '...',
  problem: '...',
  what: '...',
  stack: ['TypeScript', 'Next.js'],
  tags: ['systems', 'data'],
  featured: false,
  status: 'active',
  year: 2025,
}
```

Then add a `projectContent` entry in `src/app/projects/[slug]/page.tsx`.

### Adding an essay
In `src/lib/content.ts`, add to the `essays` array. Then add content to `essayContent` in `src/app/writing/[slug]/page.tsx`.

For MDX migration: create `src/content/writing/my-essay.mdx` with frontmatter.

### Adding a photo
Update `photos` array in `src/app/photography/page.tsx` and add images to `/public/photography/`.

