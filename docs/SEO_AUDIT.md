# Kleihaus SEO Audit

## Comprehensive SEO Audit - 2026-06-24

This section is the current repo-level audit for Kleihaus Ceramics. It is audit-only: no application code, Cloudflare configuration, DNS, Worker routing, secrets, deployment settings or backend endpoint paths were changed.

### Phase 1 Implementation Note - 2026-06-24

After this audit was written, Phase 1 repo-only improvements were implemented:

- Optional GA4 readiness through `VITE_GA_MEASUREMENT_ID`.
- Conversion hooks for quote, WhatsApp, phone, email, guide and location events.
- Richer Nairobi, Machakos and Makueni hub content with visible local FAQs.
- Safe route-level Service schema for service-location pages and FAQPage schema where local FAQ content is visible.
- README and `.env.example` documentation for GA4/Search Console configuration.

Product, Offer, AggregateRating and review schema remain intentionally excluded.

### Analytics And Search Console Setup Note - 2026-06-25

The remaining post-Phase 1 setup is documented in `docs/ANALYTICS_AND_SEARCH_CONSOLE_SETUP.md`.

- `VITE_GA_MEASUREMENT_ID` must be added to the Cloudflare Workers Builds environment before the production build runs.
- `VITE_ANALYTICS_DEBUG=true` is available for temporary non-sensitive analytics debugging and is disabled by default.
- Search Console should verify `https://www.kleihaus.com/` and submit `https://www.kleihaus.com/sitemap.xml`.
- The existing HTML verification file should only be treated as active if it matches the verification file issued by Google for the current property.
- No fake GA4 ID, fake Search Console verification code, Product schema or Offer schema should be committed.

### Executive Summary

Kleihaus has a solid SEO foundation for a Vite + React single-page site. The homepage has static metadata in `index.html`; the React app adds route-aware titles, descriptions, canonicals, Open Graph/Twitter metadata and safe JSON-LD for category, guide and location routes; `robots.txt` and `sitemap.xml` are present; and Product/Offer schema is intentionally avoided because the site is quote-led rather than price-led.

The biggest remaining opportunity is not basic metadata. It is depth, rendering strategy and measurement: route metadata is client-side, several local/service pages use repeatable templates that need periodic unique content expansion, GA4 conversion tracking is not implemented, and performance can still improve by pruning original heavy images from delivery paths and splitting JavaScript.

### Scores

| Area | Score | Rationale |
| --- | ---: | --- |
| Overall SEO | 82/100 | Strong route inventory, sitemap, safe schema and local coverage; limited by SPA metadata rendering and content depth variance. |
| Technical SEO | 84/100 | Good static homepage metadata, route-aware client metadata, canonicals, sitemap and robots. Server-rendered per-route metadata is the main gap. |
| Local SEO | 80/100 | Nairobi, Machakos and Makueni hubs plus service-location pages exist. Needs richer proof, GBP alignment and location-specific FAQs/testimonials. |
| Content SEO | 78/100 | Core commercial and guide topics are covered. Needs deeper topical clusters, stronger E-E-A-T proof and careful expansion beyond template pages. |
| Schema | 86/100 | Safe Organization, LocalBusiness/HomeAndConstructionBusiness, WebSite/SearchAction, FAQPage, ItemList, CollectionPage and BreadcrumbList usage. Service schema can be added carefully. |
| Image SEO | 82/100 | Alt text is generally descriptive and responsive AVIF/WebP support exists. Some original JPG/PNG files remain large and fallback-heavy. |

### Route Inventory

Product/service landing pages:

- `/tiles`
- `/floor-tiles`
- `/wall-tiles`
- `/bathroom-tiles`
- `/sanitaryware`
- `/paints`
- `/adhesives-grout`
- `/installation-support`

Location hubs:

- `/locations/nairobi`
- `/locations/machakos`
- `/locations/makueni`

Product/service plus location pages:

- `/tiles-nairobi`, `/tiles-machakos`, `/tiles-makueni`, `/tiles-kenya`
- `/sanitaryware-nairobi`, `/sanitaryware-machakos`, `/sanitaryware-makueni`, `/sanitaryware-kenya`
- `/paints-nairobi`, `/paints-machakos`, `/paints-makueni`, `/paints-kenya`
- `/installation-support-nairobi`, `/installation-support-machakos`, `/installation-support-makueni`, `/installation-support-kenya`

Guide/content pages:

- `/tile-buying-guide`
- `/bathroom-renovation-guide`
- `/paint-selection-guide`
- `/adhesive-grout-guide`
- `/installation-best-practices`
- `/cost-estimation-guide`

Location-specific guide pages such as `/tile-buying-guide-nairobi` and `/cost-estimation-guide-machakos` do not exist. That is the right choice for now because the current location hubs provide local context without producing many near-duplicate guide pages.

### Technical SEO Findings

| Finding | Current implementation | Gap | Priority |
| --- | --- | --- | --- |
| Static homepage metadata | `index.html` has title, description, canonical, robots, Open Graph, Twitter/X tags and theme color. | Strong for homepage. Keep current metadata aligned with live business positioning. | Low |
| Route metadata | `SeoManager` updates title, description, canonical, OG/Twitter and route JSON-LD client-side. | Crawlers that do not execute JS may see only homepage metadata on deep routes. | High |
| Canonical tags | Homepage canonical is static; route canonical is updated in React. | Same SPA rendering limitation as above. Consider Worker-side HTML metadata injection for routes. | High |
| Robots directives | Static `index, follow, max-image-preview:large`; `robots.txt` allows all and points to sitemap. | Good baseline. Add noindex only for future admin/private routes if they become public. | Low |
| Sitemap | `public/sitemap.xml` lists homepage, category, location, service-location and guide URLs with `lastmod`, `changefreq` and priorities. | Needs process discipline so every new route is added. | Medium |
| Structured data | Homepage static JSON-LD plus route-level JSON-LD. No Product/Offer schema found in `index.html` or `src/App.jsx`. | Could add conservative Service schema for real services, but avoid Product/Offer. | Medium |
| Heading hierarchy | Routes use visible H1/H2/H3 structure in `src/App.jsx`. | Because many sections live on one React component, future edits should avoid multiple competing H1s on the homepage view. | Medium |
| Internal linking | Footer, related links and guide links connect categories, guides and location hubs. | Add contextual links inside body copy, not only footer/related chips. | Medium |
| URL structure | Clean readable slugs for services, guides and locations. | Avoid adding dozens of near-identical location-guide permutations. | Low |
| Breadcrumbs | Route JSON-LD includes BreadcrumbList. | No visible breadcrumb UI. Consider compact visible breadcrumbs on deep routes. | Medium |
| Duplicate/thin content | Location-service pages are generated from shared templates with local/service variation. | Add unique examples, FAQs and local proof over time to avoid doorway-page risk. | High |

### Local SEO Findings

Current strengths:

- Service areas are visible in top/contact messaging and schema: Nairobi, Machakos, Makueni and Kenya.
- Dedicated location hubs exist for Nairobi, Machakos and Makueni.
- Service-location pages cover tiles, sanitaryware, paints and installation support.
- `public/google1e52ed9d448e7c74.html` suggests Search Console HTML verification support exists.

Gaps and recommendations:

| Recommendation | Expected impact | Effort | Priority | Risk |
| --- | --- | --- | --- | --- |
| Add stronger NAP consistency checks across homepage, footer, schema, GBP and docs. | Better local trust and GBP consistency. | Low | High | Low |
| Add locally useful FAQs to each location hub, not every guide page. | More local intent coverage without doorway pages. | Medium | High | Low |
| Add project/use-case proof where truthful, such as "bathroom renovation support in Machakos" examples. | Higher conversion and location relevance. | Medium | High | Medium if claims are not verified |
| Add GBP tracking URLs for website/quote links once GA4 is ready. | Better conversion attribution from GBP. | Low | Medium | Low |
| Avoid `/guide-location` page explosions unless each page has unique local logistics, climate, availability and advisory content. | Protects against duplicate/thin content. | Low | High | Low |

