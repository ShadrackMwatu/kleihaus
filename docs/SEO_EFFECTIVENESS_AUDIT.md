# Kleihaus SEO Effectiveness Audit

Date: 2026-07-08

This audit reviews the current Kleihaus SEO implementation after the Phase 1 SEO/conversion work, Google Business Profile conversion update, analytics/Search Console documentation, sanitaryware image update and the 2026-07-08 advanced SEO implementation. The original audit was documentation-only; the follow-up implementation added repo-level SEO improvements without changing DNS, Cloudflare bindings, secrets, routes or deployment settings.

## Executive Summary

Kleihaus has moved from a simple catalogue website into a stronger local lead-generation SEO asset. The current implementation is effective for a quote-led building and finishing materials business: the site has a broad route inventory, strong local service-area coverage, safe structured data, a generated sitemap, robots directives, Worker-injected route metadata for SPA routes, visible breadcrumbs, improved Google Business Profile conversion paths, optimized sanitaryware imagery and documented GA4/Search Console setup.

Overall SEO effectiveness is now **89/100**.

The main strength is coverage: tiles, sanitaryware, paints, adhesives/grout, installation support, location hubs, location-service pages and practical buying guides all exist and are internally linked. The 2026-07-08 implementation reduced the biggest technical gaps by adding Worker-side initial HTML metadata injection, generated sitemap output, visible breadcrumbs and deeper service-location content. A follow-up authority roadmap now documents Google Business Profile optimization, topical content, ethical backlink outreach, future genuine case studies and monthly reporting. Kleihaus still needs more real-world trust evidence over time: verified project photos, business hours if accurate, real customer review acquisition through GBP, and Search Console/GA4 performance data.

## Current SEO Scorecard

| Area | Score | What is working | What limits the score | What would raise it |
| --- | ---: | --- | --- | --- |
| Overall SEO effectiveness | 89/100 | Strong quote-led local SEO foundation, safe schema, generated sitemap, local routes, guide content, GBP conversion path and image improvements. | Limited proof signals, no confirmed live GA4/Search Console data yet and some performance debt from legacy media. | Verified measurement, richer local proof, business hours if accurate, ongoing content expansion and performance pruning. |
| Technical SEO | 91/100 | Worker-injected initial route metadata, route-aware React metadata, clean URL structure, generated sitemap, robots present and visible breadcrumbs. | SPA architecture still uses a single app bundle; route data is duplicated between app content and SEO manifest; no full SSR/prerender. | Keep manifest/app content aligned, monitor indexed snippets, consider SSR only if crawler evidence shows remaining gaps. |
| Local SEO | 91/100 | Nairobi, Machakos and Makueni are visible across homepage, location hubs, service-location routes, footer/contact areas and schema. GBP UTM guidance exists. | GBP profile update remains manual; no published hours; limited local proof/testimonials; verified project examples are still light. | Update GBP website URL, add real photos/posts/reviews, add accurate hours if available, deepen hubs with approved local examples. |
| Content SEO | 86/100 | Commercial pages and guides cover tiles, sanitaryware, paints, adhesives/grout, installation support and quote planning; service-location content now has more local specificity. | Guide pages still need author/review dates and deeper examples; E-E-A-T proof remains limited. | Expand guides, add reviewed dates, include project examples, add real showroom/service proof and answer Search Console query patterns. |
| Image SEO | 89/100 | New sanitaryware assets use descriptive filenames, meaningful alt text, JPG fallback plus WebP/AVIF variants; gallery usefulness improved; non-critical images default to lazy loading. | Some older original JPG/PNG files remain large; carousel adds visual payload; not every image has explicit dimensions in markup. | Prune or replace heavy originals, add explicit width/height or aspect-ratio metadata where practical, consider image preload strategy for the LCP hero. |
| Schema SEO | 91/100 | Organization, LocalBusiness/HomeAndConstructionBusiness, ContactPoint, WebSite/SearchAction, FAQPage, ItemList, CollectionPage, BreadcrumbList and conservative Service schema are present; route schema is Worker-injected and visible breadcrumbs align with BreadcrumbList. | Business hours are missing from schema because they are not confirmed; schema and visible content still need regression checks as route content evolves. | Add accurate hours only after they are visibly published, and run Rich Results/schema checks after deployment. |
| Analytics/measurement readiness | 87/100 | Optional GA4 via `VITE_GA_MEASUREMENT_ID`; debug mode documented; first-party events capture UTM source/medium/campaign; GBP UTM docs exist. | GA4/Search Console setup is still external; no confirmed property IDs or live reporting evidence in repo; no automated monthly report yet. | Configure official GA4/Search Console, verify events, submit sitemap, connect monthly SEO/lead reporting. |
| Performance SEO | 82/100 | Vite build is moderate for a React marketing site; default lazy loading and responsive image helper are in place; Cloudflare Worker Assets delivery is solid. | Single app bundle serves all routes; sanitaryware images add about 4.26 MB to public assets; older heavy originals remain; carousel can affect LCP. | Route/code splitting, heavy image pruning, immutable asset caching review, LCP image preload after field measurement. |
| UX/accessibility SEO | 89/100 | Semantic sections, accessible CTA labels, labelled quote fields, mobile sticky CTAs, visible breadcrumbs, clear call/WhatsApp/quote pathways and readable content are present. | Long route pages and galleries can be dense; modal/focus behavior should be periodically checked with axe/Lighthouse. | Run formal axe/Lighthouse checks, strengthen focus management and add compact response-expectation copy. |

