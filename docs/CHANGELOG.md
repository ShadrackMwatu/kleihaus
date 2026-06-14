# Kleihaus Project Changelog

This changelog records meaningful project work so the Kleihaus website can be audited from the repository.

Rule: Every future meaningful change must update `docs/CHANGELOG.md` and, where relevant, `docs/PROJECT_AUDIT.md`.

Current deployment note: production now uses GitHub `main` -> Cloudflare Workers Builds -> Worker Assets -> Worker `kleihaus` -> `kleihaus.com` and `www.kleihaus.com`. The active quote endpoint is `/api/quote-request`. Older entries that mention Cloudflare Pages or `https://api.kleihaus.com/quote-request` are historical and describe earlier deployment states, not the current production path.

## 2026-06-11

### WhatsApp CTA Visual Standardization

- Standardized WhatsApp/support CTAs across header, hero, contact form, category pages, footer and mobile sticky actions to the Kleihaus green primary button style.
- Updated WhatsApp CTA icon/text treatment to white for consistent contrast on green buttons.
- Preserved the in-site support modal behavior and existing email-only quote routing.

### Compact Homepage And Block Spacing Pass

- Tightened the top header, category navigation, hero, trust cards, compact content panel, catalogue cards, gallery, FAQ, quote panel and footer spacing.
- Reduced homepage vertical height by lowering hero viewport bounds, shortening repeated copy, trimming section padding and making card grids denser.
- Preserved the in-site WhatsApp/support modal flow, email-only quote flow, structured data policy and Worker Assets architecture.

### In-Site WhatsApp CTA Flow

- Replaced direct frontend WhatsApp URL CTAs with in-site support modal triggers so visitors remain on Kleihaus.com.
- Removed active frontend `wa.me` redirect URL generation from `src/App.jsx` and the high-value alert service.
- Preserved support modal submissions as `channel: "whatsapp"` and `intent: "support"` through `/api/quote-request`.
- Preserved quote form submissions as `channel: "email"` and `intent: "quote"` through `/api/quote-request`.
- Kept backend delivery separation: WhatsApp/support submissions route to WhatsApp Business API staff notification only, while quote/email submissions route to email only.

### Communication CTA Same-Tab Audit

- Re-audited the previous direct WhatsApp CTA implementation; this behavior was later superseded by the in-site support modal flow above.
- Confirmed quote form submissions continue to send `channel: "email"` and `intent: "quote"` through `/api/quote-request`.
- Confirmed support modal submissions continue to send `channel: "whatsapp"` and `intent: "support"` through `/api/quote-request`.
- Confirmed backend routing remains email-only for quote requests and WhatsApp-only for support requests.

### Communication Channel Separation

- Added explicit `channel` and `intent` fields to frontend quote/support submissions.
- Routed quote form submissions as `channel: "email"` and `intent: "quote"` so they require internal Resend email delivery and skip WhatsApp notifications.
- Routed support modal submissions as `channel: "whatsapp"` and `intent: "support"` so they require WhatsApp Business API staff delivery and skip internal/customer email.
- Updated direct WhatsApp CTAs in the header, hero, footer and sticky mobile action bar to open WhatsApp directly.
- Added D1 audit columns for `channel` and `intent`, with legacy insert fallback preserved.
- Added channel-specific backend logs and success messages for email and WhatsApp flows.

### Phase 2 Conversion Optimization

- Added a persistent mobile conversion bar with direct WhatsApp and Request Quote actions.
- Added a compact trust section for Fast Response, Wholesale & Retail, Delivery Support and Professional Guidance.
- Added a customer project gallery using existing image assets only.
- Updated homepage FAQ content around tile prices, sanitaryware prices, paint prices, delivery and installation support without inventing prices.
- Added related category links on category landing pages and expanded safe LocalBusiness/FAQ structured data while preserving the no Product/Offer schema policy.
- Confirmed visible phone numbers remain click-to-call links.

### Backend-Powered Support CTA Labels

