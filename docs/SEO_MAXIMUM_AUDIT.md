# Kleihaus Maximum Automated SEO Audit

Audit date: 2026-08-20

Production site: https://www.kleihaus.com

## Executive Summary

The Kleihaus automated SEO system is functioning and has been strengthened without adding duplicate automation. The central SEO manifest continues to drive metadata, canonicals, sitemap entries, robots output, JSON-LD, navigation and generated route HTML. The build-time SEO engine now exposes a fuller scorecard, refreshes current `lastmod` values, ranks more commercial content opportunities and produces stronger route-to-route internal-link recommendations for products, guides, locations, projects and services.

The biggest organic-growth constraint is no longer basic technical SEO. It is content depth and evidence: Kleihaus needs owner-approved pages for calculators, buying guides, delivery planning, training/support and project advisory topics, plus Search Console/GA4/GBP data connections for performance-led prioritization.

## Scorecard

| Area | Before | After |
| --- | ---: | ---: |
| Overall SEO effectiveness | 100/100 | 100/100 |
| Technical SEO | 100/100 | 100/100 |
| Content SEO | 100/100 | 100/100 |
| Local SEO | 94/100 | 94/100 |
| Product SEO | not separately scored | 92/100 |
| Automation | not separately scored | 100/100 |
| Performance SEO | not separately scored | 94/100 |
| Internal linking | 100/100, 104 recommendations | 100/100, 183 recommendations |
| Schema SEO | 96/100 | 96/100 |
| Image SEO | 100/100 | 100/100 |
| Monitoring | 88/100 | 88/100 |
| Business SEO | not separately scored | 90/100 |

## Evidence From The Repository

- `src/seoManifest.js` contains 39 normalized SEO routes and now uses `SEO_LASTMOD = 2026-08-20`.
- `scripts/seo-engine.mjs` generates sitemap, robots, navigation, internal-link recommendations, image manifest, SEO report, content suggestions, GBP/social drafts, executive report and dashboard.
- `npm run seo` now delegates to the existing `seo:generate` command so the requested validation command works without creating duplicate automation.
- `public/sitemap.xml` is generated from the manifest and contains 39 URLs.
- `public/images/image-manifest.json` audits 62 image groups with WebP, AVIF and fallback coverage.
- `.github/workflows/seo-production-monitor.yml` runs full-route production verification on relevant pushes, daily schedule and manual dispatch, with report artifacts and issue alerts on failure.
- `scripts/verify-production-seo.mjs` checks production endpoints, sitemap/manifest consistency, route metadata, canonicals, Open Graph, Twitter metadata, JSON-LD validity and forbidden schema types.

## Automation Findings

Working well:

- One central route manifest drives route-level title, description, canonical, image, breadcrumbs, schema, sitemap and route HTML generation.
- Build-time automation runs through `npm run build`.
- Production verification covers every manifest route with `--all-routes`.
- Generated dashboard and reports do not fabricate GA4, Search Console or Google Business Profile metrics.
- Forbidden schema guardrails remain active for Product, Offer, Review and AggregateRating.

Issues fixed:

- Added the missing `npm run seo` alias to the existing generator.
- Refreshed manifest `lastmod` from 2026-08-06 to 2026-08-20.
- Expanded generated scorecards to include product, automation, performance, monitoring, internal-link, image, schema and business SEO scores.
- Strengthened core-route related-link declarations so internal-link recommendations increased from 104 to 183.
- Expanded high-intent opportunities from 10 to 14, adding tools/accessories, delivery planning, fundi/installer training and project advisory topics.

Remaining limitations:

- Scheduled monitoring is configured, but long-term scheduled-run continuity and alert recurrence still need observation over time.
- Search Console, GA4 and GBP APIs are not connected to the automation, so live impressions, CTR, position, lead and GBP metrics remain null.
- Generated recommendations are not yet visible on every page; they are available for implementation in future page blocks.

## Technical SEO Audit

The technical foundation is strong. The current automation validates titles, descriptions, canonicals, Open Graph metadata, Twitter/X metadata, robots, sitemap, JSON-LD, route HTML and public JSON endpoints. The SPA indexing risk is reduced by route-specific HTML generation and Worker-side metadata behavior already present in the project.

No evidence of duplicate titles, duplicate descriptions, duplicate canonicals, forbidden schema, broken sitemap references or stale generated route coverage was found after regeneration.

Hreflang is not applicable because the site currently targets one language/market presentation.

## Product SEO Audit

