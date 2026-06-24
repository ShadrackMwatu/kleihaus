# Kleihaus Optimization Audit

Date: 2026-06-24

This audit reviews the Kleihaus website and repository for performance, CRO, UX/UI, mobile usability, accessibility, security, analytics, lead generation and maintainability. It is audit-only. No application code, Cloudflare settings, DNS, Worker configuration, secrets, deployment settings or backend endpoint paths were changed.

## Executive Summary

Kleihaus has moved from a simple catalogue site toward a practical lead-generation website. The strongest areas are clear product/service coverage, safe structured data, responsive imagery, quote form routing, WhatsApp click tracking, D1 storage and a compact mobile-oriented layout. The next improvements should focus on measurable conversion tracking, route-rendering strategy, proof/trust content, spam controls, performance pruning and maintainability.

## Phase 1 Implementation Note

Implemented after this audit:

- Optional GA4 loading through `VITE_GA_MEASUREMENT_ID`, with no-op behavior when not configured.
- GA4-compatible conversion event names for quote success, WhatsApp clicks, phone clicks, email clicks, guide views/clicks, location views and CTAs.
- Extended `/api/track-event` allowlist for guide, location and CTA events.
- Added richer local FAQ content to Nairobi, Machakos and Makueni hubs.
- Added documentation for GA4 and Search Console setup without committing real IDs.

## Performance Findings

| Area | Current state | Finding | Priority |
| --- | --- | --- | --- |
| JavaScript bundle | Existing `dist/assets/index-*.js` is about 263 KB. | Reasonable for a single React app, but all pages share one bundle. Route-level code splitting could help if content continues growing. | Medium |
| CSS bundle | Existing `dist/assets/index-*.css` is about 34 KB. | Healthy size. Tailwind output appears compact. | Low |
| Images | AVIF/WebP variants and responsive `OptimizedImage` helper exist. | Several large JPG/PNG originals remain in `public/images` and are copied to `dist`; largest is `sink-gold-1.png` at about 1.55 MB. | High |
| Hero loading | First hero image is eager; other slides lazy-load. | Good. Consider preloading the LCP hero AVIF/WebP asset from `index.html` or Worker response once the final LCP image is stable. | Medium |
| Lazy loading | Non-critical images use `loading="lazy"` and `decoding="async"`. | Good. Continue this pattern. | Low |
| Fonts | No external font loading found in `index.html`. | Good for performance and privacy. | Low |
| Cloudflare delivery | Worker Assets serves `dist`; SPA fallback is configured. | Good. Add cache review for immutable assets and image cache headers if not already handled by Cloudflare defaults. | Medium |

Largest image audit sample:

- `public/images/sink-gold-1.png`: about 1.55 MB
- `public/images/kleihaus-logo.jpg`: about 547 KB
- `public/images/shower-rail-1.jpg`: about 497 KB
- `public/images/taps-display-1.jpg`: about 427 KB
- `public/images/sink-accessories.jpg`: about 410 KB
- `public/images/sanitary-accessories.jpg`: about 392 KB

Performance recommendations:

1. Replace or remove heavy originals from runtime paths where responsive variants are already available.
2. Add an explicit preload for the first hero AVIF/WebP candidate after verifying live LCP.
3. Consider route-level code splitting if the route/content arrays keep growing.
4. Run Lighthouse mobile after each major visual change and track LCP/CLS/TBT.

## CRO And Lead Generation Findings

| Area | Current state | Opportunity | Priority |
| --- | --- | --- | --- |
| Quote form | Posts to `/api/quote-request`, validates name plus phone/email plus message, sends `channel: "email"` and `intent: "quote"`. | Strong baseline. Add more microcopy around response expectations and what happens next. | Medium |
| Support modal | Sends `channel: "whatsapp"` and `intent: "support"`; missing WhatsApp Business credentials do not scare customers. | Good. Track modal open-to-submit rate separately from direct WhatsApp clicks. | High |
| WhatsApp CTAs | Same-tab `wa.me/254748827166?text=...` links and analytics events exist. | Good. Distinguish direct click-to-chat conversions from support form submissions in analytics dashboards. | High |
| Header CTAs | Header has WhatsApp and navigation/search. | Strong on desktop; mobile header can feel dense. Monitor mobile engagement before simplifying. | Medium |
| Category cards | Cards include guide links and Request quote actions. | Good. Add category-specific quote prompt examples near CTAs only if it does not lengthen cards. | Medium |
| Trust signals | Hero badges, About/company values and footer contact details provide trust. | Add real proof over time: project photos, reviews, testimonials, delivery examples, showroom/service proof. | High |
| Location pages | Location hubs and service-location pages exist. | Add local quote CTA copy such as "Request Machakos delivery support" where truthful. | Medium |

