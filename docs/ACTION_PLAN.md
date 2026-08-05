# Kleihaus Website Optimization Action Plan

Date: 2026-06-24

This roadmap turns the SEO and optimization audit findings into a practical 6-12 month implementation plan. It is repo-focused and respects the current architecture:

```text
GitHub main
-> Cloudflare Workers Builds
-> Worker Assets
-> Worker "kleihaus"
-> kleihaus.com / www.kleihaus.com
```

Active backend endpoint:

```text
/api/quote-request
```

No Cloudflare configuration, DNS, Worker routing, secrets, deployment settings or backend endpoint paths were changed during this audit.

## Phase 1 - Quick Wins

Highest ROI improvements requiring minimal engineering effort.

Implementation status on 2026-06-24, 2026-06-25, 2026-07-07, 2026-07-08, 2026-07-29, 2026-07-30 and 2026-08-05: GA4 readiness, conversion event hooks, richer local hub FAQs, safe route-level Service/FAQ schema additions, README setup notes, `.env.example` analytics configuration, optional non-sensitive analytics debug logging, the Analytics/Search Console setup guide, GBP UTM documentation, GBP-to-site conversion CTAs, sanitaryware image improvements, the SEO effectiveness audit, Worker-side route metadata injection, sitemap automation/lastmod freshness, visible breadcrumbs, deeper service-location content, GBP optimization guidance, topical authority roadmap, case study framework, backlink outreach plan, monthly SEO report template, the `/trade-projects` audience hub, homepage audience pathways, six consolidated customer pathways, a 90-day SEO/digital campaign plan, the homepage product-discovery positioning update, primary navigation restructuring, `/products`, `/guides` and `/locations` parent hubs, homepage content deduplication, final-Contact-only homepage conversion simplification, the build-time SEO Automation Engine, production SEO verification and four-week Search Console/GA4 monitoring templates were completed. Privacy policy, anti-spam controls, verified GA4/Search Console setup and deeper performance pruning remain open.

| Recommendation | Expected impact | Effort | Priority | Risk |
| --- | --- | --- | --- | --- |
| Add a concise privacy policy page explaining quote form data, anonymous journey events and contact channels. | Improves trust, privacy transparency and future analytics readiness. | Low | High | Low |
| Add GA4 event plan documentation before implementation: quote success, support success, WhatsApp click, phone click, email click, guide click and location CTA click. | Gives clean measurement taxonomy before tags are added. | Low | Complete | Low |
| Configure GA4/Search Console only after official account access is confirmed. | Enables conversion and organic traffic reporting. | Low | Partially complete: repo supports `VITE_GA_MEASUREMENT_ID` and documents Cloudflare Workers Builds setup; account setup remains external. | Medium due to account/access dependency |
| Add UTM standards for Google Business Profile, social posts and campaigns. | Improves attribution for local SEO and GBP conversions. | Low | Complete for GBP: recommended URL is `https://www.kleihaus.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`; broader campaign standards can follow. | Low |
| Add visible business hours or response expectation if accurate. | Improves LocalBusiness trust and reduces customer uncertainty. | Low | Medium | Low |
| Add a form honeypot field and server-side rejection. | Reduces spam with low user friction. | Low | High | Low |
| Add a release checklist covering build, sitemap, schema, quote endpoint and Workers Builds. | Reduces deployment and SEO regression risk. | Low | High | Low |
| Add visible breadcrumbs on category, guide and location pages. | Improves UX, internal linking and alignment with BreadcrumbList schema. | Low/Medium | Complete | Low |
| Review `public/images/kleihaus-logo.jpg` and replace runtime logo usage with a smaller optimized source if visual quality holds. | Reduces repeated logo payload. | Low | Medium | Low |
| Refresh sitemap `lastmod` values after meaningful content/image updates. | Helps Search Console understand freshness and reduces manual audit drift. | Low | Complete: `npm run build` regenerates `public/sitemap.xml` from `src/seoManifest.js`. | Low |
| Verify the new GBP UTM URL, GA4 events and Search Console sitemap submission after deployment. | Turns repo readiness into measurable SEO performance data. | Low | High | Low |
| Add a visible breadcrumb UI to route pages. | Aligns visible UX with BreadcrumbList schema and improves deep-route navigation. | Low/Medium | Complete | Low |
| Use the GBP optimization guide for profile photos, posts, genuine review requests and monthly performance tracking. | Converts repo readiness into local search authority and measurable profile actions. | Low/Medium | High | Low |
| Use the 90-day SEO and digital marketing campaign plan to launch audience-specific organic posts, GBP activity and owner-approved paid tests for Homeowners, Home Builders, Contractors, Property Developers, Design Professionals, and Dealers & Institutional Buyers. | Converts the `/trade-projects` pathway into measurable enquiry demand. | Medium | High | Medium due to owner/account access dependency |
| Monitor whether the revised product-first homepage improves product exploration, guide clicks and project-gallery visits before quote starts. | Confirms the commercial-positioning change is helping visitors discover suitable products before contacting sales. | Low | High | Medium due to GA4/Search Console access dependency |
| Monitor `/products`, `/guides`, `/locations` and `/trade-projects` engagement after deployment. | Confirms the new information architecture helps visitors self-select product, solution, proof, guidance and local paths before enquiry. | Low | High | Medium due to GA4/Search Console access dependency |
| Monitor whether the final-Contact-only homepage conversion layout improves product, project, guide and solution exploration before contact events. | Validates the 2026-07-30 reduction of repeated WhatsApp, quotation and location prompts. | Low | High | Medium due to GA4/Search Console access dependency |
| Review `docs/SEO_REPORT.md` after every build and resolve blocking issues before deployment. | Turns metadata, schema, sitemap, robots, image and internal-link checks into a release gate. | Low | Complete | Low |
| Run `npm run seo:verify-production` after every main deployment and record results in `docs/SEO_PRODUCTION_VERIFICATION.md`. | Confirms Cloudflare Worker output is serving generated SEO assets and route metadata correctly. | Low | Complete | Low |
| Fill `docs/SEO_GA4_4_WEEK_MONITORING_TEMPLATE.md` weekly for four weeks after deployment. | Turns Search Console, GA4, GBP and lead behavior into practical follow-up actions. | Low | High | Medium due to account access dependency |

