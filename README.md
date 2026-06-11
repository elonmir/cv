# CV Page Design

A modern, printable CV/resume page built with Next.js App Router, TypeScript, and Tailwind CSS.

## Highlights

- Bilingual CV data (`English` and `German`) from JSON files
- Reusable CV-focused components (header, timeline, skills, testimonials, toolbar)
- Theme toggle and print action support
- Contact QR code section
- Optimized static assets in `public/`

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- pnpm

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  cv/
  ui/
data/
  cv.en.json
  cv.de.json
lib/
  cv-types.ts
  utils.ts
public/
  images/markus.jpg
  ...icons/placeholders
```

## Prerequisites

- Node.js 20+ (recommended for modern Next.js projects)
- pnpm

## Install

```bash
pnpm install
```

## Run (Development)

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Build and Run (Production)

```bash
pnpm build
pnpm start
```

## Lint

```bash
pnpm lint
```

## Content Editing

Update CV content in:

- `data/cv.en.json`
- `data/cv.de.json`

Keep both locale files aligned to the shared shape in `lib/cv-types.ts`.

## Key Files

- `app/page.tsx` - main entry page
- `components/cv/cv-app.tsx` - CV composition container
- `components/cv/cv-header.tsx` - header/sticky behavior
- `app/globals.css` - global styling

## Deployment

Deploy to any Next.js-compatible host (for example, Vercel).

Default commands:

- Install: `pnpm install`
- Build: `pnpm build`
- Start: `pnpm start`

## License

Private project.

