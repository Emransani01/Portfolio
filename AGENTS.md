<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio (`my-portfolio`)

Personal portfolio site for Emran, a full-stack web developer. A single-page
landing with anchor-linked sections plus a per-project detail route. The pages
are statically rendered; the only server code is the contact form endpoint.

The git repo lives in this directory (the workspace root above it is not a repo).

## Stack

- Next.js 16.4.3 — App Router, Turbopack, React Compiler enabled
- React 19.3
- TypeScript (strict), path alias `@/*` → `src/*`
- Tailwind CSS v4 via `@tailwindcss/turbopack` (no `tailwind.config.*`; theme
  tokens live in `src/app/globals.css` under `@theme`)
- `next/font` Inter (`--font-inter`) loaded in `src/app/layout.tsx`
- `lucide-react` for icons; `framer-motion` is installed but currently unused

## Commands

Run from `my-portfolio/`:

```bash
npm run dev     # next dev (also rewrites the AGENTS.md block at the top)
npm run build   # next build
npm run start   # serve the production build
npm run lint    # eslint (flat config)
npx tsc --noEmit  # typecheck; there is no npm script for it
```

There is no test runner or CI config. Runtime configuration is
environment-only; see `.env.example` and the contact form section below.

## Layout

| Path | Purpose |
| --- | --- |
| `src/app/layout.tsx` | Root layout, `metadata`/`viewport`, skip link, `<html>`/`<body>` classes |
| `src/app/page.tsx` | Home page; composes the section components in order |
| `src/app/project/[id]/page.tsx` | Project detail page (note: folder is singular `project`) |
| `src/app/not-found.tsx` | Branded 404 with navbar/footer and links home/projects |
| `src/app/api/contact/route.ts` | Node.js route handler that validates and emails contact submissions via Resend |
| `src/app/robots.ts`, `src/app/sitemap.ts` | Generated `robots.txt` and `sitemap.xml` |
| `src/lib/site.ts` | Normalized site URL, site name, description shared by metadata, sitemap, robots |
| `src/app/globals.css` | Tailwind import, `@theme` tokens (`--color-dark-bg`, `--font-sans`), scroll margin, focus styles, reduced motion, scrollbar, `gradient-text` utility |
| `src/components/*.tsx` | One component per section (Navbar, Hero, About, Skills, Education, Projects, Contact, Footer) |
| `src/components/SectionHeading.tsx` | Shared section title + accent word + underline bar |
| `src/components/BrandIcons.tsx` | Inline GitHub / LinkedIn / X / Facebook / WhatsApp SVGs (`lucide-react` v1 has no brand icons) |
| `src/components/ContactForm.tsx` | Client-side contact form: validation, loading/success/error states, `mailto:` fallback |
| `src/data/projectsData.ts` | Single source of truth for the project grid, modal *and* detail pages |
| `public/images/` | Project screenshots and the profile photo |
| `public/resume.pdf` | Real resume served by the Hero download button |
| `public/og.png` | Static 1200×630 Open Graph / Twitter card image |
| `next.config.ts` | `reactCompiler: true` and the Tailwind Turbopack CSS rule |

## Conventions

- **Server Components by default.** Add `"use client"` only for hooks or event
  handlers — currently `Navbar.tsx`, `Projects.tsx` (detail modal) and
  `ContactForm.tsx`.
- Components and pages use **default exports**; shared types live next to their
  data in `src/data`.
- Import with the `@/` alias (`@/components/...`, `@/data/...`).
- **Tailwind utilities only.** No CSS modules, styled-components, or per-component
  CSS. Design system (cyan on navy):
  - base surface `bg-dark-bg` (`#0b1120`), cards `bg-slate-800/50`–`/60`
    with `border-slate-700/60`, section bands `bg-slate-900/50` +
    `border-y border-slate-800/80`
  - accent `cyan-400` for text/icons, `cyan-500` for solid buttons and bars
  - body copy `text-slate-300`/`slate-400`, headings `text-white`
  - radii are generous (`rounded-xl`/`rounded-2xl`), hover states shift borders
    to `border-cyan-500/50` instead of adding large animations
  - gradients use Tailwind v4 syntax: `bg-linear-to-r`, `bg-linear-to-tr`