Highest-value CRO recommendations:

1. Add GA4 conversion events for quote submit success, support submit success, direct WhatsApp click, phone click, email click and location-page CTA clicks.
2. Add a short post-submit "what happens next" confirmation with expected response channel.
3. Add project/testimonial proof when verified customer permission exists.
4. Use Search Console query data to create specific CTA copy for high-intent terms such as tile size, location and installation support.

## UX/UI And Mobile Findings

Strengths:

- The homepage is compact compared with earlier versions.
- Mobile bottom CTAs support WhatsApp and quote actions.
- The category panel uses horizontally scrollable tabs on narrow screens.
- Hero carousel has controls, dots, readable overlay and reduced-motion logic.
- Footer is compact and contains Products, Services and Contact.

Remaining UX opportunities:

| Finding | Impact | Priority |
| --- | --- | --- |
| Many routes and sections are generated in one large `src/App.jsx`, making regressions more likely. | Maintainability and future UI polish risk. | High |
| Mobile header includes logo, search, WhatsApp and menu in a tight area. | Potential tap-density friction on small phones. | Medium |
| Deep routes rely on the same gallery/content template. | UX is consistent, but content can feel repetitive. | Medium |
| Sticky mobile CTAs should be periodically checked against footer and modal states. | Prevent overlap regressions. | Medium |
| Contact and quote actions are strong, but tracking should confirm which CTA positions actually convert. | Better CRO decisions. | High |

## Accessibility Findings

Strengths:

- Main forms use visible labels.
- Modal uses `role="dialog"`, `aria-modal` and labelled heading.
- Hero controls and navigation menu have aria labels.
- Tabs use `role="tablist"`, `role="tab"`, `aria-selected` and `aria-controls`.
- Images generally have descriptive alt text.
- Inline decorative icons are mostly paired with visible text.

Recommendations:

| Recommendation | Expected impact | Effort | Priority | Risk |
| --- | --- | --- | --- | --- |
| Run axe on mobile and desktop after each major UI release. | Catches contrast/focus regressions. | Low | High | Low |
| Add focus-trap behavior for the support modal. | Better keyboard and screen-reader modal experience. | Medium | High | Low |
| Confirm all interactive div/button/link patterns are semantic and keyboard reachable. | Avoids hidden accessibility issues. | Low | Medium | Low |
| Add skip-to-content link if pages grow. | Faster keyboard navigation. | Low | Medium | Low |
| Keep checking color contrast on green/bronze/white combinations. | Prevents readability regressions. | Low | Medium | Low |

## Security And Trust Findings

Current protections:

- Backend sanitizes and length-limits form fields.
- Backend validates name, contact method, request details and communication channel.
- `/api/quote-request` returns safe JSON errors.
- Email remains the required success channel for quote submissions.
- WhatsApp Business API support is optional and missing credentials do not break the quote path.
- Analytics strips personal quote/contact fields before event storage.
- D1 stores structured channel/intent data where available.

Gaps:

| Gap | Risk | Priority |
| --- | --- | --- |
| No visible anti-spam/honeypot/rate-limiting layer in the repo. | Quote endpoint could receive spam or scripted submissions. | High |
| CORS headers currently allow all origins on API endpoints. | Same-origin site is expected, but open CORS can invite unwanted cross-site submissions. | Medium |
| No privacy policy page found in the route list. | Analytics and form collection should be supported by a clear policy. | High |
| No consent/notice copy for anonymous journey analytics. | Privacy transparency gap. | Medium |
| No public business hours found in footer/schema. | Trust and LocalBusiness completeness gap. | Medium |

