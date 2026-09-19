# Dispatch News

Editorial broadsheet for live global headlines. The original Stitch HTML screens are rebuilt as a **Next.js**, **TypeScript**, and **Tailwind CSS v4** app, with article and source data from [NewsAPI](https://newsapi.org).

Cards and the reader render the NewsAPI payload as-is: `source`, `author`, `title`, `description`, `url`, `urlToImage`, `publishedAt`, and truncated `content`.

## Screens

| Route | What it shows |
| --- | --- |
| `/` | Front page from `/v2/top-headlines` |
| `/tech` | Tech & Innovation desk (magazine grid + compact wire) |
| `/investigative` | Longform `/v2/everything` query |
| `/sources` | `/v2/sources` directory and custom feed constructor |
| `/search?q=` | Full-text search across `/v2/everything` |
| `/desk/[category]` | World, Business, Science, Climate, Politics |
| `/article/[id]` | Reader view for a NewsAPI article |

## Stack

- Next.js 16 (App Router) and React 19
- TypeScript
- Tailwind CSS v4 with the Stitch editorial tokens
- NewsAPI v2, fetched only on the server

## Getting started

1. Copy the env template and add your key:

```bash
cp .env.example .env.local
```

```bash
NEWS_API_KEY=your_newsapi_key_here
```

2. Install and run the app:

```bash
npm install
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000). If that port is already taken, Next.js uses the next free port (this repo often lands on **3001**).

### Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## NewsAPI notes

- Keep the key in `.env.local`. Never prefix it with `NEXT_PUBLIC_`.
- Developer keys only work from **localhost** and are limited to **100 requests/day**.
- Responses are cached for **300 seconds** to stay inside that quota.
- `/v2/everything` can fail on the free plan; desks fall back to `/v2/top-headlines` when needed.
- NewsAPI does not expose get-by-id. Article routes encode the article JSON in the path so the reader can show title, image, and body without a second lookup.

## Project layout

```text
app/            # App Router pages and global styles
components/     # Broadsheet chrome, cards, reader, source tools
lib/            # NewsAPI client, types, constants, helpers
editorial_dispatch/DESIGN.md   # Original visual system
dispatch_front_page/           # Stitch HTML reference screens
article_detail_reader_view/
tech_innovation_feed/
source_directory_custom_feeds/
```

## Design

The UI follows the Stitch **Editorial Dispatch** system: Bodoni Moda headlines, Geist UI type, sharp (0-radius) surfaces, and Material Symbols. Layout is fluid from phone through desktop: shared page gutters, a compact mobile masthead, a scrollable desk nav, and stacked grids that expand to 2–3 columns.

## License

News content remains copyright of the originating publishers. This project is an aggregator UI over the NewsAPI developer plan.
# News