- Section pattern: `<section id="...">` → `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
  → `<SectionHeading title="About" accent="Me" subtitle="..." />` (renders the
  centered `h2` with a cyan word and a cyan bar). Alternate the page background
  between `bg-dark-bg` and `bg-slate-900/50` bands.
- Section IDs are `home`, `about`, `skills`, `qualification`, `projects`,
  `contact`. Navbar and Footer links are **root-relative** (`/#projects`) so they
  also work from `/project/[id]`. Gotcha: `next/link` with a hash-only href
  (`#projects`) does not scroll when already on a detail page.
- `section[id]` gets `scroll-margin-top: 5.5rem` in `globals.css` so anchors clear
  the fixed 64px navbar. Keep that in sync if the navbar height changes.
- Icons come from `lucide-react`; brand logos come from `@/components/BrandIcons`.
- Use `next/link` for routes and root-relative anchors; plain `<a>` for external
  URLs and `mailto:`/`tel:` links (`target="_blank"` + `rel="noreferrer"` for
  external).
- Images use `next/image` (`fill` inside a `relative` box) with an explicit
  `sizes` value. The hero portrait uses the Next 16 `preload` prop, **not** the
  deprecated `priority`.
- `font-sans` resolves to Inter through `--font-sans` in `globals.css`; don't set
  font families per component.
- Focus is global (`:focus-visible` outline in `globals.css`). Don't add
  `focus:outline-none` to interactive elements; only non-tabbable focus targets
  like `<main tabIndex={-1}>` remove it.
- Project screenshots are ~1.97:1 (≈1938×982). Card, modal, and detail-page
  image boxes use `aspect-[2/1]` + `object-cover object-top` — keep that ratio
  when adding new images.

## Contact form

`ContactForm.tsx` posts JSON to `/api/contact`. The route:

1. Applies a per-instance in-memory rate limit (5 requests / 10 minutes / IP).
2. Rejects oversized bodies, invalid JSON, a filled honeypot (`company`), and
   invalid field lengths with `400`/`413`/`429`.
3. Returns `503` with `code: "not_configured"` when `RESEND_API_KEY` is missing.
4. Otherwise sends through Resend's HTTP API (no SDK dependency) and returns
   `502` if Resend rejects the message.

The UI only shows success after a 2xx response. On error it shows an alert plus a
prefilled `mailto:` link so the visitor can still send the message.

Environment variables (server-only except the site URL):

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=emransani01@gmail.com
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

`CONTACT_FROM_EMAIL` must be verified in Resend. Never import `RESEND_API_KEY`
into a client component. Rate limiting is per server instance; use a shared store
(e.g. Upstash Redis) if the site scales beyond one instance.

## Next.js 16 notes

- `params` and `searchParams` are **Promises**. Type them as
  `Promise<{ id: string }>` and `await` (or `use()`) them:

  ```tsx
  export default async function ProjectDetailsPage({
    params,
  }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
  ```

- `src/app/project/[id]/page.tsx` is prerendered via `generateStaticParams`, and
  `generateMetadata` resolves the title/OG data from the same `projectsData`
  array.
- React Compiler is on: don't hand-write `useMemo`/`useCallback` for memoization.
- Consult `node_modules/next/dist/docs/` before relying on any Next.js API from
  memory (see the block at the top of this file).

## Adding content

**New project:** append an entry to `projectsData` in `src/data/projectsData.ts`
(`id` is the URL slug, `tag` is the badge shown on the card) and add its
screenshot to `public/images/`. The grid, the modal, the detail page, and
`sitemap.xml` all read from that array — no other wiring needed.

**New section:** create `src/components/<Name>.tsx`, give it a `<section id>`,
add the link to `navLinks` in `Navbar.tsx` (and `footerLinks` in `Footer.tsx`),
and render it in `src/app/page.tsx` in the desired position.

## Configuration / open items

- `NEXT_PUBLIC_SITE_URL` must be set in production; otherwise canonical URLs,
  OG URLs, `sitemap.xml`, and `robots.txt` fall back to `localhost:3000`.
  `VERCEL_PROJECT_PRODUCTION_URL` is used automatically on Vercel.
- `RESEND_API_KEY` and a verified sender are required for the contact form to
  actually deliver mail. Without them it fails honestly with a `mailto:` fallback.
- LinkedIn and X profile URLs are not known, so those placeholder links were
  removed rather than guessed. Add them to `Hero.tsx`/`Footer.tsx` if desired.
- `public/images/Emran.jpg` is ~2.1 MB; `next/image` serves optimized variants,
  but the source could still be compressed.


