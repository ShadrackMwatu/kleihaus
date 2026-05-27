# Kleihaus Project Audit

This audit summarizes the current state of the Kleihaus website repository.

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
- Cloudflare Pages static deployment

## Repository Structure

Key files and folders:

- `src/App.jsx` - main customer-facing site structure and UI sections.
- `src/main.jsx` - React entry point.
- `src/styles.css` - Tailwind and site styling.
- `src/SmartImage.jsx` - image helper component.
- `src/data/contentTopics.js` - helpful guide topic foundation.
- `src/data/intelligenceData.js` - backend-ready intelligence data structures.
- `src/services/` - service layer for analytics, recommendations, reporting, notifications, quotes, email submission and future LLM insights.
- `public/images/` - site imagery.
- `public/sitemap.xml` - sitemap for indexing.
- `public/robots.txt` - crawler directives.
- `public/site.webmanifest` - web app/site metadata.
- `docs/` - project documentation.

## Deployment Flow

- GitHub repository: `https://github.com/ShadrackMwatu/kleihaus`
- Production branch: `main`
- Hosting target: Cloudflare Pages
- Build command: `npm run build`
- Build output: `dist`
- Deployment model: Cloudflare Pages automatically builds and deploys changes pushed to `main`.

Cloudflare deployment settings should not be changed casually. The current site is intended to remain a Vite static frontend deployed from GitHub.

## Public Frontend Features

The public website is a clean customer-facing ceramics catalogue and quotation platform. Current visible features include:

- Premium header with top utility strip, logo, search, navigation and WhatsApp CTA.
- Category navigation for major product groups.
- Hero section with clear business positioning.
- Shop-by-category cards.
- Product/category highlights.
- Trust and service section.
- Quantity estimator / quote helper.
- Helpful guides section for future content marketing.
- Contact and quote form.
- WhatsApp inquiry links with pre-filled messages.
- Minimal professional footer.

The public frontend should not display admin dashboards, analytics tables, AI implementation details, weak-signal detection, backend logs or endpoint configuration details.

## Backend-Ready Intelligence Features

The repository includes service-layer preparation for future backend intelligence:

- Search event capture.
- Category click tracking.
- Product interest tracking.
- WhatsApp CTA tracking.
- Quote form submission events.
- Guide topic click tracking.
- Recommendation scoring preparation.
- Weak-signal and emerging-demand preparation.
- Monthly report preparation.
- Future LLM insight generation placeholders.

Important files:

- `src/services/analyticsService.js`
- `src/services/recommendationService.js`
- `src/services/reportingService.js`
- `src/services/notificationService.js`
- `src/services/llmInsightService.js`
- `src/services/quoteRequestService.js`
- `src/services/emailSubmissionService.js`
- `src/data/intelligenceData.js`
- `docs/AI_BACKEND_ARCHITECTURE.md`
- `docs/MONTHLY_AI_REPORT_TEMPLATE.md`

These files are backend-ready foundations only. They must not expose secrets or private operational intelligence in the public UI.

## Quote and Contact Flow

Current behavior:

- The contact/quote form validates required customer details.
- It posts the quote request to the secure backend endpoint at `/api/quote-request`.
- The backend validates, sanitizes and timestamps the request.
- The backend can store quote requests in Cloudflare D1 when a database binding is configured.
- The backend prepares quote email hooks for Resend, EmailJS, SMTP or a custom API.
- The backend prepares WhatsApp Business Cloud API notification support when backend credentials are configured.
- If notification credentials are not configured, the backend still returns a captured success response so customers see "Request submitted successfully. Our team will respond shortly."
- It tracks a `quote_form_submitted` analytics event.
- The manual "Chat on WhatsApp" button remains available as a fallback.

Email submission readiness:

- Email credentials are not stored in frontend code.
- Backend variables such as `RESEND_API_KEY`, `QUOTE_EMAIL_FROM` and WhatsApp Business API tokens must be configured in Cloudflare, not committed to the repo.
- The backend endpoint can forward requests to Resend now and can later be extended for SendGrid, Mailgun, EmailJS or a custom API.

## SEO Status

Current SEO foundations include:

- Optimized page title and meta description.
- Canonical URL support.
- Robots meta directives.
- Open Graph and Twitter metadata.
- `public/sitemap.xml`.
- `public/robots.txt`.
- `public/site.webmanifest`.
- Organization, LocalBusiness, Store, WebSite, SearchAction, ContactPoint and FAQ structured data.
- One primary H1 on the homepage.
- H2/H3 hierarchy for major sections.
- Crawlable category and guide content.
- Image alt text coverage.
- Kenya-focused local SEO mentions for Nairobi, Machakos and Makueni.

See `docs/SEO_STRATEGY.md` for the detailed indexing and scaling roadmap.

## Known Limitations

- Persistent analytics and monthly reports still require a configured backend data store.
- Quote email automation requires Cloudflare backend environment variables and verified Resend sender configuration.
- Product inventory is represented as catalogue-style content, not a database-backed e-commerce catalogue.
- Search is frontend-oriented and not yet backed by a persistent search index.
- Monthly AI reports are documented and service-prepared, but not yet automatically sent.
- Social profile placeholders should remain placeholders until real official URLs are provided.

## Next Recommended Improvements

- Deploy a secure Cloudflare Worker for quote/email submissions.
- Connect a privacy-preserving analytics store such as Cloudflare D1, KV, Supabase or another database.
- Add real catalogue data with product names, dimensions, finishes, images and availability.
- Add Google Search Console and Google Analytics 4 after official account setup.
- Add official social profile URLs when available.
- Expand SEO landing pages for product and location searches.
- Add automated monthly management reports for search, quote and WhatsApp trends.
- Continue testing mobile layout, WhatsApp links, quote flow and build output before every push.