- Confirmed frontend support actions no longer redirect customers to `api.whatsapp.com`, `web.whatsapp.com` or `wa.me`.
- Renamed visible former WhatsApp CTAs to "Need Help?", "Support inquiry", "Support" and "Open support form" so the UI matches the in-site modal flow.
- Preserved `/api/quote-request` as the shared backend path for quote requests, support modal submissions, email delivery, D1 storage and optional WhatsApp Business API staff notifications.

## 2026-06-05

### Trust, Conversion And Local SEO Polish

- Strengthened above-the-fold messaging with "Tiles. Sanitaryware. Paints.", Nairobi/Machakos/Makueni service-area copy and a more prominent green quote CTA.
- Updated trust signals to emphasize Wholesale & Retail, Sourcing Support, Delivery Support and Professional Guidance.
- Improved catalogue cards with clearer use-case tags and quote-support cues while preserving existing routes and `/api/quote-request`.
- Refined homepage metadata, LocalBusiness schema copy, web manifest description and sitemap URLs for cleaner local SEO and Google Business Profile alignment.

### In-Site Support Flow

- Replaced frontend WhatsApp redirect CTAs with in-site support actions so customers stay on Kleihaus.com.
- Added a floating "Need Help?" support button and modal form that submits through `/api/quote-request`.
- Kept the quote form as the primary communication channel while preserving backend email delivery, D1 storage and optional WhatsApp Business API staff notifications.

### WhatsApp Click And Backend Notification Support

- Updated public WhatsApp CTAs to navigate in the same browser tab instead of opening a separate tab or window.
- Updated backend WhatsApp Business API notification support to use `WHATSAPP_TO_PHONE` with clean skipped status when optional credentials are missing.
- Kept Resend email delivery as the required success channel; WhatsApp Business API notification failures do not fail quote submission.

### Responsive Images And SEO Copy Polish

- Added width-specific responsive AVIF and WebP variants for larger public images, including 480w, 768w, 1024w and 1440w variants where useful.
- Updated the optimized image renderer to emit `srcSet` and context-aware `sizes` values for hero, catalogue card, product card, category gallery and logo images.
- Rechecked homepage catalogue "View guide" links for consistent text, styling, targets and accessible labels.
- Polished visible homepage, quote, FAQ and category-page copy into a more confident active brand voice while avoiding stock, price, delivery or installation overpromises.
- Confirmed SEO foundations remain safe: unique category metadata, sitemap coverage, canonical URLs and no Product or Offer JSON-LD.

### Modern Image Format Optimization

- Generated WebP and AVIF variants for all 33 public JPG/PNG image assets while preserving the original files as fallbacks.
- Added a reusable optimized image renderer that serves AVIF first, WebP second and the original JPG/PNG fallback through `<picture>`.
- Preserved eager loading for the logo and first hero/category lead images while keeping non-critical catalogue and gallery images lazy-loaded.
- Reduced public original image weight from about 7.97 MB to about 3.01 MB for WebP-capable browsers and about 1.82 MB for AVIF-capable browsers.
- Preserved page layout, hero carousel behavior, catalogue structure, quote flow, WhatsApp links and structured data policy.

### Catalogue Guide Links And Footer Services Polish

- Added a consistent premium "View guide" link to every homepage catalogue category card, including fallback guide targets for Outdoor Tiles and Installation Support.
- Removed the highlighted category-page support statement strip while preserving category content, galleries and quote CTAs.
- Simplified the footer Services column to Finishing Advisory, Delivery and Installation.
- Preserved quote submission, WhatsApp links, structured data policy and `/api/quote-request`.

### Final Mobile QA And Accessibility Audit

- Ran real-device-style mobile QA against the live site at 360px, 390px, 412px and 430px viewport widths.
- Confirmed the hero headline stays at a compact mobile size, hero CTAs remain visible, tabs fit narrow screens, catalogue cards remain compact and the green footer strip remains the final footer element.
- Confirmed live HTML still contains no Product or Offer JSON-LD and keeps Organization, LocalBusiness, Store, WebSite, FAQPage and ItemList schema.
- Added accessible labels to clickable catalogue category image buttons so assistive technology receives meaningful button names.
- Lighthouse and axe CLI packages were not available in the local cache; completed equivalent rendered DOM, SEO and accessibility checks without adding audit dependencies.

