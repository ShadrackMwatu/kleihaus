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
- `docs/LOCAL_SEO_GOOGLE_BUSINESS_PROFILE.md` - manual Google Business Profile guidance for local SEO.
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
- Quote form submissions send `channel: "email"` and `intent: "quote"`.
- Email-channel submissions send internal sales email through Resend using `RESEND_API_KEY`, `QUOTE_EMAIL_FROM`, and `SALES_EMAIL`, may queue customer confirmation email, and explicitly skip WhatsApp notification.
- Support modal submissions send `channel: "whatsapp"` and `intent: "support"`.
- WhatsApp-channel submissions send WhatsApp Business API staff notifications when credentials are configured and explicitly skip internal/customer email.
- WhatsApp/support CTAs open the in-site support modal and do not redirect visitors to external WhatsApp URLs.
- D1 stores `channel` and `intent` where the extended schema is available, with legacy insert fallback preserved.

## Phase 2 Conversion Surface

- Mobile visitors see a persistent bottom action bar with direct WhatsApp and Request Quote actions.
- Direct WhatsApp actions open WhatsApp directly; support modal submissions use backend WhatsApp Business API delivery only.
- The homepage includes a compact trust section for Fast Response, Wholesale & Retail, Delivery Support and Professional Guidance.
- A customer project gallery uses existing assets from `public/images/` for project inspiration without adding new media dependencies.
- FAQ content targets common local search and Google Business Profile conversion questions around tile prices, sanitaryware prices, paint prices, delivery and installation support.
- Category landing pages include related category links to improve internal navigation between tile, sanitaryware, paint and installation pages.
- All visible phone numbers are rendered as click-to-call `tel:` links.
- Structured data remains safe for Search Console: no Product or Offer JSON-LD is used; LocalBusiness and FAQ data describe service areas and quote guidance without fake prices.

## Cloudflare Runtime Requirements

Required Worker values:

- `QUOTE_EMAIL_FROM`
- `SALES_EMAIL`
- `WHATSAPP_TO_PHONE`
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

- Premium header with top utility strip, logo, search, state-driven navigation and in-site WhatsApp/support CTA.
- Category navigation for major product groups that opens the compact catalogue panel and highlights the selected category.
- Home area with clear business positioning, premium hero carousel and hero trust badges.
- Hero messaging leads with "Tiles. Sanitaryware. Paints.", retail/wholesale/project quote positioning and Nairobi, Machakos and Makueni service areas.
- Compact segmented content area for Catalogue, About, Guidance and Quote.
- Catalogue panel with clickable category cards, icons, descriptions and quote CTAs.
- Catalogue cards include compact use-case and quote-support tags to reinforce sourcing, delivery and professional guidance.
- Catalogue category cards include consistent premium "View guide" links. Dedicated category guides point to their landing pages; Outdoor Tiles points to floor tile guidance and Installation Support points to the contact/quote flow.
- Category landing pages for `/floor-tiles`, `/wall-tiles`, `/bathroom-tiles`, `/sanitaryware`, `/paints` and `/adhesives-grout`.
- About panel with Kleihaus positioning, service areas and concise trust/support points.
- Guidance panel with concise quote-planning tips.
- Quote panel with the existing quote form and direct contact details.
- Mobile layout uses reduced hero sizing, compact trust badges and catalogue cards, narrowed panel spacing and a sticky WhatsApp support / Request Quote action bar.
- Mobile footer places the support modal CTA above the green branding strip; the green strip remains the final visible footer element.
- WhatsApp/support CTAs open the support modal on Kleihaus.com; support modal submissions use `/api/quote-request` with `channel: "whatsapp"`.
- Structured footer with balanced Products, Services and Contact columns plus WhatsApp, email, phone and locations.
- Footer Services is intentionally concise: Finishing Advisory, Delivery and Installation.

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
- Category landing pages use safe `CollectionPage`, `BreadcrumbList` and `ItemList` JSON-LD only.
- `public/sitemap.xml` includes the homepage and six category landing page URLs without fragment-only sitemap entries.
- Incomplete Product rich-result schema was removed for quote-based catalogue categories without fabricating price, review, rating or availability data.
- Product and Offer schema must not be reintroduced until Kleihaus has real product pages with truthful price and current availability data.
- One primary H1 on the homepage.
- H2/H3 hierarchy for major sections.
- Crawlable category and guide content.
- Image alt text coverage.
- Image SEO uses meaningful alt text, lazy loading for non-hero/gallery images and eager loading only for first hero or lead category images.
- Frontend images are served through AVIF, WebP and original JPG/PNG fallbacks using `<picture>` where rendered by React.
- Larger public images also have width-specific AVIF and WebP variants such as 480w, 768w, 1024w and 1440w. The React image helper emits `srcSet` and context-aware `sizes` for hero, catalogue card, product card, category gallery and logo contexts.
- The 33 public JPG/PNG assets total about 7.97 MB in original form, about 3.01 MB as WebP and about 1.82 MB as AVIF.
- The 28 frontend-referenced JPG/PNG assets total about 5.94 MB in original form, about 2.72 MB as WebP and about 1.66 MB as AVIF.
- Kenya-focused local SEO mentions for Nairobi, Machakos and Makueni.
- Local SEO guidance for Google Business Profile lives in `docs/LOCAL_SEO_GOOGLE_BUSINESS_PROFILE.md`; profile creation and verification must be completed manually by the business owner.

