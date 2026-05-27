# Kleihaus Ceramics Website

Kleihaus Ceramics is a premium ceramics and finishing materials catalogue for customers looking for tiles, sanitaryware, paints, adhesives, grout and project quotation support in Kenya.

Live website: https://www.kleihaus.com/

## Tech Stack

- React
- Vite
- Tailwind CSS
- Cloudflare Pages

## Local Setup

```bash
npm install
npm run dev
```

The local Vite server normally runs at:

```text
http://localhost:5173
```

If that port is already in use, Vite will choose the next available port.

## Production Build

```bash
npm run build
```

The static production output is generated in `dist/` and is compatible with Cloudflare Pages.

## Deployment Workflow

The `main` branch is the production source of truth. Cloudflare Pages should build from this repository using:

```bash
npm run build
```

Build output directory:

```text
dist
```

Do not commit `node_modules/`, `dist/`, local `.env` files or secrets.

## Environment Variables

The repository includes placeholders in `.env.example`.

```env
VITE_GA_MEASUREMENT_ID=
VITE_ENABLE_ANALYTICS=false
VITE_ANALYTICS_ENDPOINT=
VITE_ENABLE_RECOMMENDATIONS=true
VITE_ENABLE_MONTHLY_REPORTS=false
VITE_MONTHLY_REPORT_RECIPIENTS=
VITE_QUOTE_ENDPOINT=
VITE_MONTHLY_REPORT_ENDPOINT=
```

`VITE_QUOTE_ENDPOINT` is reserved for a secure backend quote/email endpoint such as a Cloudflare Worker. Do not place API keys, SMTP passwords, WhatsApp tokens, database credentials or LLM keys in frontend variables.

## Quote and WhatsApp Flow

The public quote form validates customer details, opens WhatsApp with a formatted quote message and optionally prepares a backend email submission when `VITE_QUOTE_ENDPOINT` is configured.

Current customer-facing fallback message:

```text
Your WhatsApp quote request is ready. Please send it in WhatsApp so our team can respond.
```

## AI and Backend Architecture

The public website stays clean and customer-facing. Analytics, recommendations, reporting, LLM insight preparation and future monthly intelligence reporting live in service-layer files and documentation.

Important files:

- `src/services/analyticsService.js`
- `src/services/recommendationService.js`
- `src/services/reportingService.js`
- `src/services/notificationService.js`
- `src/services/llmInsightService.js`
- `src/data/intelligenceData.js`
- `docs/AI_BACKEND_ARCHITECTURE.md`

Do not expose internal dashboards, search logs, weak-signal detection, private analytics tables or backend endpoint details on the public website.

## SEO and Indexing

SEO support includes:

- Metadata and Open Graph tags in `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/site.webmanifest`
- Organization, LocalBusiness, Store, WebSite, SearchAction and FAQ structured data
- Crawlable product/category content
- Helpful guides and FAQ content

See `docs/SEO_STRATEGY.md` for the indexing roadmap.

## Project Documentation

Primary documentation:

- `docs/CHANGELOG.md` - audited history of major project work.
- `docs/PROJECT_AUDIT.md` - current project state, features, limitations and next improvements.
- `docs/DEVELOPMENT_WORKFLOW.md` - local setup, build checks, git workflow and commit safety rules.
- `docs/AI_BACKEND_ARCHITECTURE.md` - frontend/backend separation for analytics, recommendations and reporting.
- `docs/SEO_STRATEGY.md` - SEO, Google indexing and AI-search readiness roadmap.
- `docs/VISIBILITY_AND_GROWTH_ROADMAP.md` - Google visibility, content and conversion roadmap.
- `docs/QUOTE_FORM_SUBMISSION.md` - WhatsApp quote submission and secure backend email preparation.

Every future meaningful change must update `docs/CHANGELOG.md` and, where relevant, `docs/PROJECT_AUDIT.md`.

## Development Workflow

Before editing:

```bash
git status
```

After a meaningful update:

```bash
git add .
git commit -m "Update Kleihaus website"
git push origin main
```

Keep changes scoped, preserve Cloudflare deployment settings and avoid committing generated dependencies or secrets.
