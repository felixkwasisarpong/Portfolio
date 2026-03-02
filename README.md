# Felix Sarpong Portfolio

A minimal, content-first portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and Markdown content.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Markdown content via `content/`

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Content Workflow

Markdown files live in `content/`:

- `content/projects/*.md`
- `content/writing/*.md`

Frontmatter fields used:

```yaml
---
title: Project or Post Title
summary: Short description shown in lists
date: YYYY-MM-DD
tags: [TagA, TagB]
---
```

### Weekly trends post generator

Generate the weekly AI x fintech digest locally:

```bash
node scripts/generate-weekly-trends.mjs
```

### Weekly schedule on Vercel

`vercel.json` defines a weekly cron that calls `/api/cron/weekly-trends` at `0 14 * * 1` (Monday 8:00 AM CST, 9:00 AM CDT).

Required Vercel environment variables:

- `CRON_SECRET` (used to authorize Vercel cron requests)
- `GITHUB_WORKFLOW_TOKEN` (GitHub token with permission to dispatch workflows)
- `GITHUB_REPOSITORY` (optional, defaults to `felixkwasisarpong/Portfolio`)
- `GITHUB_WORKFLOW_FILE` (optional, defaults to `.github/workflows/weekly-trends.yml`)
- `GITHUB_WORKFLOW_REF` (optional, defaults to `main`)

## Resume

Update `public/resume.pdf` with the latest PDF resume.

## SEO

Base metadata lives in `app/layout.tsx`. Update `metadataBase` and Open Graph values once the production domain is known.

## Deploy

This project is ready for Vercel. Push to a Git repository and import the project in Vercel, or run:

```bash
npm run build
npm start
```
