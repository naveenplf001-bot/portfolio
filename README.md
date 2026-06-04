# Portfolio — Static Version

A **fully static** build of the portfolio website. It looks and behaves exactly
like the original dynamic site, but has **no database, no backend APIs, no admin
panel, and no authentication**. All content is served from a bundled static data
file and pre-rendered to plain HTML/CSS/JS.

> The original dynamic project (in the parent folder) is left completely untouched.
> Everything for the static site lives inside this `portfolio_static/` folder.

---

## How it works

| Original (dynamic)                                   | This static version                                  |
| ---------------------------------------------------- | ---------------------------------------------------- |
| PostgreSQL database (`pg`)                            | Removed                                              |
| `/api/portfolio` + `/api/projects/[id]` API routes   | Removed                                              |
| `/admin/**` panel + JWT/bcrypt auth                  | Removed                                              |
| Homepage `fetch('/api/portfolio')`                   | `getPortfolioData()` reading `src/data/portfolio.json` |
| Detail page `query('SELECT … FROM projects')`        | `getProject()` / `getRelatedProjects()` (static)     |
| Server-rendered on each request                      | `output: 'export'` — pre-rendered static HTML        |

The content in [`src/data/portfolio.json`](src/data/portfolio.json) was migrated
1:1 from the **live database** (settings, projects, skills, social links,
reviews, team) at build time. To change content, edit that JSON file and rebuild.

All UI, layout, styling, Tailwind design system, animations (scroll reveal,
parallax, magnetic, tilt, cursor glow, marquees, counters), responsiveness, and
SEO metadata are preserved verbatim from the original components.

---

## Run it

```bash
npm install

# Local development (hot reload)
npm run dev          # http://localhost:3000

# Produce the static site into ./out
npm run build

# Preview the built static site on a plain static server
npm run preview      # serves ./out via `npx serve`
```

After `npm run build`, the `out/` folder is a self-contained static site you can
host anywhere — GitHub Pages, Netlify, Vercel (static), S3/CloudFront, nginx, or
any plain file server. No Node server, PostgreSQL, or environment variables are
required.

### Viewing from another device (phone / tablet) on your network

`npm run dev` is for `localhost`. If you open the **dev** server from another
device via your machine's LAN IP (e.g. `http://192.168.68.118:3000`), Next.js
blocks its dev JavaScript by default — the page loads but every section below the
hero stays **blank** because nothing hydrates. Two options:

1. **Recommended for cross-device testing:** view the built static site instead —
   it has no such restriction:
   ```bash
   npm run build && npm run preview     # then open http://<your-LAN-IP>:3000
   ```
2. **To use `npm run dev` over the LAN:** add your machine's LAN IP to
   `allowedDevOrigins` in `next.config.ts` (one entry is already set as an
   example) and **restart `npm run dev`**.

---

## Structure

```
portfolio_static/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout, fonts, SEO metadata
│   │   ├── globals.css                # Tailwind + full custom design system
│   │   ├── page.tsx                   # Homepage (reads static data)
│   │   └── projects/[id]/page.tsx     # Project detail (generateStaticParams)
│   ├── components/                    # Copied verbatim from the original
│   │   ├── WorkSection.tsx
│   │   ├── Footer.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── AdvancedEffects.tsx
│   │   └── ImageCarousel.tsx
│   ├── data/
│   │   └── portfolio.json             # Migrated database content (the data source)
│   ├── lib/
│   │   └── portfolio.ts               # Static data-access layer (replaces db.ts)
│   └── types.ts                       # Shared TypeScript interfaces
├── public/                            # Static assets (svgs, uploaded images)
├── next.config.ts                     # output: 'export', images unoptimized
├── package.json                       # Only next/react/tailwind — no db/auth deps
└── tsconfig.json
```
