# Kleihaus Ceramics Website

Kleihaus Ceramics is a customer-facing ceramics and finishing materials website for discovering, selecting and sourcing tiles, sanitaryware, kitchen sinks and mixers, paints, adhesives, grout, tools and project support in Kenya.

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

The build first regenerates `public/sitemap.xml` from `src/seoManifest.js`, then generates the static production output in `dist/`, then writes route-specific extensionless HTML assets for every public SEO route. Those route assets give direct requests such as `/sanitaryware` and `/locations/nairobi` their own initial title, description, canonical, social metadata and JSON-LD without changing Cloudflare routes or bindings.

```bash
npm run generate:sitemap
```

Use the sitemap script directly only when refreshing the checked-in sitemap without a full production build.

```bash
npm run generate:route-html
```

Use the route HTML script only after `vite build` has created `dist/index.html`.

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
- `/sitemap.xml` is generated from `src/seoManifest.js` during build and can also be served by the Worker when the Worker handles the request
- Known SPA routes receive route-specific initial HTML title, meta description, canonical, Open Graph, Twitter/X and safe JSON-LD through build-time route HTML assets; the Worker keeps the same injection helper available when a request is routed through it
- D1 binding: `DB`

Do not move production to Cloudflare Pages unless the deployment strategy is intentionally changed.

## SEO Route Manifest

`src/seoManifest.js` is the shared source for route metadata, generated sitemap entries, route-specific static HTML and Worker metadata injection. Keep it aligned with route content in `src/App.jsx` whenever adding or renaming public SEO routes. The schema strategy remains conservative: do not add Product schema, Offer schema, fake ratings, fake reviews or fake prices.

The public information architecture starts with business context and then moves into commercial discovery:

```text
About | Products | Solutions | Projects | Guides | Locations | Contact
```

`/products`, `/guides` and `/locations` are lightweight parent hubs that organize existing content. `/trade-projects` remains the canonical Solutions/audience hub, `/projects` remains the genuine project-gallery destination, and quotation remains a highlighted action rather than a primary information category. Parent routes with child routes, such as `/locations`, are generated as folder `index.html` route assets so `/locations/nairobi` and related child pages continue to work.

Homepage block ownership is intentionally distinct: Hero summarizes the business, Products owns category discovery, Applications/Inspiration owns room and surface use cases, Projects owns genuine project proof, Solutions owns customer pathways, About/Why Kleihaus owns mission and values, Guides owns educational resources, Locations owns service-area pathways, and Contact owns WhatsApp, phone, email and quotation methods.

## Environment Variables

The repository includes placeholders in `.env.example`.

Backend-only values must be configured in Cloudflare Worker settings, not exposed in frontend code:

```env
QUOTE_EMAIL_FROM=Kleihaus Ceramics <sales@kleihaus.com>
SALES_EMAIL=sales@kleihaus.com
WHATSAPP_TO_PHONE=254748827166
RESEND_API_KEY=

WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
VITE_GA_MEASUREMENT_ID=
VITE_ANALYTICS_DEBUG=
```

`WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, and `WHATSAPP_TO_PHONE` are optional for WhatsApp Business API notifications. If absent, the backend skips WhatsApp notification gracefully while preserving quote submission and email delivery.

`VITE_GA_MEASUREMENT_ID` is optional frontend analytics configuration. When it is blank, the website continues to use the existing first-party anonymous journey tracking and does not load Google Analytics. When an official GA4 property is ready, set it to the public measurement ID issued by Google Analytics in the build environment.

`VITE_ANALYTICS_DEBUG=true` can be used temporarily in local or test builds to log non-sensitive analytics event names and metadata. Keep it blank or false for production unless actively debugging.

Search Console verification should use the existing HTML verification file if it matches the active property. If a meta-tag verification method is preferred later, place the verification meta tag in `index.html` only after the real code is issued by Google Search Console. Do not commit placeholder or fake verification IDs.

Detailed GA4 and Search Console setup steps are documented in `docs/ANALYTICS_AND_SEARCH_CONSOLE_SETUP.md`.

## Quote and WhatsApp Flow

The public quote form validates customer details and posts to `/api/quote-request`. The Worker routes that request to `functions/api/quote-request.js`, stores the inquiry in D1, sends the internal sales email through Resend, queues the customer confirmation email, and returns success only after required backend work succeeds.

The separate "Chat on WhatsApp" button remains available as a manual fallback.

## Analytics And Conversion Events

The site has two analytics layers:

- First-party anonymous journey tracking through `/api/track-event`.
- Optional GA4 tracking when `VITE_GA_MEASUREMENT_ID` is configured.

Supported conversion/event hooks include:

- `quote_submit`
- `whatsapp_click`
- `phone_click`
- `email_click`
- `guide_click`
- `guide_view`
- `location_view`
- `cta_click`

Analytics must remain privacy-safe: do not send names, phone numbers, email addresses or free-form quote messages to GA4.

## Google Business Profile Tracking

The June 2026 Google Business Profile report showed 62 profile views but 0 calls, 0 chat clicks, 0 website visits and 0 total interactions. Use a tracked Google Business Profile website URL so future GBP visits and conversions can be separated in GA4 and first-party analytics:

```text
https://www.kleihaus.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp
```

Optional location links:

```text
https://www.kleihaus.com/locations/nairobi?utm_source=google&utm_medium=organic&utm_campaign=gbp_nairobi
https://www.kleihaus.com/locations/machakos?utm_source=google&utm_medium=organic&utm_campaign=gbp_machakos
https://www.kleihaus.com/locations/makueni?utm_source=google&utm_medium=organic&utm_campaign=gbp_makueni
```

Manual action after deployment: update the website link inside Google Business Profile. This is an external profile-management step and should not be simulated with repo redirects.

## Public SEO Routes

The site includes lightweight frontend category, guide and location landing pages for product discovery, selection guidance, local relevance and quote-ready search visibility:

- `/tiles`
- `/floor-tiles`
- `/wall-tiles`
- `/bathroom-tiles`
- `/sanitaryware`
- `/paints`
- `/adhesives-grout`
- `/installation-support`
- `/trade-projects`
- `/products`
- `/guides`
- `/locations`
- `/locations/nairobi`
- `/locations/machakos`
- `/locations/makueni`
- `/tile-buying-guide`
- `/bathroom-renovation-guide`
- `/paint-selection-guide`
- `/adhesive-grout-guide`
- `/installation-best-practices`
- `/cost-estimation-guide`

These pages are catalogue and quote-planning pages. They must not use Product or Offer structured data unless Kleihaus later publishes real product pages with truthful prices and current availability.

`/trade-projects` is the consolidated audience hub for Homeowners, Home Builders, Contractors, Property Developers, Design Professionals, and Dealers & Institutional Buyers. Keep future audience SEO work anchored there unless real demand and content justify a separate substantial route.

The homepage should lead with product discovery, genuine project inspiration and practical support guidance. Quotation remains prominent for purchase-ready visitors through the hero supporting link, contact panel, mobile sticky action, product/project support paths and `/api/quote-request`, but it should not become the website's dominant identity.

`public/sitemap.xml` includes these URLs, and `public/robots.txt` references the sitemap.

Local Google Business Profile setup guidance is documented in `docs/LOCAL_SEO_GOOGLE_BUSINESS_PROFILE.md`. Profile creation and verification must be completed manually by the business owner.

## Sanitaryware Image Assets

Uploaded sanitaryware showroom images are stored in:

```text
public/images/sanitaryware/
```

The July 2026 upload was optimized from `sanitaryware.zip`: 21 JPG files were inspected, 11 unique images were retained, and exact duplicates were excluded. The retained images use descriptive filenames and the existing Kleihaus responsive pattern: JPG fallback plus WebP and AVIF variants. They appear in the homepage carousel, Sanitaryware catalogue block, `/sanitaryware` gallery and sanitaryware location-service page imagery.

The additional July 2026 `Sanitaryware.zip` from `C:\Users\smwatu\Downloads\Regulations EPR\` added 9 kitchen sink and mixer images. Originals are preserved under `assets/originals/sanitaryware-kitchen-sinks/`; optimized website copies are in `public/images/sanitaryware/` as JPG fallbacks plus WebP and AVIF variants. These images appear in the Sanitaryware catalogue block and `/sanitaryware` gallery with visible-content-only story copy.

The July 2026 project upload was optimized from `Projects.zip`: 9 JPG files were inspected, preserved under `assets/originals/projects/`, and published as stripped website-ready copies under `public/images/projects/`. The `/projects` page uses only the genuine kitchen finishing content visible in those photographs and avoids unsupported installation, customer, date, location, price, rating or review claims.

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
- `docs/SEO_DIGITAL_MARKETING_CAMPAIGN.md`
- `docs/VISIBILITY_AND_GROWTH_ROADMAP.md`
- `docs/ANALYTICS_AND_SEARCH_CONSOLE_SETUP.md`
- `docs/QUOTE_FORM_SUBMISSION.md`
- `docs/QUOTE_BACKEND_AUTOMATION.md`

Every future meaningful change must update `docs/CHANGELOG.md` and, where relevant, `docs/PROJECT_AUDIT.md`.