## UI UX Consistency Audit - 2026-06-05

| Component | Current state | Issues found | Recommended improvement | Priority |
| --- | --- | --- | --- | --- |
| Header and top strip | Clear brand, service areas, email, phone, search and WhatsApp entry points. | Desktop is strong; mobile header is compact but visually dense. | Keep current structure; consider a future hamburger/search simplification only if mobile analytics show friction. | Medium |
| Category chips | Horizontal product navigation with active state and quote-category tracking. | Works well; long labels rely on horizontal scrolling on narrow screens. | Preserve scroll behavior and active state; avoid wrapping chips into multiple rows. | Low |
| Hero carousel | Premium image carousel with readable overlay, dots, desktop arrows and three CTAs. | CTA styling was recently inconsistent; now aligned. | Keep the three CTA styles consistent and continue using light-balanced overlays. | High |
| Trust strip | Compact two-column mobile badges and four-column desktop layout. | No major issues after prior mobile tightening. | Keep badges short; avoid adding long descriptions that create tall cards. | Low |
| Catalogue cards | Compact two-column mobile grid with image, icon, description, guide link and quote CTA. | Card density is appropriate; mixed link/CTA hierarchy should stay simple. | Continue limiting descriptions to two lines and keep quote CTA prominent. | Medium |
| About tab | Clear positioning and support points inside the compact panel. | Support cards were slightly taller than catalogue cards on mobile. | Implemented tighter padding, icon sizing and body text rhythm. | Medium |
| Guidance tab | Useful quote-planning prompts in card form. | Cards were slightly tall on mobile. | Implemented tighter card padding, icon sizing and text rhythm. | Medium |
| Quote tab | Quote form remains focused and clears after backend success. | No UI changes recommended without retesting submission conversion. | Preserve current validation, reset and success behavior. | High |
| Category landing pages | Lightweight quote-oriented SEO pages with galleries and safe schema. | Good foundation; pages should avoid becoming full product pages without real stock/price data. | Add location-specific pages only after Google Business Profile and service-area strategy are confirmed. | Medium |
| Footer | Bronze three-column Products, Services and Contact layout with green branding strip. | Recently tightened and aligned; no further content removal needed. | Keep footer compact and avoid reintroducing branding-column height. | Low |
| Mobile sticky WhatsApp | Useful CTA hidden on Quote panel and when footer is visible. | Can still feel visually dominant on some small screens. | Monitor real-device behavior; keep footer CTA above green strip. | Medium |