Phase 1 success metrics:

- GA4/Search Console conversion events defined and ready.
- Privacy page live.
- Honeypot/rate-limit plan implemented or queued.
- Sitemap/schema/release checklist documented.
- Quote and support conversion reporting has a clear event taxonomy.
- SEO effectiveness audit maintained after major SEO, content, image or measurement changes.

## Phase 2 - Medium Impact

Moderate effort, meaningful gains.

| Recommendation | Expected impact | Effort | Priority | Risk |
| --- | --- | --- | --- | --- |
| Implement GA4 conversion events with privacy-safe payloads. | Provides measurable quote, WhatsApp, phone and email conversion data. | Medium | Repo-ready; external GA4 property verification remains | Medium |
| Build a monthly SEO + lead report combining Search Console queries, D1 quote records and CTA events. | Guides content and CRO decisions with actual demand signals. | Medium | High | Medium |
| Add Worker-side route metadata injection or a prerender strategy for deep routes. | Improves crawler/social preview reliability for non-homepage URLs. | Medium/High | Complete: Worker injects route head metadata and safe JSON-LD before asset response. | Medium |
| Expand location hubs with unique local FAQs, logistics notes and project examples. | Improves local search relevance without doorway-page risk. | Medium | Partially complete: service-location pages now include deeper local copy; verified project examples remain strategic work. | Low/Medium |
| Add Service schema for verified services: finishing advisory, delivery coordination, installation support and training. | Strengthens structured understanding without Product/Offer risk. | Medium | Medium | Low |
| Add focus trapping and escape-key behavior to the support modal. | Improves accessibility and keyboard usability. | Medium | High | Low |
| Add basic rate limiting using Cloudflare-native tools or Worker logic. | Protects quote endpoint from spam/abuse. | Medium | High | Medium |
| Refactor route/content arrays from `src/App.jsx` into data modules. | Reduces regression risk and makes SEO/content updates safer. | Medium | High | Medium |
| Generate sitemap from route data. | Prevents route/sitemap drift. | Medium | Complete | Low |
| Prune unused or oversized original images from runtime delivery paths where AVIF/WebP variants already cover usage. | Improves payload size and cache efficiency. | Medium | Medium | Low/Medium |
| Start the six-month topical authority roadmap, beginning with quote checklist, tile quantity and adhesive calculation guidance. | Expands useful long-tail reach without doorway pages. | Medium | High | Low/Medium |
| Run ethical backlink outreach to real suppliers, local directories, contractors and project partners. | Builds authority signals without fake links or claims. | Medium | High | Medium |
| Build a contractor/project quote checklist only after enquiries or Search Console queries confirm sustained trade demand. | Adds a useful long-tail page without thin audience doorway content. | Medium | Medium/High | Low |

