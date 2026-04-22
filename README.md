# louisbeer.net

Personal website of Louis Beer — PPE student at the University of Southampton.

Built at the intersection of political economy, geopolitical analysis, and systems-level software engineering.

## Stack

- **Framework** — Next.js 15 (App Router, static export)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4
- **Animations** — Framer Motion
- **Icons** — Lucide React
- **Deployment** — Cloudflare Pages

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.local.example` to `.env.local` and add your GitHub personal access token:

```
GITHUB_TOKEN=your_token_here
GITHUB_USERNAME=mrailouis
```

## Deployment

Deploys automatically to Cloudflare Pages on push to `main`.

- Build command: `npm run build`
- Output directory: `out`