### Content SEO Findings

Strengths:

- Homepage clearly targets tiles, sanitaryware, paints, adhesives, tools, delivery and installation support.
- The About section now positions Kleihaus as a finishing partner, not just a retailer.
- Installation Support content covers workflow topics: measurement, preparation, cutting, fixing, grouting, cleaning and training guidance.
- Buying guides cover tile buying, bathroom renovation, paint selection, adhesive/grout, installation best practices and cost estimation.

Content gaps:

- No dedicated pages for grout colors, tile sizes, outdoor/non-slip tiles, kitchen tiles, bathroom accessories, taps/mixers, basins/toilets, roof paint, exterior paint, interior paint and fundi/installer training.
- Limited social proof: no testimonials, project case studies, showroom photos with context, delivery examples or installer support stories.
- FAQ depth is intentionally compact, but Search Console data may reveal specific long-tail questions worth adding.
- No visible author/editorial policy or updated dates for guide content.

Priority content opportunities:

1. Add high-intent subcategory guides: kitchen tiles, outdoor tiles, bathroom accessories, taps and mixers, basins and toilets, roof paint, exterior paint, grout and adhesive selection.
2. Add "What to send for a quote" examples per category to reduce back-and-forth.
3. Add locally useful location hub expansions, not duplicate guide-location pages.
4. Add project case studies when truthful photos and details are available.
5. Add short trust proof blocks: years served, showroom/service area clarity, delivery process, installer guidance approach.

### Schema Audit

Current schema types detected:

- Organization
- LocalBusiness
- Store
- HomeAndConstructionBusiness
- ContactPoint
- WebSite
- SearchAction
- FAQPage
- ItemList
- CollectionPage
- WebPage
- BreadcrumbList
- ImageObject

Product, Offer, AggregateRating and review schema are intentionally absent from active source. This is correct because Kleihaus does not publish product-level prices, availability or verified review data.

Recommended schema enhancements:

- Add conservative Service schema only for real services such as finishing advisory, delivery coordination, installation support and tailored training.
- Add `sameAs` only after official social/GBP URLs are confirmed.
- Add visible business hours first, then mirror them in LocalBusiness schema.
- Keep FAQ schema aligned with visible FAQ content.
- Do not add Product/Offer schema until actual product pages display truthful price, currency, availability and offer details.

### Image SEO

Strengths:

- Most active images in `src/App.jsx` have descriptive alt text.
- `OptimizedImage` provides AVIF first, WebP second and original fallback.
- Non-critical images use lazy loading and async decoding.
- Placeholder fallback exists for failed image loads.

Gaps:

- Some hero and catalogue data still reference original JPG/PNG paths as fallbacks. This is okay, but the originals remain copied to `dist`.
- Largest originals include `sink-gold-1.png` at about 1.55 MB, `kleihaus-logo.jpg` at about 547 KB, `shower-rail-1.jpg` at about 497 KB and `taps-display-1.jpg` at about 427 KB.
- Logo file could be replaced by a smaller optimized square source for favicon/logo use.

### Priority SEO Roadmap

Critical:

- None found in repo. The site is indexable and has active sitemap/robots/schema.

High:

- Add Worker-side route metadata injection or a prerender/static route generation strategy for deep URL metadata.
- Expand location hubs with unique local proof and FAQs while avoiding duplicate location-guide pages.
- Add GA4/Search Console conversion measurement so SEO decisions are based on data.

Medium:

- Add visible breadcrumbs to category, guide and location pages.
- Add Service schema for verified services.
- Add more body-copy internal links between related category, guide and location pages.
- Reduce delivered original image weight and prune unused originals from the deploy artifact if safe.

