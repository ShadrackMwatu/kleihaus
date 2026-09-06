# Kleihaus Automated SEO Report

Generated: 2026-09-06T06:02:34.594Z

Status: PASS

Technical check score: 100/100. This is not a commercial effectiveness score.

Acquisition measurement is not connected. See SEO_CLIENT_ACQUISITION_AUDIT.md and SEO_30_DAY_CLIENT_ACQUISITION_PLAN.md for evidence, limitations and business KPIs.

## Coverage

- Routes audited: 39
- Image groups audited: 62
- Primary navigation items generated: 7
- Internal-link recommendation sets: 39
- Internal-link recommendations generated: 183

## Score Breakdown

- Overall SEO effectiveness: 100/100
- Technical SEO score: 100/100
- Content score: 100/100
- Local SEO score: 94/100
- Product SEO score: 92/100
- Automation score: 100/100
- Performance score: 94/100
- Internal linking score: 100/100
- Schema score: 96/100
- Image SEO score: 100/100
- Monitoring score: 88/100
- Business SEO score: unmeasured; private acquisition data is not connected.

## Blocking Issues

- None detected.

## Warnings

- None detected.

## Automation Outputs

- public/sitemap.xml
- public/robots.txt
- public/seo-navigation.json
- public/seo-internal-links.json
- public/seo-dashboard.json
- public/images/image-manifest.json
- docs/SEO_REPORT.md
- docs/SEO_CONTENT_SUGGESTIONS.md
- docs/GBP_SOCIAL_DRAFTS.md
- docs/SEO_EXECUTIVE_REPORT.md

## Production Verification

Run `npm run seo:verify-production` after deployment to confirm Cloudflare is serving these generated outputs and route-specific metadata from the public site.

Continuous monitoring runs `npm run seo:verify-production -- --all-routes` from GitHub Actions after relevant pushes to `main`, daily at 04:00 UTC and on manual dispatch. Reports are uploaded as GitHub Actions artifacts rather than committed as daily timestamped files.

## Content Suggestions For Review

- Expand Kleihaus Guides | Buying, Planning & Installation Help with owner-confirmed FAQs, visible project proof and stronger related links.
- Expand Kleihaus Locations | Nairobi, Machakos & Makueni Support with owner-confirmed FAQs, visible project proof and stronger related links.
- Expand Kleihaus Nairobi | Tiles, Sanitaryware & Paints with owner-confirmed FAQs, visible project proof and stronger related links.
- Expand Kleihaus Machakos | Tiles, Sanitaryware & Paints with owner-confirmed FAQs, visible project proof and stronger related links.
- Expand Kleihaus Makueni | Tiles, Sanitaryware & Paints with owner-confirmed FAQs, visible project proof and stronger related links.
- Expand Tile Buying Guide Kenya | Kleihaus Ceramics with owner-confirmed FAQs, visible project proof and stronger related links.
- Expand Bathroom Renovation Guide Kenya | Kleihaus Ceramics with owner-confirmed FAQs, visible project proof and stronger related links.
- Expand Paint Selection Guide Kenya | Interior, Exterior & Roof Paints with owner-confirmed FAQs, visible project proof and stronger related links.

## High-Intent Content Opportunities

- P1: Tile Quantity Calculator (Very high) -> Captures homeowners, contractors and builders who are close to requesting tile quantities and quotes.
- P2: Adhesive Calculator (Very high) -> Connects tile size, substrate and area planning to adhesive, grout and accessory quote enquiries.
- P3: Bathroom Renovation Cost Guide (Very high) -> Targets bathroom planners comparing tiles, sanitaryware, taps, showers and installation support.
- P4: Sanitaryware Buying Guide (High) -> Supports basin, toilet, mixer, shower and accessory enquiries without unsupported price or stock claims.
- P5: Kitchen Renovation Guide (High) -> Links project-gallery interest to tiles, sinks, mixers, counters and quote-ready kitchen planning.
- P6: Tile Installation Guide (High) -> Builds trust with DIY planners, fundis and contractors while routing them to installation support.
- P7: Tile Layout Guide (Medium high) -> Helps customers choose layouts before asking about tile sizes, trims, wastage and quantities.
- P8: Commercial Tile Guide (Medium high) -> Serves shops, offices, rentals and institutional buyers with durability and maintenance planning.
- P9: Warehouse Flooring Guide (Medium) -> Captures heavier-duty floor planning while keeping claims subject to site and product verification.
- P10: Paint Selection Guide Expansion (Medium) -> Expands existing paint advice around surface condition, coverage planning and interior/exterior use cases.
- P11: Tile Tools And Accessories Guide (Medium high) -> Targets practical tool, spacer, trim and finishing-accessory searches that support adhesive, grout and installation enquiries.
- P12: Delivery Planning Guide (Medium high) -> Supports location and logistics searches without promising unsupported delivery prices, timing or service areas.
- P13: Fundis And Installer Training Guide (Medium) -> Connects training and best-practice searches to installation support while avoiding unsupported certification claims.
- P14: Project Advisory Checklist (Medium high) -> Helps contractors, developers and homeowners prepare measurements, product lists and quote details before contacting Kleihaus.

## Monthly Draft Workflow

- Review Google Search Console queries and GA4 conversion paths.
- Compare quote requests, WhatsApp clicks, phone clicks and email leads by landing page.
- Use the internal-link manifest to strengthen pages with rising impressions but weak conversion.
- Prepare Google Business Profile and social captions from pages with fresh project, guide or product evidence.

## Guardrails

- Do not add Product, Offer, Review or AggregateRating schema unless explicitly approved and supported by visible, truthful content.
- Do not invent prices, ratings, testimonials, branches, project dates, customer names or exact stock claims.
- Keep homepage conversion prompts consolidated in the final Contact section unless the owner changes that strategy.
