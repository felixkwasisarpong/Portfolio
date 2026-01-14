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