Consistency notes:

- Typography is mostly consistent: concise eyebrow labels, balanced headings, readable body text and compact mobile card copy.
- Button styles now follow clearer groups: dark primary buttons, translucent hero CTAs, green quote CTAs and bordered secondary buttons.
- Card radius and shadows are broadly consistent; avoid introducing larger decorative cards inside compact panels.
- Icon sizing is now more consistent in compact About and Guidance cards.
- Focus states, alt text, button labels and ARIA attributes are present for the main interactive elements.
- No Product or Offer structured data should be added until real product pages, truthful prices and current availability exist.

## Final Mobile QA And Accessibility Audit - 2026-06-05

Rendered live-site QA was completed at 360px, 390px, 412px and 430px mobile viewport widths.

| Area | Result | Notes |
| --- | --- | --- |
| Header | Pass | Logo, WhatsApp CTA and hamburger menu remain visible on narrow screens. |
| Category chips | Pass | Horizontal chip layout fits mobile without clipped text. |
| Hero carousel | Pass | Mobile H1 measured at 34px, hero CTAs are visible and carousel controls remain labelled. |
| Trust and catalogue areas | Pass | Cards remain compact with no large blank support-card gaps detected in the rendered layout. |
| Segmented panels | Pass | Catalogue, About, Guidance and Quote tabs fit at tested widths. |
| Quote form | Pass | Existing form controls remain labelled by visible text or placeholders and continue posting to `/api/quote-request`. |
| Footer | Pass | Bronze footer remains compact; mobile WhatsApp footer CTA sits above the green branding strip. |
| Green branding strip | Pass | The final footer line remains `© 2026 Kleihaus Ceramics. All Rights Reserved. Inspiring Living`. |
| Structured data | Pass | Live HTML contains no Product or Offer schema; Organization, LocalBusiness, Store, WebSite, FAQPage and ItemList remain. |
| Accessibility labels | Fixed | Clickable catalogue category image buttons now include explicit `aria-label` values. |

Lighthouse and axe command-line packages were not available in the local npm cache and were not added to avoid introducing audit-only dependencies. Manual equivalents were completed through rendered DOM checks for heading order, image alt text, accessible control names, focus-visible styling, canonical metadata, schema types, sitemap and robots availability.

Performance observations:

- Production build remains compact for a React/Vite marketing site: main JavaScript is approximately 217 kB before gzip and 65.5 kB after gzip.
- CSS is approximately 32.7 kB before gzip and 6.7 kB after gzip.
- Hero/logo images load eagerly where needed; non-hero catalogue imagery uses lazy loading.
- WebP and AVIF variants now exist for frontend-referenced JPG/PNG images; remaining performance work should focus on right-sized responsive image widths for very large source photos.
- Responsive width variants now cover larger image assets; future performance work should focus on periodic image QA when new catalogue photos are added.

## Responsive Image And SEO Copy Polish - 2026-06-05

| Area | Result | Notes |
| --- | --- | --- |
| Responsive images | Pass | Width-specific AVIF/WebP variants were generated for larger public images while preserving originals and full-size modern fallbacks. |
| Image rendering | Pass | `OptimizedImage` now emits AVIF-first and WebP-second `srcSet` values plus context-aware `sizes`. |
| Guide links | Pass | Homepage category cards use consistent `View guide` text, premium styling, accessible labels and expected targets. |
| Content voice | Pass | Visible homepage, FAQ, quote and category-page copy was tightened into active, confident language without overpromising stock, prices or delivery. |
| Technical SEO | Pass | Sitemap includes category URLs, robots references the sitemap, canonical URLs are preserved and no Product or Offer schema is present. |

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
- Expand location-specific SEO pages only after the service-area strategy and verified Google Business Profile details are settled.
- Add automated monthly management reports for search, quote and WhatsApp trends.
- Continue testing mobile layout, WhatsApp links, quote flow and build output before every push.