## 2026-06-04

### UI UX Consistency Audit And Polish

- Completed a frontend UI/UX consistency audit covering header, navigation, hero, CTA buttons, trust badges, catalogue cards, segmented panels, quote form, category pages and footer.
- Tightened compact About and Guidance panel cards on mobile with smaller card padding, icon sizing and body text rhythm.
- Confirmed the hero CTA set uses a consistent translucent premium style and the footer uses a balanced three-column desktop layout.
- Preserved `/api/quote-request`, WhatsApp links, structured data, Cloudflare/Worker settings and quote form behavior.

### Hero Primary CTA Styling

- Matched the hero carousel "Browse catalogue" CTA to the translucent premium styling used by the adjacent Request quote and WhatsApp inquiry buttons.

### Footer Column Alignment

- Adjusted the desktop footer grid so Products aligns left, Services remains centered and Contact aligns right.
- Widened the footer content container while preserving mobile stacking, footer colors, contact links and the green branding strip.

### Footer Spacing Tightening

- Reduced the bronze footer section height by tightening vertical padding and list spacing.
- Kept Products, Services and Contact evenly distributed in a centered three-column layout.
- Preserved the green footer branding strip and all footer contact links.

### Footer Contact Text Cleanup

- Removed the footer response-time sentence from the Contact column while preserving WhatsApp, email, phone, locations and footer branding.

### Footer Branding Column Removal

- Removed the bronze footer branding column with logo, tagline and descriptive paragraph.
- Rebalanced the main footer into three centered columns for Products, Services and Contact.
- Preserved the mobile footer WhatsApp CTA and the green branding strip.

### Mobile Footer WhatsApp CTA Placement

- Moved the mobile "Request quote on WhatsApp" CTA into the footer immediately above the green branding strip.
- Hid the fixed mobile WhatsApp CTA when the footer is visible so the green footer strip remains the final visible website element.
- Removed extra mobile footer bottom padding while preserving safe-area padding inside the green branding strip.

### SEO Category Pages And Local SEO Guidance

- Added lightweight frontend category landing pages for `/floor-tiles`, `/wall-tiles`, `/bathroom-tiles`, `/sanitaryware`, `/paints` and `/adhesives-grout`.
- Added route-specific title, meta description, canonical URL and safe CollectionPage, BreadcrumbList and ItemList JSON-LD for category pages.
- Updated `public/sitemap.xml` with the new category URLs while keeping `public/robots.txt` pointed at the sitemap.
- Added homepage category links to the new guides while preserving quote and WhatsApp CTAs.
- Added `docs/LOCAL_SEO_GOOGLE_BUSINESS_PROFILE.md` with manual Google Business Profile optimization guidance for Nairobi, Machakos and Makueni.
- Kept the quote-based catalogue policy: no Product or Offer schema without real product pages, truthful prices and current availability.
- Continued mobile compaction and image SEO review with meaningful alt text, lazy loading for gallery images and eager loading only for first hero/category lead images.

### Mobile Layout Audit And Polish

- Reduced mobile hero height and headline scale so the carousel image remains visible and CTAs stay easier to reach.
- Tightened trust badges, segmented panel spacing, catalogue cards, sticky WhatsApp spacing and footer spacing for smaller screens.
- Narrowed mobile section spacing rules so compact homepage panels are not forced into oversized vertical gaps.
- Reduced catalogue image ratios and sticky WhatsApp height to keep mobile calls-to-action visible.
- Hid the sticky WhatsApp button while the Quote panel is active to avoid covering the quote form.
- Preserved quote submission, WhatsApp links, analytics tracking, structured data and `/api/quote-request`.

### Compact Homepage Audit And Polish

- Audited the compact homepage, navigation, carousel, catalogue cards, quote flow, footer and structured data after recent frontend changes.
- Tightened mobile hero CSS so the hero min-height no longer applies to the trust strip.
- Added an active state to the category strip so selected catalogue categories are clearer and keyboard-accessible.
- Confirmed the footer branding strip remains green `#16A34A` and the structured data fix does not reintroduce Product or Offer schema.