Practical security recommendations:

1. Add a hidden honeypot field and server-side rejection.
2. Add basic per-IP or per-session rate limiting using Cloudflare tools where appropriate.
3. Restrict API CORS to expected origins if cross-origin access is not needed.
4. Add a concise privacy/contact policy page.
5. Keep tokens and secrets backend-only, as currently designed.

## Analytics And Measurement Findings

Current implementation:

- `analyticsService` captures anonymous visitor/session IDs in localStorage.
- Events include page views, quote form view/start/attempt/success/error, WhatsApp clicks, product/category clicks, search queries, contact clicks, phone clicks and email clicks.
- Events are sent to `/api/track-event` with `keepalive` and are designed not to block the website.
- Backend stores journey events in D1 when the binding is available.
- Quote submissions include journey context such as UTM, referrer, clicked products/categories and last search query.

Missing measurement capabilities:

- GA4 support exists through optional `VITE_GA_MEASUREMENT_ID`, but no real measurement ID is committed or configured in the repo.
- No Google Ads/GBP conversion tracking found.
- No dashboard that reconciles D1 quote records with GA4/Search Console data.
- No funnel report for CTA position -> modal/form start -> backend success -> sales follow-up.
- No explicit event taxonomy document for business reporting ownership.

Measurement recommendations:

1. Add GA4 only after official property setup, using privacy-safe conversion events.
2. Track conversions: `quote_submit_success`, `support_submit_success`, `whatsapp_click`, `phone_click`, `email_click`, `guide_click`, `location_cta_click`.
3. Add UTM conventions for Google Business Profile, social posts and campaigns.
4. Create a monthly Search Console + D1 lead report: queries, landing pages, clicks, quote leads, WhatsApp clicks and lead score.
5. Keep personal data out of behavioral analytics.

## Architecture And Maintainability Findings

Strengths:

- Worker Assets architecture is documented in repo.
- Active endpoint `/api/quote-request` is same-origin.
- `src/worker.js` cleanly routes API requests before assets.
- Legacy API Worker files are documented as not active.
- Docs are extensive and preserve deployment context.

Maintainability risks:

| Risk | Evidence | Priority |
| --- | --- | --- |
| `src/App.jsx` is very large and owns routes, data, components, SEO and forms. | Most public site behavior lives in one file. | High |
| Route metadata, content and UI are tightly coupled. | Useful now, but harder to scale safely. | High |
| SEO sitemap updates are manual. | Every new route must be manually added to `public/sitemap.xml`. | Medium |
| Existing uncommitted changes can complicate audit-only work. | Current working tree had pre-existing changes in app/docs/contact files. | Medium |

Maintainability recommendations:

1. Split route/content data into `src/data/routes.js`, `src/data/categories.js`, `src/data/guides.js` and `src/data/locations.js`.
2. Split reusable components: Header, Hero, Contact, Footer, CategoryPage, SeoManager, OptimizedImage.
3. Generate sitemap from the same route data used by the app.
4. Add a lightweight link/route validation script.
5. Add a documented release checklist for build, sitemap, schema, quote endpoint and Workers Builds.

## Prioritized Recommendations

Critical:

- None found that require emergency repo changes.

High:

- Add privacy policy and analytics transparency page.
- Add GA4/Search Console conversion measurement once official accounts are ready.
- Add anti-spam/rate-limiting controls for `/api/quote-request`.
- Add Worker-side metadata injection or static/prerender strategy for deep routes.
- Refactor route/content data out of `src/App.jsx`.

Medium:

- Add visible breadcrumbs to deep pages.
- Add Service schema for verified services.
- Expand location hubs with unique proof, FAQs and service examples.
- Prune or gate large original image assets from deployment paths.
- Add focus trapping to the support modal.

Low:

- Add updated/reviewed dates for guide pages.
- Add more social preview images.
- Add skip-to-content link if page complexity grows.
- Add route validation and sitemap generation scripts.
