# Kleihaus Project Changelog

This changelog records meaningful project work so the Kleihaus website can be audited from the repository.

Rule: Every future meaningful change must update `docs/CHANGELOG.md` and, where relevant, `docs/PROJECT_AUDIT.md`.

Current deployment note: production now uses GitHub `main` -> Cloudflare Workers Builds -> Worker Assets -> Worker `kleihaus` -> `kleihaus.com` and `www.kleihaus.com`. The active quote endpoint is `/api/quote-request`. Older entries that mention Cloudflare Pages or `https://api.kleihaus.com/quote-request` are historical and describe earlier deployment states, not the current production path.

## 2026-06-03

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
