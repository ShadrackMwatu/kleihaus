# Kleihaus Project Audit

This audit summarizes the current production architecture and repository state for the Kleihaus website.

Rule: Every future meaningful change must update `docs/CHANGELOG.md` and, where relevant, `docs/PROJECT_AUDIT.md`.

## Project Identity

- Brand: Kleihaus Ceramics
- Tagline: Inspiring living
- Website: https://www.kleihaus.com/
- Phone/WhatsApp: +254 748 827 166
- Email: sales@kleihaus.com
- Locations: Nairobi | Machakos | Makueni
- Product focus: tiles, sanitaryware, paints, adhesives, grout and finishing materials for homes and projects in Kenya.

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS
- Framer Motion
- Lucide React
- Cloudflare Workers Builds
- Cloudflare Worker Assets
- Cloudflare D1
- Resend

## Current Deployment Flow

Production currently uses Worker Assets:

```text
GitHub main
-> Cloudflare Workers Builds
-> Worker Assets
-> Worker "kleihaus"
-> kleihaus.com
-> www.kleihaus.com
```

Active deployment files:

- `wrangler.toml` - current Worker Assets deployment config.
- `src/worker.js` - Worker entrypoint that handles API routes and serves `env.ASSETS`.
- `functions/api/quote-request.js` - shared quote handler using Cloudflare Pages Functions-style exports.
- `functions/api/track-event.js` - customer journey event endpoint.

Cloudflare Pages is not the current production path. Earlier Pages references in old docs or changelog entries are historical/stale.

## Active Quote Endpoint

The frontend posts quote requests to:

```text
/api/quote-request
```

The old `api.kleihaus.com` path is legacy and not currently required by the frontend.

## Repository Structure

Key files and folders:

- `src/App.jsx` - main customer-facing site structure and UI sections.
- `src/main.jsx` - React entry point.
- `src/styles.css` - Tailwind and site styling.
- `src/worker.js` - active Cloudflare Worker Assets entrypoint.
- `src/services/quoteRequestService.js` - frontend quote submission service.
- `functions/api/quote-request.js` - backend quote request handler.
- `database/schema.sql` - D1 schema for quote and journey records.
- `public/images/` - site imagery.
- `public/sitemap.xml` - sitemap for indexing.
- `public/robots.txt` - crawler directives.
- `public/site.webmanifest` - web app/site metadata.
- `docs/` - project documentation.
- `intelligence/` - future backend intelligence workspace.

## Legacy API Worker Files

These files remain in the repo but are not referenced by the active Worker Assets config:

- `wrangler.api.toml`
- `src/api-worker.js`

They were used/planned for the older `api.kleihaus.com` Worker path. Do not delete them without explicit approval. They are safe candidates to archive or remove later after production has been stable on same-origin `/api/quote-request`.

## Quote and Contact Flow

Current behavior:

- The contact/quote form validates required customer details.
- It posts to `/api/quote-request`.
- `src/worker.js` routes the request before static assets.
- The backend validates, sanitizes and timestamps the request.
- The backend stores quote requests in Cloudflare D1 table `quote_requests`.
- The backend sends internal sales email through Resend using `RESEND_API_KEY`, `QUOTE_EMAIL_FROM`, and `SALES_EMAIL`.
- The backend returns `success: true` only after required D1 storage and internal Resend email delivery succeed.
- The backend queues customer confirmation email.
- The backend skips WhatsApp automation unless WhatsApp Business Cloud API credentials are configured.
- The manual "Chat on WhatsApp" button remains available as a fallback.

## Cloudflare Runtime Requirements

Required Worker values:

- `QUOTE_EMAIL_FROM`
- `SALES_EMAIL`
- `WHATSAPP_TO_NUMBER`
- `RESEND_API_KEY` as a secret
- D1 binding `DB`
- Assets binding `ASSETS`

Optional WhatsApp Business API values:

- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`

## Stale Cloudflare Pages Check

GitHub may still show a failing `Cloudflare Pages` check from stale account:

```text
bded816dd798bcf88e4ccc0ce5d16bcb
```

This is not the production deployment path. The working deployment check is:

```text
Workers Builds: kleihaus
```

The stale Pages integration must be disconnected from the old account or removed by Cloudflare Support.

## Public Frontend Features

- Premium header with top utility strip, logo, search, state-driven navigation and WhatsApp CTA.
- Category navigation for major product groups that opens the compact catalogue panel.
- Home area with clear business positioning, premium hero carousel and hero trust badges.
- Compact segmented content area for Catalogue, About, Guidance and Quote.
- Catalogue panel with clickable category cards, icons, descriptions and quote CTAs.
- About panel with Kleihaus positioning, service areas and concise trust/support points.
- Guidance panel with concise quote-planning tips.
- Quote panel with the existing quote form and direct contact details.
- WhatsApp inquiry links with pre-filled messages.
- Structured footer with products, services, contact, WhatsApp, email, locations and response expectation.

The public frontend should not display admin dashboards, analytics tables, AI implementation details, weak-signal detection, backend logs or endpoint configuration details.

## SEO Status

Current SEO foundations include:

- Optimized page title and meta description.
- Canonical URL support.
- Robots meta directives.
- Open Graph and Twitter metadata.
- `public/sitemap.xml`.
- `public/robots.txt`.
- `public/site.webmanifest`.
- Organization, LocalBusiness, Store, WebSite, SearchAction, ContactPoint, FAQ and catalogue `ItemList` structured data.
- Incomplete Product rich-result schema was removed for quote-based catalogue categories without fabricating price, review, rating or availability data.
- One primary H1 on the homepage.
- H2/H3 hierarchy for major sections.
- Crawlable category and guide content.
- Image alt text coverage.
- Kenya-focused local SEO mentions for Nairobi, Machakos and Makueni.

## Known Limitations

- WhatsApp Business API notification is optional and skipped unless credentials are configured.
- Product inventory is represented as catalogue-style content, not a database-backed e-commerce catalogue.
- Search is frontend-oriented and not backed by a persistent search index.
- Monthly AI reports are documented and service-prepared, but not yet automatically sent.
- The stale Cloudflare Pages check must be cleaned up outside this repo.

## Next Recommended Improvements

- Update or archive legacy API-worker docs once the same-origin Worker Assets path remains stable.
- Add a fuller deployment troubleshooting runbook with screenshots or dashboard paths.
- Add Google Search Console and GA4 after official account setup.
- Expand SEO landing pages for product and location searches.
- Add automated monthly management reports for search, quote and WhatsApp trends.
- Continue testing mobile layout, WhatsApp links, quote flow and build output before every push.
