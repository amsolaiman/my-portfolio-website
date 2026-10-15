# My Portfolio Website

A modern portfolio website built with Next.js, Typescript, Tailwind, and Sanity.io. This project is designed to showcase career overview and timeline, project work, and contact details while keeping the site fast, accessible, and easy to manage.

## Overview

- **Framework:** Next.js 16 App Router with React 19
- **Language:** Typescript
- **Styling:** Tailwind CSS 4
- **Content management:** Sanity Studio and `next-sanity`
- **Deployment:** Vercel
- **Package manager:** pnpm 10.4.1

## Getting Started

Install dependencies:

```bash
pnpm install
```

Environment variables are defined in:

- `.env.local`
- `.env.development`
- `.env.production`

> [!NOTE]
> Check your environment variables against `.env.sample`

Start the dev server:

```bash
pnpm dev
```

Open `http://localhost:3000` with your browser to preview the site.

## Sanity Studio

Sanity.io is configured via:

- **Configuration:** `sanity.config.ts` at the root directory
- **Environment variables:**
  - `NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID` - Sanity project ID
  - `NEXT_PUBLIC_SANITY_STUDIO_DATASET` - Sanity dataset name
- **Studio route:** `/studio` (via `./src/app/studio/[[...tool]]/page.tsx`)
- **Client:** Initialized in `./src/_sanity/client.ts` using `createClient` from `next-sanity`
- **Schemas:** Located in `./src/_sanity/schemas/`
- **Structure:** Defined in `./src/_sanity/structure.ts` for custom studio organization
- **Utilities:** Data fetching and transformation helpers in `./src/_sanity/utils/`

Access the studio at `http://localhost:3000/studio` when running the dev server.

**Dependencies**:

- sanity
- next-sanity

## Learn More

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Sanity.io](https://www.sanity.io/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Conventional Commit](https://www.conventionalcommits.org/en)