## Authority And Measurement Roadmap Addendum

The repository now includes a practical roadmap for the work most likely to move Kleihaus from a strong technical SEO foundation toward a 93-95/100 effectiveness level after external setup and real-world signals are completed.

New authority and measurement files:

- `docs/GOOGLE_BUSINESS_PROFILE_OPTIMIZATION.md`
- `docs/SEO_CONTENT_ROADMAP.md`
- `docs/CASE_STUDY_TEMPLATE.md`
- `docs/BACKLINK_OUTREACH_PLAN.md`
- `docs/MONTHLY_SEO_REPORT_TEMPLATE.md`

These documents address the remaining non-code SEO constraints: GBP profile quality, genuine review workflow, recurring photo/post updates, long-tail topical authority, ethical backlinks, future customer-approved case studies and monthly measurement. They intentionally avoid fake reviews, fake projects, fake backlinks, fake ratings, fake prices and Product/Offer/AggregateRating/Review schema.

## Evidence-Based Findings From The Repo

Technical evidence:

- `index.html` contains homepage title, meta description, canonical URL, robots tag, Open Graph tags, Twitter/X tags and static JSON-LD.
- `public/robots.txt` allows crawling and references `https://www.kleihaus.com/sitemap.xml`.
- `public/sitemap.xml` includes the homepage, core category pages, three location hubs, service-location pages and guide pages.
- `src/App.jsx` defines route-aware title, description, canonical, Open Graph/Twitter image metadata and JSON-LD through `SeoManager`.
- Route-level JSON-LD includes `CollectionPage` or `WebPage`, `BreadcrumbList`, `ItemList`, optional `Service` and optional `FAQPage`.
- The sitemap covers the generated route families, but current `lastmod` values remain `2026-06-18` even after July updates.

Local SEO evidence:

- The homepage names Kleihaus Ceramics, product categories and service areas: Nairobi, Machakos and Makueni.
- Location hubs exist for `/locations/nairobi`, `/locations/machakos` and `/locations/makueni`.
- Location-service pages exist for tiles, sanitaryware, paints and installation support across Nairobi, Machakos, Makueni and Kenya.
- GBP tracking documentation recommends `https://www.kleihaus.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp` plus optional location-specific UTM URLs.
- Contact details are consistent in repo docs and UI: `+254 748 827 166`, `sales@kleihaus.com`, and Nairobi | Machakos | Makueni service-area messaging.

Content evidence:

- Core commercial routes cover `/tiles`, `/floor-tiles`, `/wall-tiles`, `/bathroom-tiles`, `/sanitaryware`, `/paints`, `/adhesives-grout` and `/installation-support`.
- Guide routes cover tile buying, bathroom renovation, paint selection, adhesive/grout planning, installation best practices and cost estimation.
- FAQ copy avoids fixed price claims and repeatedly sends users toward quote requests based on quantity, finish, location and availability.
- About content includes vision, mission, values, advisory, delivery, installation support, training and tools.

Image evidence:

- `public/images/sanitaryware/` contains 77 optimized files: 11 unique sanitaryware showroom images with JPG fallbacks plus WebP and AVIF variants.
- New filenames are descriptive, for example `sanitaryware-shower-display-02.jpg` and `sanitaryware-black-tap-display-01.jpg`.
- New sanitaryware images are used in the homepage carousel, Sanitaryware catalogue card, `/sanitaryware` route gallery and sanitaryware location-service imagery.
- Existing responsive image logic generates WebP/AVIF sources and supports 480/768 variants for the new sanitaryware assets.

Measurement evidence:

- `src/services/analyticsService.js` supports optional GA4 loading through `VITE_GA_MEASUREMENT_ID`.
- GA4 event mapping covers quote success, WhatsApp, phone, email, guide, location and CTA events.
- First-party analytics captures `utm_source`, `utm_medium` and `utm_campaign`.
- `docs/ANALYTICS_AND_SEARCH_CONSOLE_SETUP.md` documents GA4 setup, DebugView checks, Search Console verification, sitemap submission and GBP UTM verification.

## Strengths

- Clear local commercial positioning for tiles, sanitaryware, paints, adhesives, tools and installation support.
- Strong route inventory for a quote-led local business without pretending to be an ecommerce catalogue.
- Good internal linking through footer links, related page blocks, location support blocks and guide links.
- Safe schema strategy that avoids Product, Offer, AggregateRating and review markup.
- GBP-to-site conversion path is much stronger after the recent homepage and route CTA improvements.
- New sanitaryware imagery materially improves visual relevance for the sanitaryware category.
- Quote, phone, email and WhatsApp CTAs are present and tracked.
- Documentation discipline is strong: README, audit docs and setup docs explain the architecture and external setup steps.

## Weaknesses

- Deep-route metadata is client-rendered. Search engines that fetch only the initial HTML see the homepage title/description/canonical before JavaScript runs.
- Sitemap `lastmod` dates do not reflect the July 2026 GBP and sanitaryware updates.
- Location-service pages are useful but still formulaic; they need periodic unique examples to reduce thin/doorway risk.
- No visible breadcrumb UI, despite BreadcrumbList JSON-LD.
- Business hours are not visible or in schema.
- Real-world trust signals are limited: no verified reviews, customer testimonials, case studies, staff expertise notes, showroom proof pages or project examples.
- Older image originals such as `sink-gold-1.png`, `kleihaus-logo.jpg`, `shower-rail-1.jpg`, `taps-display-1.jpg` and `sink-accessories.jpg` remain large.
- GA4 and Search Console are ready but not proven active from repo evidence.

## Risks

- **Rendering risk:** Deep route metadata and schema depend on browser JavaScript. Google can usually render JavaScript, but server-side metadata is still more reliable for indexing, previews and sharing.
- **Content similarity risk:** Programmatically generated service-location pages can drift toward repetitive content if not enriched with unique local examples.
- **Measurement gap:** Until GA4/Search Console are configured and verified, SEO decisions remain based on implementation quality rather than performance evidence.
- **Image payload risk:** The sanitaryware update improves relevance, but image-heavy routes and the carousel can affect mobile performance if not monitored.
- **Schema drift risk:** FAQPage and route schema must stay aligned with visible content as copy evolves.

## Priority Improvement Roadmap

### Quick Wins

1. Update the Google Business Profile website field to the tracked URL documented in the repo.
2. Submit or resubmit `https://www.kleihaus.com/sitemap.xml` in Search Console after deployment.
3. Refresh sitemap `lastmod` values whenever meaningful content/image updates ship.
4. Run Rich Results Test on the homepage, `/sanitaryware`, `/locations/nairobi` and one service-location route.
5. Verify GA4 DebugView events for quote, WhatsApp, phone, email, location views and guide views.
6. Add visible breadcrumbs to category, guide, location and service-location pages.
7. Add a concise response expectation near the quote form if operationally accurate.
8. Audit large legacy images and replace runtime usage with optimized variants where safe.
9. Use the monthly SEO report template to record Search Console, GA4, first-party conversion, GBP and referral metrics.
10. Begin ethical outreach to real suppliers, directories and project partners using the backlink plan.

### Medium-Term Improvements

1. Add Worker-side route metadata injection or prerendering for all sitemap URLs.
2. Generate `public/sitemap.xml` from the same route data used by the app.
3. Expand each location hub with local project examples, delivery notes, common property/project types and verified photos.
4. Add reviewed/updated dates and editorial ownership to guide pages.
5. Build monthly SEO reporting from Search Console queries, GA4 events and first-party quote journey data.
6. Add accurate business hours to visible UI and LocalBusiness schema only after confirmed.
7. Add formal accessibility and Lighthouse checks to the release checklist.

