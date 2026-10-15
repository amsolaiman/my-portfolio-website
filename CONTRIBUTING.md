# Contributing

This guide describes the project layout, local development setup, integrations, quality checks, and pull request expectations.

## Project Overview

- **Framework:** Next.js 16 App Router with React 19
- **Language:** Typescript
- **Styling:** Tailwind CSS 4
- **Content management:** Sanity Studio and `next-sanity`
- **Deployment:** Vercel
- **Package manager:** pnpm 10.4.1
- **Node.js:** 24 (the version used in CI)

## Project Directory Structure

```text
src/
├── app/                            # Next.js App Router (pages, layouts, etc.)
│   ├── api/revalidate/             # Sanity-triggered cache revalidation endpoint
│   ├── studio/                     # Sanity Studio entry route
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Page entry
│
├── _sanity/                        # Sanity integration files
│   ├── schemas/                    # Sanity document schemas
│   ├── utils/                      # Content fetching and transformation helpers
│   ├── client.ts                   # Sanity client setup
│   └── structure.ts                # Studio content organization
│
├── components/                     # Shared UI/feature components
│
├── constants/                      # Shared application constants
│
├── contexts/                       # React context providers and hooks
│
├── hooks/                          # Custom utility hooks
│
├── sections/                       # Page sections, views, and components
│
├── types/                          # Typescript type definitions
│
├── utils/                          # Shared utility functions
│
└── proxy.ts                        # Next.js proxy helper, including Basic Auth handling

public/                             # Static assets
```

Root configuration includes:

- `sanity.config.ts` for the Sanity Studio
- `env.schema.ts` for environment validation
- `eslint.config.mjs`
- `.prettierrc`
- `commitlint.config.js`
- GitHub Actions workflows under `.github/workflows/`

### Where to make changes

- Add or update pages and API handlers under `src/app/`.
- Keep reusable UI in `src/components/`; group page-specific presentation and behavior in the corresponding `src/sections/` feature.
- Define Sanity document types in `src/_sanity/schemas/`, and keep Sanity queries and data helpers in `src/_sanity/utils/`.
- Put shared hooks, constants, context, types, and pure utilities in their respective folders under `src/`.
- Store public static assets in `public/`. Do not put secrets or private configuration there.

## Local Development

1. Install the required Node.js version and pnpm, then install dependencies:

   ```bash
   pnpm install
   ```

2. Create `.env.local` using `.env.sample` as a reference. The application validates its required configuration at startup; set the values needed for your environment.

   `next.config.ts` maps the public values from this configuration to their `NEXT_PUBLIC_*` names. The Sanity Studio uses `NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID` and `NEXT_PUBLIC_SANITY_STUDIO_DATASET`. Keep real credentials and secrets out of source control; `.env*` files are ignored except for `.env.sample`.

3. Start the development server:

   ```bash
   pnpm dev
   ```

   Visit `http://localhost:3000`; the Sanity Studio is available at `/studio`.

## Integrations

### Sanity

The Studio is configured in `sanity.config.ts` and mounted at `/studio`. The client is initialized in `src/_sanity/client.ts`; document schemas are in `src/_sanity/schemas/`, and Studio navigation is defined in `src/_sanity/structure.ts`.

The `POST /api/revalidate` endpoint checks the `secret` query parameter against `REVALIDATION_SECRET` before revalidating cached pages. Configure the matching secret in the Sanity webhook and deployment environment; never expose or commit it.

### Vercel

Vercel is the deployment target. The manual GitHub Actions workflow `.github/workflows/deploy-to-vercel.yml` deploys either a development preview or production. Production deployments are explicitly checked out from `main`. Deployment credentials are provided through GitHub secrets.

### Basic Authentication

`src/proxy.ts` applies Basic Authentication to matched site routes, using `BASIC_AUTH_USERNAME`, `BASIC_AUTH_PASSWORD`, and `BASIC_AUTH_BYPASS`. The revalidation endpoint is intentionally excluded from Basic Auth and uses its own secret check. Configure these values appropriately for each deployment; do not commit credentials.

## Code Style and Standards

- Use Typescript and follow the existing feature and folder patterns.
- Typescript strict checking is enabled. Prefer precise types and avoid `any`.
- Use functional React components and hooks, following the Rules of Hooks.
- Follow the ESLint configuration, including import ordering and unused-import checks.
- Prettier is configured with single quotes, ES5 trailing commas, automatic line endings, and the Tailwind CSS plugin.
- Keep changes focused and update related documentation and `.env.sample` when configuration requirements change.
- Use meaningful, Conventional Commit-style commit messages.

## Validation

Run the checks relevant to your change before submitting:

```bash
pnpm lint
pnpm check:type
pnpm check:circular-deps
```

`pnpm build` runs a production build. The repository does not currently define a unit-test or end-to-end-test script.

The pull-request quality workflow runs `pnpm lint` and `pnpm check:type`. A pre-commit hook runs the circular-dependency check and `lint-staged`; staged JavaScript/Typescript changes trigger lint, type checking, and Prettier, while staged JSON, Markdown, and YAML files are formatted with Prettier.

## Commit and Pull Request Guidelines

Commit messages and pull request titles use the [Conventional Commit](https://www.conventionalcommits.org/en) format:

```text
<type>(optional scope): <short description>
```

Common types include `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, and `chore`. Examples:

```text
feat(projects): add project filtering
fix: handle missing sanity content
docs: clarify local environment setup
```

Pull requests should use the repository template in `.github/pull_request_template.md`, retaining its sections for the change summary, changes, notes, screenshots, and checklist. Include testing details and screenshots when useful, and complete the checklist items that apply:

- No build or runtime errors or warnings
- Cross-browser/device testing
- No console errors
- Configuration files added or updated as needed
- Documentation and `README.md` updated as needed
- `.env.sample` updated when environment variables change

Keep pull requests focused and explain any relevant configuration or operational impact.