## 2026-06-03

### Footer Branding Strip Green

- Updated only the bottom-most footer branding strip to use the site green `#16A34A`, matching the top contact bar.
- Preserved the bronze footer gradient, footer columns, links, WhatsApp, email, phone, quote form and structured data.

### Compact Homepage Navigation

- Converted the homepage below the hero into a compact segmented Catalogue, About, Guidance and Quote content area.
- Connected the header navigation to the compact content area instead of relying on long anchor jumps.
- Reduced long homepage scrolling by merging About, services, helpful guidance, quote helper and contact content into focused panels.
- Preserved the hero carousel, trust badges, WhatsApp links, clickable catalogue cards, quote form behavior, analytics tracking and `/api/quote-request`.

### Footer Branding Message

- Centered the footer bottom bar and replaced the service-area line with the brand message "Inspiring Living".
- Kept the footer gradient, footer columns, links, WhatsApp, email, phone, quote form and API behavior unchanged.
- Refined the footer bottom bar so the copyright and "Inspiring Living" brand message appear on one centered line.

### Footer Brand Color

- Applied a warm Kleihaus logo-inspired bronze gradient across the full footer area below the white divider.
- Kept footer links, quote form, WhatsApp links, API endpoint and structured data unchanged.

### Product Structured Data Search Console Fix

- Replaced incomplete catalogue-category Product JSON-LD with an `ItemList` of catalogue categories linked to `#catalogue`.
- Kept Organization, LocalBusiness, Store, WebSite, SearchAction and FAQ structured data intact.
- Avoided fabricating prices, availability, reviews, ratings or aggregate rating data for quote-based catalogue categories.

### Premium Homepage Hero Carousel

- Replaced the static homepage hero image with a five-image carousel using existing showroom, tile, bathroom, paint and adhesive assets.
- Added a light-balanced directional overlay that protects hero text readability on the left while keeping product imagery visible on the right.
- Added carousel dots, desktop previous/next controls, 5-second auto-rotation and reduced-motion handling.
- Preserved the existing hero headline, subtext, catalogue CTA, quote CTA, WhatsApp CTA, analytics tracking and quote form behavior.

### Homepage Structure And Conversion Polish

- Added a real `#about` section so the About navigation link has a matching homepage destination.
- Added hero trust badges for retail/project quotes, delivery coordination, installation guidance and service areas.
- Added a hero WhatsApp inquiry CTA alongside catalogue browsing and quote request actions.
- Reframed the buying guide section as helpful planning guidance instead of "coming soon" content.
- Expanded quote guidance so customers are prompted for room size, product type, quantity, location and budget range.
- Reworked the footer into structured Products, Services and Contact columns with WhatsApp, email, locations and response expectation.
- Replaced remaining public frontend brown accents in `src/App.jsx` with green/emerald brand styling.

### Worker Assets Documentation And Brand Metadata

- Updated brand theme metadata from `#A65F1E` to `#16A34A` in `index.html` and `public/site.webmanifest`.
- Documented the current production architecture: GitHub `main` -> Cloudflare Workers Builds -> Worker Assets -> Worker `kleihaus` -> `kleihaus.com` and `www.kleihaus.com`.
- Documented the active same-origin quote endpoint `/api/quote-request`.
- Marked `api.kleihaus.com` as legacy and not currently required by the frontend.
- Marked Cloudflare Pages references as historical/stale unless explicitly reintroduced later.
- Added deployment runbook steps for pushing to `main`, checking `Workers Builds: kleihaus`, and verifying the live quote endpoint.
- Added troubleshooting note for the stale Cloudflare Pages check from account `bded816dd798bcf88e4ccc0ce5d16bcb`.
- Reviewed `wrangler.api.toml` and `src/api-worker.js`; both remain in the repo as legacy API-worker files and are not referenced by the active Worker Assets deployment.

## 2026-05-27

### Backend Quote Request Automation

