export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const siteName = "Emran | Full-Stack Web Developer";

export const siteDescription =
  "Portfolio of Emran, a full-stack web developer building fast, accessible web applications with Next.js, React, TypeScript, Node.js, and MongoDB.";
