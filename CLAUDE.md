# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

注意：src/demos、src/contents 均为博客内容文件，无需关注。

## Build & Development Commands

```bash
npm run dev          # Start dev server (generates posts index first)
npm run build        # Production build (generates posts index first)
npm run start        # Start production server
npm run lint         # Run Next.js linter
npm run gen-posts-index      # Regenerate the posts index JSON (frontmatter → public/posts-index.json)
npm run gen-preview-code <demo-dir>  # Generate preview + tabs code for a demo, copies to clipboard
```

No test suite exists in this project.

## Architecture

This is a **Next.js 15 App Router** personal blog with TypeScript, MDX content, and Tailwind CSS v4.

### Content Pipeline

Blog posts live as `.mdx` files in `src/contents/`. Each file has YAML frontmatter with required fields: `slug`, `title`, `createdTime`, `updatedTime`, and optional `summary` + `category`. The build pipeline works in two stages:

1. **`scripts/gen-posts-index.js`** — runs before `dev`/`build`. Reads every `.mdx` file in `src/contents/`, extracts frontmatter via `gray-matter`, and writes a sorted JSON array to `public/posts-index.json`. This is the single source of truth for post metadata at runtime.
2. **`src/lib/posts.ts`** — reads `public/posts-index.json` and provides `getAllPosts()`, `getPostBySlug()`, `getCategories()`, `getPostsByCategory()`. All pages consume posts through this module.

### Routing (App Router)

| Route | File | Purpose |
|---|---|---|
| `/` | `src/app/page.tsx` | Homepage (avatar + intro) |
| `/about` | `src/app/about/page.tsx` | About me page |
| `/posts` | `src/app/posts/page.tsx` | Post listing grid |
| `/posts/[slug]` | `src/app/posts/[slug]/page.tsx` | Individual post (dynamic import of MDX) |
| `/categories` | `src/app/categories/page.tsx` | Category listing with post counts |
| `/categories/[slug]` | `src/app/categories/[slug]/page.tsx` | **Not yet implemented** (404) |

The `[slug]` post page uses `generateStaticParams` (limited to first 20 posts), `revalidate = 3600` (ISR hourly), and `dynamicParams = true` (non-pre-rendered slugs are server-rendered on demand). The MDX module is dynamically imported: `import(@/contents/${slug}.mdx)`.

### MDX Customization

`mdx-components.tsx` at the project root maps:
- `pre` → `Code` component (adds copy-to-clipboard button to code blocks, `src/components/code.tsx`)
- `img` → `ZoomImg` component (click-to-zoom with `layoutId` shared-layout animation, `src/components/zoom-img.tsx`)

MDX processing in `next.config.mjs` uses `remark-frontmatter`, `remark-gfm`, `rehype-pretty-code` (Shiki with github light/dark themes), and `rehype-slug` (adds `id` to headings for TOC linking).

### Theme System

- **Tailwind v4** with `@tailwindcss/typography` plugin and `tw-animate-css`
- Custom CSS properties (`--bg-main`, `--bg-fore`, `--bg-card`) set per light/dark class on `<html>`, mapped to Tailwind tokens via `@theme inline` in `globals.css`
- Dark mode uses `class` strategy via `next-themes`; the `ThemeProvider` wraps the app in `src/app/layout.tsx`
- `ThemeToggle` (`src/components/theme-toggle.tsx`) uses the View Transition API for smooth light/dark switches
- Shiki code block colors are handled per-theme in `globals.css` (`.light .shiki` / `.dark .shiki`)
- Prose styles live in `.prose-custom` class in `globals.css`

### Key Components

- **`Tabs` / `TabItem`** (`src/components/tabs.tsx`) — Client component with `motion` layout animations for tab switching. Used inside MDX posts via the `gen-preview-code` script.
- **`CommandDialog`** (`src/components/command-dialog.tsx`) — Portal-rendered modal with spring animations, backdrop blur, click-outside/Escape close, and body scroll lock.
- **`GlobalSearch`** (`src/app/components/global-search.tsx`) — Cmd+K search overlay. Fetches `public/posts-index.json` client-side, filters posts by title/summary/slug, navigates on selection.
- **`TableOfContents`** (`src/components/table-of-contents.tsx`) — Extracts headings from DOM post-mount, highlights the currently visible heading using `IntersectionObserver` with scroll debouncing. Fixed-positioned on `xl` screens.
- **`PostCard`** (`src/components/post-card.tsx`) — Card with title, summary, and hover arrow animation. Used in post listing and search results.
- **`FadeInUp`** (`src/components/fade-in-up.tsx`) — Spring-animated entrance wrapper with configurable delay.
- **`Preview`** (`src/components/preview.tsx`) — Wraps demo components with a reset button (increments React `key` to remount children).

### Demo Components (`src/demos/`)

Reusable UI demos that can be embedded in MDX posts. The `gen-preview-code.js` script reads a demo directory, generates:
1. A `<Preview>` wrapper importing the demo's `index.tsx`
2. A `<Tabs>` block with the source code of all files in the directory

The output is copied to clipboard for pasting into `.mdx` files. Each demo subdirectory has its own `index.tsx` as the entry point.

### Code Style

- **Prettier** config: single quotes, trailing commas everywhere, 100 char print width, Tailwind plugin
- Path alias: `@/*` → `./src/*`
- `cn()` helper from `src/lib/utils.ts` combines `clsx` + `tailwind-merge`
- Font: custom `MapleMono-Regular.woff2` loaded via `next/font/local`