- Updated quote submission to use the permanent backend API `https://api.kleihaus.com/quote-request` instead of relative Pages Function paths or preview deployment URLs.
- Added repo-based API Worker entrypoint `src/api-worker.js` and `wrangler.api.toml` so `api.kleihaus.com` uses the same quote handler as `functions/api/quote-request.js`.
- Added safe non-secret Worker vars for quote email recipient, sender, and WhatsApp recipient in `wrangler.api.toml`; API tokens remain Cloudflare secrets.
- Reintroduced the repo-based D1 binding in `wrangler.toml` for `quote_requests` persistence.
- Tightened backend success so quote requests return `success: true` only after D1 storage and Resend email delivery succeed.
- Added WhatsApp Business API structure using `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, and `WHATSAPP_TO_NUMBER`; missing credentials return a clear skipped reason.
- Fixed the production quote API endpoint wiring by changing the frontend fetch target back to `https://api.kleihaus.com/quote-request`.
- Added `message` and `details` aliases alongside `requestDetails` in the quote request payload so current and future deployed function versions accept the same submission.
- Confirmed the repo-based Cloudflare Pages Function path is `functions/api/quote-request.js` and the function exports `onRequestPost(context)`.
- Adjusted the endpoint so D1 storage or Resend failures return `success: false` instead of showing a false success.
- Fixed the repo-based Cloudflare Pages Function so it exports `onRequestPost(context)` for `https://api.kleihaus.com/quote-request`.
- Changed WhatsApp automation to report a clear skipped status unless WhatsApp Business API is configured.
- Added local development fallback messaging when Vite cannot reach the Pages Function endpoint.
- Added Cloudflare Pages Function endpoint at `functions/api/quote-request.js` for secure quote request automation.
- Updated the quote form so "Send request" posts to `https://api.kleihaus.com/quote-request` instead of automatically redirecting to WhatsApp.
- Preserved the manual "Chat on WhatsApp" fallback button for customers if backend submission fails.
- Added backend-only environment variable placeholders for Resend email delivery, WhatsApp Business Cloud API notification and optional D1 storage.
- Added `docs/QUOTE_BACKEND_AUTOMATION.md` documenting the frontend-to-backend flow, Cloudflare setup, D1 schema, testing steps and security notes.

### WhatsApp Quote Submission UX

- Updated the quote form submission flow to navigate to WhatsApp in the same browser tab/window instead of opening a new tab.
- Preserved quote validation, anonymized analytics tracking and backend-ready quote submission preparation.
- Normalized WhatsApp message encoding so line breaks are preserved as `%0A` for WhatsApp mobile, WhatsApp Web and browser redirects.
- Added backend-ready integration comments for future Cloudflare Worker, WhatsApp Business API, EmailJS and Formspree delivery paths.

### Project Documentation

- Added root `README.md` with project overview, live website link, tech stack, setup commands, Cloudflare Pages deployment notes, environment variable placeholders and development workflow.
- Added `docs/CHANGELOG.md` to make project progress auditable.
- Added `docs/PROJECT_AUDIT.md` to summarize the current technical and product state.
- Added `docs/DEVELOPMENT_WORKFLOW.md` to define local setup, build checks, git workflow and commit safety rules.
- Existing documentation retained for AI backend architecture, SEO strategy, visibility roadmap, quote form submission, Cloudflare email architecture and monthly AI report planning.

### Website Professionalism Audit

- Simplified the public homepage journey to keep the customer flow focused on hero, category browsing, product highlights, trust, quote helper, guides, contact and footer.
- Removed redundant public-facing sections while preserving SEO, quote, analytics and backend-ready service architecture.
- Confirmed the public site does not expose backend/internal AI dashboards, search logs, weak-signal detection or private analytics panels.

### Header and Navigation

- Refactored the header into a cleaner retail structure:
  - Top utility strip for locations, email and one phone number.
  - Main header for logo, search, navigation and WhatsApp CTA.
  - Category navigation as lightweight product browsing shortcuts.
- Removed duplicate phone number references from the main navigation area.
- Improved spacing, hierarchy and mobile behavior while preserving search and WhatsApp functionality.

### SEO and Google Indexing

