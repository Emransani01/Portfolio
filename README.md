# Emran — Developer Portfolio

A modern, responsive personal portfolio built to showcase my projects, technical skills, and experience as a Full-Stack Web Developer.

The portfolio features a clean single-page layout with anchor-linked sections, dedicated project detail pages, and a functional contact form.

## Portfolio Preview

![Emran's Developer Portfolio](./public/images/Portfolio.png)

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, React Compiler)
- **Frontend:** React 19, TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Fonts:** Inter via `next/font`
- **Backend:** Next.js Route Handlers, Resend API
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js (a version compatible with the project's Next.js dependencies)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd my-portfolio
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Check TypeScript types |

## Project Structure

```text
my-portfolio/
├── public/
│   ├── images/
│   │   └── Portfolio.png
│   ├── og.png
│   └── resume.pdf
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts
│   │   ├── project/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── data/
│   │   └── projectsData.ts
│   └── lib/
│       └── site.ts
├── .env.example
├── package.json
└── README.md
```

## Features

- Responsive personal portfolio
- Dedicated project detail pages
- Dynamic project content managed from a central data file
- Project cards and project modal
- Downloadable resume
- Contact form with client-side and server-side validation
- Loading, success, and error states for contact submissions
- Server-side email delivery using Resend
- Contact form honeypot protection and per-instance rate limiting
- SEO metadata, canonical URLs, sitemap, and robots configuration
- Open Graph image for social sharing

## Customization

### 1. Update Projects

Edit `src/data/projectsData.ts` to add or update projects.

Each project uses an `id` as its URL slug. The project grid, modal, and detail pages use this data.

### 2. Update Profile and Project Images

Place your profile photo and project screenshots inside:

```text
public/images/
```

Your portfolio screenshot is stored as:

```text
public/images/Portfolio.png
```

For GitHub README preview, the image path is:

```markdown
![Portfolio Screenshot](./public/images/Portfolio.png)
```

Project screenshots are displayed at a 2:1 aspect ratio in the portfolio.

### 3. Update Your Resume

Replace the existing file:

```text
public/resume.pdf
```

The resume download button uses this file.

### 4. Configure the Website URL

Set `NEXT_PUBLIC_SITE_URL` in your production environment to your actual deployed website URL.

This value is used for canonical URLs, Open Graph metadata, the sitemap, and robots configuration.

## Contact Form Setup

The contact form uses the Resend HTTP API through a server-side Next.js route handler.

The API key is kept on the server and is never exposed to the browser.


## Deployment

This project is designed for deployment on [Vercel](https://vercel.com).

### Deployment Steps

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables in your Vercel project settings.
4. Deploy the application.
5. Open the deployed website and test the contact form.


## Live Demo

- **Live Website:** Add your deployed portfolio URL here.
- **GitHub Repository:** Add your repository URL here.

## Contact

- **Email:** emransani01@gmail.com
- **GitHub:** Add your GitHub profile URL here.
- **Portfolio:** Add your live portfolio URL here.

---

Built with Next.js, React, TypeScript, and Tailwind CSS.

