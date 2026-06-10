# Vision Grid — Portfolio (Static Site)

A **fully static** build of the Vision Grid portfolio/agency site. It looks and
behaves like the original dynamic site, but has **no database, no backend APIs,
no admin panel, and no authentication**. All content is served from a bundled
static data file and pre-rendered to plain HTML/CSS/JS, then hosted on Netlify.

> This is the **public artifact**. Content is authored in a separate, private
> dynamic CMS (Postgres + admin) that never goes online — see
> [Updating content](#updating-content) below.

---

## The two projects

| | Path | Role |
| --- | --- | --- |
| **Static site** (this repo) | `C:\Projects\portfolio-live\portfolio` | Public site. Deploys to Netlify from `main`. |
| **Dynamic CMS** (separate repo) | `C:\Projects\Portfolio\portfolio-website` | Private, local-only. Postgres + admin panel. The "content factory". |

The dynamic project is your editing tool; this static project is what the world
sees. They are **separate git repositories** in unrelated folders despite the
similar names.

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

All UI, layout, styling, Tailwind design system, animations (scroll reveal,
parallax, magnetic, tilt, cursor glow, marquees, counters), responsiveness, and
SEO metadata are preserved from the original.

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

After `npm run build`, the `out/` folder is a self-contained static site.

### Viewing from another device (phone / tablet) on your network

`npm run dev` is for `localhost`. If you open the **dev** server from another
device via your machine's LAN IP, Next.js blocks its dev JavaScript by default —
the page loads but sections below the hero stay blank because nothing hydrates.
Either view the built site (`npm run build && npm run preview`), or add your
LAN IP to `allowedDevOrigins` in `next.config.ts` and restart `npm run dev`.
This setting has **no effect** on the production static export.

---

## Updating content

Content is **not** edited by hand here. It is exported from the dynamic CMS:

1. Edit content in the local admin (`C:\Projects\Portfolio\portfolio-website`,
   `npm run dev` → `/admin`).
2. In that dynamic project, run the exporter:
   ```bash
   npm run export:data
   ```
   This reads Postgres, writes `src/data/portfolio.json` in **this** repo, and
   copies `public/uploads` over. Its output target defaults to
   `../../portfolio-live/portfolio`; override with `STATIC_OUTPUT_DIR`.
3. Commit & push **this** repo:
   ```bash
   git add -A && git commit -m "update portfolio content" && git push
   ```
4. Netlify rebuilds automatically.

> ⚠️ **Do not hand-edit `src/data/portfolio.json` or `public/uploads`** and
> expect it to stick — the next `export:data` overwrites them from the DB. For
> permanent content changes, edit in the admin/DB and re-export.

---

## Deployment (Netlify)

This repo auto-deploys to Netlify on every push to `main`
(GitHub remote `naveenplf001-bot/portfolio`):

- **Build command:** `npm run build`
- **Publish directory:** `out`

No `netlify.toml` is committed — the build/publish settings live in the Netlify
dashboard. (Don't add one without matching `publish = "out"`, or it will
override the working dashboard config.)

### Contact form

The contact form is a native **Netlify Form** (no backend, no JS). Netlify's
build bot detects it in the exported HTML (via `data-netlify="true"` and the
hidden `form-name` field) and captures submissions under **Forms → contact** in
the dashboard. Enable email/Slack alerts there under **Form notifications**.

---

## Branding

- Brand name: **Vision Grid** (sourced from `settings.hero_name`).
- Logo mark: `public/logo-mark.png` — the circular V-mark shown in the navbar
  and project-page headers, cropped/downscaled (256×256) from the full banner
  in `assets/logo.png`.

---

## Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout, fonts, SEO metadata (<title> = Vision Grid)
│   │   ├── globals.css                # Tailwind + full custom design system
│   │   ├── page.tsx                   # Homepage — composes the section components
│   │   └── projects/[id]/page.tsx     # Project detail (generateStaticParams)
│   ├── components/
│   │   ├── sections/                  # Homepage sections (server components)
│   │   │   ├── Navbar.tsx             #   logo header
│   │   │   ├── Hero.tsx  HeroVisual.tsx
│   │   │   ├── Industries.tsx  Services.tsx  StatsBand.tsx
│   │   │   ├── Skills.tsx  Reviews.tsx  TrustBadges.tsx
│   │   │   └── Team.tsx  Contact.tsx  # Contact = Netlify Form
│   │   ├── WorkSection.tsx            # Projects grid (client; "view more")
│   │   ├── Footer.tsx
│   │   ├── ScrollReveal.tsx           # ScrollReveal, Parallax, Magnetic, AnimatedCounter, TiltCard
│   │   ├── AdvancedEffects.tsx        # CursorGlow, SpotlightCard, TextReveal, ScrollProgress, ImageReveal, FloatingParticles
│   │   └── ImageCarousel.tsx
│   ├── data/
│   │   └── portfolio.json             # Content (generated by the CMS exporter — do not hand-edit)
│   ├── lib/
│   │   └── portfolio.ts               # Static data-access layer + hasRealImage() helper
│   └── types.ts                       # Shared TypeScript interfaces
├── public/
│   ├── logo-mark.png                  # Brand logo (navbar / headers)
│   └── uploads/                       # Uploaded images/videos (synced by the exporter)
├── next.config.ts                     # output: 'export', images unoptimized, trailingSlash
├── package.json
└── tsconfig.json
```

### Notes on the homepage refactor

`page.tsx` is a thin composition root: it reads the data and renders each
section in order. Every section in `components/sections/` is a **server
component** that receives only the props it needs and composes the client-side
animation islands (`CursorGlow`, `Parallax`, etc.) — no `"use client"` on the
sections themselves.