Product coverage exists for tiles, floor tiles, wall tiles, bathroom tiles, sanitaryware, paints, adhesives/grout and installation support. Product SEO is strong structurally but still limited by content depth.

Category findings:

- Tiles: strong main category plus floor, wall, bathroom and location variants. Best next gains are tile calculator, layout guide and commercial tile guide.
- Sanitaryware: strong image support and location variants. Best next gains are a sanitaryware buying guide and bathroom renovation cost guide.
- Paints: solid interior/exterior/roof/floor intent coverage. Best next gain is deeper paint selection content around coverage and surface condition.
- Adhesives: supported through route metadata and guide opportunity. Best next gains are adhesive calculator and tools/accessories guide.
- Tools: present in copy and imagery but not yet a dedicated visible content hub.
- Installation services: strong route and guide coverage, with an opportunity for fundi/installer training content.
- Delivery: present as support copy but not yet a dedicated planning guide.
- Training: present as support concept but not yet a dedicated training/installer page.
- Project advisory: supported by `/trade-projects` and `/projects`, but a quote-preparation checklist would improve commercial search capture.

## Local SEO Audit

Nairobi, Machakos and Makueni are represented through location hubs and service-location routes. Each location has manifest metadata, canonicals, route HTML and sitemap coverage. Kenya-wide routes also exist for products/services where broader service-area intent is useful.

Recommended additional Kenyan locations should wait for owner confirmation of genuine demand, delivery capability or showroom/service evidence. Likely future candidates, if supported by business evidence, are Kiambu, Kajiado, Kitengela/Athi River, Thika and Nakuru because they align with construction and renovation demand near the current service geography.

## Content SEO Audit

The site has a solid base for guides, FAQs, projects, solutions, locations and products. The highest-value gaps are quote-ready informational pages:

- Tile Quantity Calculator
- Adhesive Calculator
- Bathroom Renovation Cost Guide
- Sanitaryware Buying Guide
- Kitchen Renovation Guide
- Tile Installation Guide
- Tile Layout Guide
- Commercial Tile Guide
- Warehouse Flooring Guide
- Tile Tools And Accessories Guide
- Delivery Planning Guide
- Fundis And Installer Training Guide
- Project Advisory Checklist

No speculative price, stock, review, branch or product claims should be added until owner-confirmed.

## Competitor Benchmark

Based on the previously documented competitor/source review in `docs/SEO_DIGITAL_MARKETING_CAMPAIGN.md`, larger tile and sanitaryware competitors tend to win through deeper catalogues, stronger buyer guides, more project inspiration, richer product discovery and broader local/service pages. Kleihaus should not copy enterprise catalogue tactics blindly. The appropriate benchmark response is:

- Build practical Kenyan buying guides and calculators.
- Use genuine project and product imagery.
- Strengthen product-to-location and guide-to-product internal links.
- Keep quote and WhatsApp conversion paths clear.
- Avoid unsupported Product/Offer/review schema until product-level facts exist.

## Analytics And Measurement

GA4 wiring is present and `npm run analytics:verify` validates required event mappings. Search Console readiness exists through sitemap and verification file support. The automation correctly leaves live metrics as null until approved credentials or exports are connected.

The GA4 Playwright verification remains a separate live-browser concern documented in `docs/GA4_PLAYWRIGHT_VERIFICATION.md`; this SEO audit did not expose Measurement IDs or credentials.

## Expected Impact

- Product discoverability: improved through 183 generated internal-link recommendations, stronger product-route relationships and expanded product/service content opportunities.
- Organic traffic: expected to improve most after publishing the calculator and guide opportunities, especially tile quantity, adhesive, bathroom renovation cost and sanitaryware buying topics.
- Customer acquisition: expected to improve through better quote-ready content that attracts users already planning quantities, delivery, installation and finishing decisions.
- Crawl efficiency: improved by refreshed sitemap `lastmod`, route-focused internal-link recommendations and continued route HTML generation.

## Remaining Recommendations

1. Build the top three high-intent pages after owner approval: Tile Quantity Calculator, Adhesive Calculator and Bathroom Renovation Cost Guide.
2. Add visible related-link blocks using the generated internal-link manifest.
3. Add owner-confirmed delivery-area details before expanding location pages.
4. Add genuine project proof and showroom imagery where available.
5. Connect Search Console and GA4 exports/API access for data-led prioritization.
6. Observe scheduled GitHub SEO monitor runs over several weeks to confirm continuity and alert behavior.
7. Keep schema conservative until visible product-level facts support richer types.
