# Jasafanar Portfolio Website

A modern portfolio website built with Next.js, Typescript, Tailwind, and Sanity.io. This project is designed to showcase career overview and timeline, project work, and contact details while keeping the site fast, accessible, and easy to manage.

## Overview

- **Framework:** Next.js 16 (App Router)
- **Language:** Typescript
- **Styling:** Tailwind CSS
- **CMS:** Sanity Studio
- **Deployment target:** Vercel
- **Package manager:** pnpm

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

## Directory Structure

```
src/
├── app/                        # Next.js App Router (pages, layouts, etc.)
│   ├── studio/                 # Sanity Studio entry route
│   └── layout.tsx              # Root app layout
│
├── _sanity/                    # Sanity integration files
│   ├── schemas/                # Sanity content schemas
│   ├── utils/                  # Sanity data fetching and helpers
│   └── client.ts               # next-sanity client configuration
│
├── components/                 # Shared UI/feature components
│
├── constants/                  # Application constants
│
├── contexts/                   # React context providers and hooks
│
├── hooks/                      # Custom utility hooks
│
├── sections/                   # Page sections and views
│
├── types/                      # TypeScript type definitions
│
├── utils/                      # Shared utility functions
│
└── proxy.ts                    # Next.js proxy helper
```

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
- [Sanity.io](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Conventional Commit](https://www.conventionalcommits.org/en)