- Implemented advanced SEO and indexing foundations:
  - Optimized document title and meta description.
  - Open Graph and Twitter metadata.
  - Canonical URL and robots directives.
  - `public/sitemap.xml`.
  - `public/robots.txt`.
  - `public/site.webmanifest`.
  - Structured JSON-LD for Organization, LocalBusiness, Store, WebSite, SearchAction, ContactPoint and FAQ content.
- Added SEO strategy documentation in `docs/SEO_STRATEGY.md`.
- Preserved one-H1 structure, crawlable category content and image alt text coverage.

### Visibility and Lead Generation

- Added customer-facing visibility foundations for Kenya-focused ceramics and finishing material searches.
- Added helpful guide topics for future content marketing.
- Added trust and conversion content around project quotations, delivery coordination, installation guidance and service focus for Nairobi, Machakos and Makueni.
- Added `docs/VISIBILITY_AND_GROWTH_ROADMAP.md` for Google Business Profile, Search Console, GA4, social content and monthly reporting planning.

### Quote Form and WhatsApp Flow

- Made the quote/contact form validate required fields and open WhatsApp with a pre-filled quote request.
- Improved WhatsApp message formatting with readable line breaks:
  - Greeting.
  - Name, email, phone and location.
  - Request details.
- Added backend-ready quote/email submission flow using `VITE_QUOTE_ENDPOINT` without exposing secrets.
- Added `src/services/quoteRequestService.js` and `src/services/emailSubmissionService.js`.
- Added `docs/QUOTE_FORM_SUBMISSION.md` and `docs/CLOUDFLARE_EMAIL_ARCHITECTURE.md`.
- Kept the customer-facing fallback message non-technical:
  - "Your WhatsApp quote request is ready. Please send it in WhatsApp so our team can respond."

### AI-Ready Backend Architecture

- Added AI-ready service/data foundation while keeping public UI clean:
  - `src/services/analyticsService.js`
  - `src/services/recommendationService.js`
  - `src/services/reportingService.js`
  - `src/services/notificationService.js`
  - `src/services/llmInsightService.js`
  - `src/data/intelligenceData.js`
- Added behavior/event preparation for searches, category clicks, product interest, WhatsApp CTA clicks, quote requests and guide topic clicks.
- Added monthly reporting preparation and template documentation.
- Hid the Admin Intelligence Dashboard from the public homepage and preserved it as non-navigation/internal code.
- Moved visible search intelligence, trend panels and internal analytics wording out of the public frontend.

### Catalogue-Style Redesign

- Redesigned the homepage into a premium ceramics catalogue and quotation experience.
- Added structured category browsing for:
  - Floor Tiles
  - Wall Tiles
  - Bathroom Tiles
  - Outdoor Tiles
  - Sanitaryware
  - Paints
  - Adhesives & Grout
  - Installation Support
- Added product/category highlight cards, trust badges, project customer copy, helpful guides, and clean quote/contact flow.
- Preserved Kleihaus identity, contact details and Cloudflare Pages compatibility.

### Footer and Branding Cleanup

- Centered the footer copyright text.
- Removed the left-side footer branding block while preserving footer spacing and height.
- Applied the Kleihaus warm brown/gold brand color to the top strip/header accents.
- Improved WhatsApp CTA branding with WhatsApp green text/icon treatment while keeping the premium dark button style.

### Repository and Build Setup

- Existing local repository is:
  - `C:\Users\smwatu\OneDrive - Kenya Institute for Public Policy Research and Analysis\Documents\Kleihaus`
- GitHub source of truth:
  - `https://github.com/ShadrackMwatu/kleihaus`
- Main branch:
  - `main`
- Configured `.gitignore` to exclude npm/build/local artifacts:
  - `node_modules/`
  - `dist/`
  - `.env`
  - `.env.local`
  - `.DS_Store`
  - `.vscode/`
- Kept `package-lock.json` tracked for exact dependency versions.
- Confirmed npm dependency installation and Vite development/build workflow.
- Confirmed Cloudflare Pages deployment compatibility through static `npm run build` output in `dist/`.
