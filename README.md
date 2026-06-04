# Kleihaus Ceramics Website

Kleihaus Ceramics is a customer-facing ceramics and finishing materials catalogue for tiles, sanitaryware, paints, adhesives, grout and project quotation support in Kenya.

Live website: https://www.kleihaus.com/

## Current Production Architecture

Production currently runs through Cloudflare Worker Assets, not Cloudflare Pages:

```text
GitHub main
-> Cloudflare Workers Builds
-> Worker Assets
-> Worker "kleihaus"
-> kleihaus.com
-> www.kleihaus.com
```

The active quote endpoint is same-origin:

```text
/api/quote-request
```

`api.kleihaus.com` is legacy and is not currently required by the frontend. Older documentation and changelog entries may mention Cloudflare Pages or `api.kleihaus.com`; treat those references as historical unless this README or `docs/PROJECT_AUDIT.md` says otherwise.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Cloudflare Workers Builds
- Cloudflare Worker Assets
- Cloudflare D1
- Resend

## Local Setup

```bash
npm install
npm run dev
```

The local Vite server normally runs at:

```text
http://localhost:5173
```

## Production Build

```bash
npm run build
```

The static production output is generated in `dist/`. The Worker uses `env.ASSETS` to serve the Vite build and routes API requests before assets.

## Deployment Runbook

1. Confirm the worktree is clean before starting:

```bash
git status
```

2. Make the intended code or documentation change.

3. Verify locally:

```bash
npm install
npm run build
```

4. Commit and push to `main`:

```bash
git add .
git commit -m "Describe the change"
git push origin main
```

5. Confirm GitHub shows:

```text
Workers Builds: kleihaus
conclusion: success
```

6. Verify production:

```bash
GET https://www.kleihaus.com
GET https://www.kleihaus.com/api/quote-request
OPTIONS https://www.kleihaus.com/api/quote-request
POST https://www.kleihaus.com/api/quote-request
```

Expected quote POST result:

```json
{
  "success": true,
  "storage": { "stored": true },
  "email": { "sent": true }
}
```

## Cloudflare Configuration

Active Worker config is in `wrangler.toml`:

- Worker name: `kleihaus`
- Entry file: `src/worker.js`
- Assets directory: `./dist`
- Assets binding: `ASSETS`
- API routes run first for `/api/*`
- D1 binding: `DB`

Do not move production to Cloudflare Pages unless the deployment strategy is intentionally changed.

## Environment Variables

The repository includes placeholders in `.env.example`.

Backend-only values must be configured in Cloudflare Worker settings, not exposed in frontend code:

```env
QUOTE_EMAIL_FROM=Kleihaus Ceramics <sales@kleihaus.com>
SALES_EMAIL=sales@kleihaus.com
WHATSAPP_TO_NUMBER=254748827166
RESEND_API_KEY=

WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
```

`WHATSAPP_ACCESS_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` are optional. If absent, the backend skips WhatsApp Business API notification gracefully while preserving quote submission and email delivery.

## Quote and WhatsApp Flow

The public quote form validates customer details and posts to `/api/quote-request`. The Worker routes that request to `functions/api/quote-request.js`, stores the inquiry in D1, sends the internal sales email through Resend, queues the customer confirmation email, and returns success only after required backend work succeeds.

The separate "Chat on WhatsApp" button remains available as a manual fallback.

## Public SEO Routes

The site includes lightweight frontend category landing pages for quote-focused search visibility:

- `/floor-tiles`
- `/wall-tiles`
- `/bathroom-tiles`
- `/sanitaryware`
- `/paints`
- `/adhesives-grout`

These pages are catalogue and quote-planning pages. They must not use Product or Offer structured data unless Kleihaus later publishes real product pages with truthful prices and current availability.

`public/sitemap.xml` includes these URLs, and `public/robots.txt` references the sitemap.

Local Google Business Profile setup guidance is documented in `docs/LOCAL_SEO_GOOGLE_BUSINESS_PROFILE.md`. Profile creation and verification must be completed manually by the business owner.

## Legacy Files

`wrangler.api.toml` and `src/api-worker.js` are retained for historical/legacy API-worker context. They are not referenced by the current `wrangler.toml` Worker Assets deployment path and are safe candidates to archive or remove later after explicit approval.

## Stale Cloudflare Pages Check

A stale Cloudflare Pages integration from account:

```text
bded816dd798bcf88e4ccc0ce5d16bcb
```

may still publish a failing `Cloudflare Pages` check on GitHub. The working production path is the passing `Workers Builds: kleihaus` check from the current Worker account. The stale Pages check must be removed from that old Cloudflare account or by Cloudflare Support.

## Project Documentation

Primary documentation:

- `docs/CHANGELOG.md`
- `docs/PROJECT_AUDIT.md`
- `docs/DEVELOPMENT_WORKFLOW.md`
- `docs/AI_BACKEND_ARCHITECTURE.md`
- `docs/SEO_STRATEGY.md`
- `docs/VISIBILITY_AND_GROWTH_ROADMAP.md`
- `docs/QUOTE_FORM_SUBMISSION.md`
- `docs/QUOTE_BACKEND_AUTOMATION.md`

Every future meaningful change must update `docs/CHANGELOG.md` and, where relevant, `docs/PROJECT_AUDIT.md`.