Low:

- Add updated/reviewed dates for guide pages.
- Add more social preview-specific images.
- Add a lightweight editorial/contact policy page if content publishing grows.

---

Date: 2026-06-18

This audit covers repo-level SEO implementation for the active Kleihaus architecture:

```text
GitHub main
-> Cloudflare Workers Builds
-> Worker Assets
-> Worker "kleihaus"
-> kleihaus.com / www.kleihaus.com
```

No DNS, Cloudflare settings, Worker bindings, secrets, backend API routes, quote form behavior or WhatsApp/support routing were changed.

## Scope Checked

- `index.html`
- `src/App.jsx`
- `public/sitemap.xml`
- `public/robots.txt`
- `public/site.webmanifest`
- Public image metadata and alt text usage
- Route-aware metadata logic
- JSON-LD structured data
- Canonical URLs
- Open Graph and Twitter Card tags
- Internal category links and route coverage
- Local SEO signals for Nairobi, Machakos, Makueni and Kenya

## Current Strengths

- Homepage static metadata includes a focused title, meta description, canonical URL, Open Graph tags and Twitter Card tags.
- The React app updates title, description, canonical, Open Graph, Twitter Card and JSON-LD metadata for category guide routes.
- The site uses safe structured data: Organization, LocalBusiness/HomeAndConstructionBusiness, WebSite/SearchAction, FAQPage, ItemList, CollectionPage and BreadcrumbList.
- FAQ JSON-LD is aligned with visible FAQ content and avoids fake pricing claims.
- Category pages contain descriptive H1/H2 content, meaningful image alt text and related category links.
- `robots.txt` allows public crawling and points to the sitemap.
- Sitemap coverage is focused on real public routes only.
- Image optimization work is already in place with modern image variants and lazy loading for non-critical images.

## Issues Found

- A broad `/tiles` route was expected for SEO coverage but was not yet represented as a dedicated category landing page.
- Sitemap entries did not include `lastmod` values or the broader `/tiles` route.
- Static homepage social image metadata relied on the logo instead of a richer site image suitable for previews.
- Static ItemList category URLs pointed to the homepage catalogue anchor rather than the real category guide routes.
- LocalBusiness schema did not fully reflect Kleihaus' current value proposition around tools, finishing advisory, delivery coordination, installation support and tailored training.
- The broader `/tiles` guide needed a visible internal link so it was not sitemap-only.

## Fixes Implemented

- Added a dedicated `/tiles` route with route-aware title, description, canonical URL, category content, images and safe CollectionPage metadata.
- Added `/tiles` to `public/sitemap.xml` and added `lastmod` values for every sitemap URL.
- Updated Open Graph and Twitter image metadata to use a representative Kleihaus site image with alt text.
- Enriched LocalBusiness structured data with HomeAndConstructionBusiness, service types and natural `knowsAbout` terms for materials, tools, delivery, installation and training.
- Updated homepage ItemList JSON-LD so catalogue category items link to real category routes.
- Added crawlable footer product links for category guide routes, including `/tiles`.
- Updated the web manifest description to include tools, delivery coordination, installation support and finishing advisory.

## 2026-06-18 Local SEO Phase

Additional route-aware pages were added for local service visibility:

- Tiles: `/tiles-nairobi`, `/tiles-machakos`, `/tiles-makueni`, `/tiles-kenya`
- Sanitaryware: `/sanitaryware-nairobi`, `/sanitaryware-machakos`, `/sanitaryware-makueni`, `/sanitaryware-kenya`
- Paints: `/paints-nairobi`, `/paints-machakos`, `/paints-makueni`, `/paints-kenya`
- Installation support: `/installation-support-nairobi`, `/installation-support-machakos`, `/installation-support-makueni`, `/installation-support-kenya`

Content SEO guide pages were added:

- `/tile-buying-guide`
- `/bathroom-renovation-guide`
- `/paint-selection-guide`
- `/adhesive-grout-guide`
- `/installation-best-practices`
- `/cost-estimation-guide`

These pages use shared page components but varied service/location content, unique H1/title/description values, crawlable internal links, visible support sections and safe CollectionPage/WebPage plus BreadcrumbList JSON-LD. The copy uses service-area language such as "supporting projects in" and avoids unverified branch claims.

Location-specific guide audit:

- Location-specific guide routes such as `/tile-buying-guide-nairobi`, `/tile-buying-guide-machakos`, `/tile-buying-guide-makueni`, `/cost-estimation-guide-nairobi`, `/cost-estimation-guide-machakos` and `/cost-estimation-guide-makueni` were not present.
- Creating every guide-location combination is not recommended right now because the repo does not yet contain enough distinct local evidence, photos, project examples or maintained pricing/logistics detail for each combination.
- The preferred structure is location hubs: `/locations/nairobi`, `/locations/machakos` and `/locations/makueni`.
- Each hub contains location-relevant project planning, delivery/logistics considerations, product availability framing, advisory guidance and crawlable links to tiles, sanitaryware, paints, installation support and core guides.
- This structure keeps local intent coverage while reducing duplicate content, doorway-page and keyword cannibalization risk.

Performance SEO findings:

- Existing optimized image component, responsive image variants, lazy loading and aspect-ratio classes remain in use.
- New local/guide pages reuse existing assets and image rendering patterns, so no new heavy media or dependencies were added.
- Above-the-fold route images keep eager loading only where the existing page component already uses it; gallery images remain lazy loaded.

Footer/internal linking updates:

- Added compact crawlable footer links for popular searches, project guides and locations served.
- Related page chips on guide/local pages use real anchors, not JavaScript-only actions.

## Structured Data Policy

No Product, Offer, AggregateRating or review schema was added.

This is intentional. Kleihaus currently presents quote-led categories rather than product-level pages with live prices, availability or verified reviews. Adding Product rich-result schema without those facts would risk Search Console warnings and misleading markup.

## Public Route Coverage

- `/`
- `/tiles`
- `/floor-tiles`
- `/wall-tiles`
- `/bathroom-tiles`
- `/sanitaryware`
- `/paints`
- `/adhesives-grout`
- `/installation-support`
- 16 local SEO service routes for Nairobi, Machakos, Makueni and Kenya
- 6 project/content guide routes
- 3 location hub routes: `/locations/nairobi`, `/locations/machakos`, `/locations/makueni`

## SPA Metadata Limitation

Kleihaus is a Vite single-page app. The static `index.html` provides strong homepage metadata for crawlers and social previews. Category route metadata is updated client-side after JavaScript loads.

Most modern search crawlers can process client-rendered metadata, but static source inspection tools may only see the homepage defaults. If future SEO needs become more demanding, the next step would be an edge-rendered or prerendered metadata strategy without changing the active Worker Assets architecture.

## Verification Checklist

- Run `npm install`.
- Run `npm run build`.
- Run `git diff --check`.
- Validate JSON-LD blocks parse as JSON.
- Scan source and build output for Product, Offer and AggregateRating schema.
- Confirm `robots.txt` references `https://www.kleihaus.com/sitemap.xml`.
- Confirm sitemap XML includes all current public routes.
- After deployment, run Google Rich Results Test and request validation in Google Search Console.
- Inspect important new URLs in Search Console after deployment.
- Monitor impressions and crawl/index coverage for local service and guide URLs.

## Remaining Recommendations

- Submit the updated sitemap in Google Search Console after deployment.
- Use Google Rich Results Test on the homepage and key guide routes.
- Keep Google Business Profile categories, service areas, phone number and website URL aligned with the site copy.
- Keep local landing pages useful and periodically refreshed with real service details, photos and customer questions.
- Continue avoiding Product/Offer schema until product-level pages have real displayed prices, availability and accurate offer details.