### Long-Term Strategic SEO Improvements

1. Build deeper topical clusters around tile sizes, bathroom renovation workflows, paint surface preparation and installation failure prevention.
2. Create real project/case-study pages with permissioned photos and practical problem-solution narratives.
3. Use Search Console query data to decide which pages deserve deeper content rather than creating thin duplicate routes.
4. Build a repeatable GBP posting and photo-upload workflow.
5. Add inventory/category proof only when it can be kept truthful and current; continue avoiding Product/Offer schema until real product pages include displayed prices, currency, availability and offer details.

## Organic Traffic Recommendations

- Prioritize informational pages that answer high-intent pre-quote questions: tile quantity estimation, grout/adhesive matching, bathroom fitting checklists, paint surface preparation and delivery planning.
- Add compact comparison sections where useful: floor vs wall tiles, interior vs exterior paints, shower fittings by finish, adhesive/grout selection by room type.
- Create content from actual customer questions captured through search, WhatsApp and quote forms, but avoid sending personal details to GA4.
- Add updated/reviewed dates and internal links from guides to quote and location pages.
- Keep page copy quote-led and advisory-led, not price-led, unless truthful current prices can be maintained.

## Local SEO And GBP Recommendations

- Update GBP website link to `https://www.kleihaus.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`.
- Add GBP photos using real showroom, sanitaryware, tile, paint, adhesive, delivery and project-support images.
- Publish weekly GBP posts around finishing tips, new displays, quote-preparation reminders and service-area support.
- Ask real customers for reviews after completed sales/projects; do not incentivize misleading reviews.
- Keep service areas aligned across GBP, homepage, footer, location hubs and schema: Nairobi, Machakos and Makueni.
- Add accurate hours only if Kleihaus can maintain them consistently.

## Conversion From SEO Traffic Recommendations

- Keep the current call, WhatsApp and quote CTAs prominent on homepage and route pages.
- Track conversion rate by landing page and UTM campaign once GA4 is active.
- Add route-specific quote prompts: for example, sanitaryware pages should ask for fixture list, finish preference, quantities and location.
- Add lightweight reassurance near CTAs: delivery support, installation guidance, product matching and project quote planning.
- Use Search Console landing-page data to decide which pages need stronger CTAs or local proof.

## Image SEO Recommendations After Sanitaryware Update

- Keep the new sanitaryware filenames and alt text pattern; it is descriptive and truthful.
- Consider adding a few selected sanitaryware images to local hub pages where they support local project context.
- Monitor mobile performance after the added carousel slides and gallery images.
- Replace or prune heavy legacy originals that are not needed for runtime delivery.
- Add explicit image dimensions or stable aspect-ratio metadata where feasible to reduce layout-shift risk.
- Avoid stock-like images when real Kleihaus showroom images are available.

## Search Console And GA4 Verification Recommendations

Search Console:

- Verify `https://www.kleihaus.com/`.
- Submit `https://www.kleihaus.com/sitemap.xml`.
- Inspect homepage, `/sanitaryware`, `/locations/nairobi`, `/tiles-nairobi`, `/installation-support`, `/tile-buying-guide` and `/cost-estimation-guide`.
- Confirm canonical, rendered content, indexability and schema status.
- Review queries monthly and map them to pages, missing content and CTA opportunities.

GA4:

- Configure the real `VITE_GA_MEASUREMENT_ID` in the Cloudflare Workers Builds environment only.
- Do not commit a real GA4 ID to source.
- Use DebugView to test `quote_submit`, `whatsapp_click`, `phone_click`, `email_click`, `guide_view`, `location_view` and `cta_click`.
- Test the GBP UTM URL and confirm source/medium/campaign reporting.
- Keep free-form customer messages, names, emails and phone numbers out of GA4.

## Schema Safety Confirmation

Current active source uses safe business, site, FAQ, item-list, collection/page, breadcrumb and service schema patterns. No Product schema, Offer schema, AggregateRating schema, fake review schema, fake rating data or fake price data should be introduced until Kleihaus has real product pages with visible current price, currency, availability and truthful offer details.

Audit validation should continue scanning both source and build output for:

- `"@type": "Product"`
- `"@type": "Offer"`
- `AggregateRating`
- `Review`
- fake GA4 IDs
- fake Search Console verification tags