Phase 2 success metrics:

- Deep routes have crawler-reliable metadata.
- Monthly report identifies top query/topic/location-to-lead patterns.
- Location hubs have meaningfully unique content.
- Quote endpoint has anti-spam protection.
- Route data and sitemap are less manual.
- Monthly SEO reporting has a repeatable template.
- GBP and backlink work is tracked with real, verifiable actions.

## Phase 3 - Strategic Enhancements

Longer-term work with strong business value.

| Recommendation | Expected impact | Effort | Priority | Risk |
| --- | --- | --- | --- | --- |
| Create verified project case studies using existing and future customer-approved assets. | Builds E-E-A-T, trust and conversion confidence. | High | High | Medium due to content approval needs |
| Add subcategory guide clusters for kitchen tiles, outdoor/non-slip tiles, grout colors, taps/mixers, basins/toilets, roof paint and exterior paint. | Expands organic reach for commercial and informational long-tail searches. | High | High | Medium |
| Add quote calculators or guided quote builders for tiles, paints and sanitaryware. | Reduces friction and increases high-quality quote requests. | High | High | Medium/High |
| Build an internal lead intelligence dashboard using D1 journey and quote data. | Helps sales prioritize high-intent leads and opportunity areas. | High | Medium | Medium |
| Add A/B testing plan for CTA wording and placement once traffic volume supports it. | Improves conversion rate with evidence. | Medium/High | Medium | Medium |
| Add structured editorial workflow for guide updates, reviewed dates and content ownership. | Strengthens long-term content quality and trust. | Medium | Medium | Low |
| Add image CDN/transformation strategy if asset volume keeps growing. | Improves Core Web Vitals and media maintainability. | High | Medium | Medium |
| Consider SSR/prerender architecture only if SPA metadata injection is insufficient. | Long-term SEO robustness. | High | Medium | High because architecture change is larger |

Phase 3 success metrics:

- New content earns Search Console impressions/clicks for relevant long-tail queries.
- Quote completion rate improves from guided flows.
- Sales can see lead source, intent, product interest and recommended follow-up.
- Core Web Vitals remain healthy as content volume grows.

## Topic Roadmap

Recommended future content clusters:

Commercial pages:

- Kitchen tiles in Kenya
- Outdoor and non-slip tiles
- Bathroom accessories
- Taps and mixers
- Basins and toilets
- Interior paints
- Exterior paints
- Roof paints
- Tile grout colors
- Tile adhesive selection
- Installer/fundi training and tools

Local content:

- Nairobi renovation and apartment finishing guide
- Machakos delivery-aware finishing guide
- Makueni durability and logistics finishing guide

Trust content:

- How Kleihaus quote support works
- What to send before requesting a quote
- Delivery coordination process
- Installation preparation checklist
- Product matching checklist
- Genuine project case studies using `docs/CASE_STUDY_TEMPLATE.md`

## Measurement Roadmap

Event taxonomy to implement after account setup:

- `quote_submit_success`
- `support_submit_success`
- `direct_whatsapp_click`
- `phone_click`
- `email_click`
- `guide_click`
- `location_cta_click`
- `category_quote_click`
- `search_query`

Recommended report views:

- Top organic landing pages
- Top Search Console queries
- Quote submissions by landing page
- WhatsApp clicks by CTA position
- Location page engagement
- Product/category interest
- Search-to-lead patterns
- Failed submissions and validation friction
- Google Business Profile profile views, calls, chat clicks and website visits
- Backlink/referral sources and referral conversions

## Guardrails

- Do not create dozens of near-duplicate location-guide pages.
- Do not add Product or Offer schema unless actual product pages show truthful price, currency, availability and offer details.
- Do not expose D1 records, analytics tables, AI prompts, secrets or internal lead scoring on public pages.
- Keep quote form email success as the required quote channel.
- Keep WhatsApp Business API notification optional and backend-only.
- Keep all personal data out of behavioral analytics events.
- Continue documenting major changes in `docs/CHANGELOG.md` and `docs/PROJECT_AUDIT.md`.
