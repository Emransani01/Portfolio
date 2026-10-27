# Emran — Developer Portfolio

Personal portfolio for **Emran**, a full-stack web developer focused on
Next.js, React, TypeScript, Node.js, and MongoDB. The site is a single-page
landing with anchor-linked sections plus a detail page for each project.

## Stack

- Next.js 16 (App Router, Turbopack, React Compiler)
- React 19 and TypeScript (strict)
- Tailwind CSS v4
- `lucide-react` icons and `next/font` (Inter)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
npx tsc --noEmit  # type-check
```

## Project structure

| Path | Purpose |
| --- | --- |
| `src/app/page.tsx` | Home page; composes the section components |
| `src/app/project/[id]/page.tsx` | Project detail page |
| `src/app/api/contact/route.ts` | Contact form endpoint |
| `src/components/` | Section and shared UI components |
| `src/data/projectsData.ts` | Project content for cards, modal, and detail pages |
| `src/lib/site.ts` | Site URL, name, and description used by metadata |
| `public/images/` | Profile photo and project screenshots |
| `public/resume.pdf` | Resume downloaded from the hero section |
| `public/og.png` | Open Graph / social sharing image |

## Editing content

- **Projects:** add or edit entries in `src/data/projectsData.ts`. Each `id` is
  the URL slug. The project grid, modal, and detail pages all read from this
  array.
- **Resume:** replace `public/resume.pdf`; the hero button downloads that file.
- **Projects images:** add screenshots to `public/images/` and reference them in
  `projectsData.ts`. Screenshots are displayed at a 2:1 ratio.
- **Site URL:** set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs,
  Open Graph metadata, `sitemap.xml`, and `robots.txt` use the real domain.

## Contact form

The form validates inputs on the client and server, shows loading, success, and
error states, and never reports success unless the email service accepts the
message. It does **not** show a fake success message when unconfigured.

Submissions are sent through [Resend](https://resend.com)'s HTTP API from the
server-side route handler. No API key is exposed to the browser.

1. Create a free Resend account and API key.
2. Copy `.env.example` to `.env.local` and fill in the values.
3. Verify the sender domain (or use Resend's test sender while developing).

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=re_your_api_key
CONTACT_TO_EMAIL=emransani01@gmail.com
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

`CONTACT_FROM_EMAIL` must be a sender verified in Resend. Without
`RESEND_API_KEY`, the endpoint returns `503` and the form tells visitors to email
directly instead of pretending the message was sent.

The endpoint also includes a honeypot field and a per-instance rate limit (five
messages per ten minutes per IP). For higher-volume or durable rate limiting,
use a shared store such as Upstash Redis.

## Deployment

The site deploys cleanly to Vercel. Set the environment variables above in the
project settings, then deploy. `VERCEL_PROJECT_PRODUCTION_URL` is used
automatically as the site URL when `NEXT_PUBLIC_SITE_URL` is not set.
