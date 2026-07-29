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

## Information Architecture

On 2026-07-29, the repository, production route responses and supplied strategic structure diagram were reviewed before implementing a focused information-architecture upgrade.

Implemented repo changes:

- Public primary navigation now follows `Products | Solutions | Projects | Guides | Locations | About | Contact`.
- `Request a Quotation` remains a visually distinct header action, not a top-level information category.
- `/products` was added as the parent commercial hub for tiles, sanitaryware, kitchen sinks and mixers, paints, adhesives, grout, tools and finishing support.
- `/guides` was added as a resource-centre hub linking the existing buying, renovation, paint, adhesive/grout, installation and cost-estimation guides.
- `/locations` was added as the parent local hub for Nairobi, Machakos and Makueni, with product-location pages remaining subordinate to those hubs.
- `/trade-projects` remains the canonical Solutions/audience hub for Homeowners, Home Builders, Contractors, Property Developers, Design Professionals, and Dealers & Institutional Buyers.
- `/projects` remains the distinct genuine project-gallery destination.
- The homepage sequence now places product discovery before audience pathways while preserving project inspiration, guide links, local support and final contact/quotation options.

Technical notes:

- Route metadata, canonicals, Open Graph/Twitter descriptions, breadcrumbs, sitemap entries and route-specific generated HTML were updated for the new hubs.
- `scripts/generate-route-html.mjs` now writes parent routes with child routes, such as `/locations`, as folder `index.html` assets to avoid file/directory conflicts.
- No Cloudflare DNS, routes, bindings, secrets, Worker deployment settings, quote endpoints, Product schema, Offer schema, Review schema, AggregateRating schema, fake ratings, fake reviews or fake prices were introduced.

## Homepage Commercial Positioning

On 2026-07-29, the homepage was refined after a repository and live-production homepage review showed the first journey was still dominated by quotation prompts: the hero led with `Request quote`, the catalogue cards repeated quote actions, the project-inspiration block asked for a project quote, and homepage metadata described the business around quote support and quote requests.

Implemented repo changes:

- Reframed the hero around product discovery and project support: `Tiles, sanitaryware and paints for every stage of your project`.
- Set the homepage CTA hierarchy to `Explore Products`, `Discuss Your Project` and supporting `Request a Quotation`.
- Changed category and featured-product actions toward exploration and product discussion before quoting.
- Promoted genuine project/gallery content through `Browse the Gallery`.
- Converted homepage buying-guide cards into functional links to existing guidance routes.
- Kept the quote form, mobile quote action, WhatsApp, telephone, email, `/api/quote-request`, social links, product/project galleries, six audience pathways and `/trade-projects` intact.
- Updated homepage title, meta description, Open Graph/Twitter descriptions and safe JSON-LD wording to lead with product discovery, selection guidance and project support.

Deferred recommendations: do not add prices, stock, checkout, product schema, offer schema, fake reviews, fake ratings, unverified brands, fake project claims or new duplicate routes until owner-verified evidence and operational data are available.

## SEO And Audience Marketing Campaign

On 2026-07-29, `docs/SEO_DIGITAL_MARKETING_CAMPAIGN.md` was added after a repository, production-route and competitor/source review.

Implemented repo changes:

- Added `/trade-projects` as one substantial audience hub instead of creating repetitive audience/location doorway pages.
- Refined the hub and homepage pathway block around six consolidated audiences: Homeowners, Home Builders, Contractors, Property Developers, Design Professionals, and Dealers & Institutional Buyers.
- Added audience-specific quote and WhatsApp paths using the existing enquiry flows and same Kleihaus WhatsApp number.
- Added `/trade-projects` metadata, breadcrumb support, generated route HTML and sitemap inclusion through the existing SEO manifest.
- Added `audience_pathway_click` to the privacy-safe analytics flow.

The campaign document includes the keyword-to-page map, six-audience messaging matrix, competitor benchmark, 90-day campaign plan, content calendar, paid-media structure, referral/partnership plan, Google Business Profile checklist, analytics measurement plan, intentionally deferred recommendations, external actions and owner-input requirements.

Safeguards preserved: no Cloudflare DNS, routes, bindings, secrets or deployment settings were changed. Product, Offer, Review and AggregateRating schema remain excluded.

## Official Social Profiles

On 2026-07-22, official social-media links were added to the footer Contact column and the main Contact block.

Public profile URLs used:

```text
Facebook: https://www.facebook.com/profile.php?id=61579324481913
LinkedIn: https://www.linkedin.com/company/108657250/
Instagram: https://www.instagram.com/kleihausceramics
```

Implementation notes:

- Links open in a new tab with `rel="noopener noreferrer"`.
- Each link has an accessible label and a visible platform label beside a recognizable brand-colour icon.
- Social profile clicks are tracked as `social_click` through the existing analytics service.
- Organization and LocalBusiness/HomeAndConstructionBusiness JSON-LD include the same URLs through `sameAs`.
- No Product schema, Offer schema, fake ratings, fake reviews or fake prices were introduced.

## Projects Gallery Assets

On 2026-07-22, `Projects.zip` was extracted and reviewed. It contained 9 JPG files in a `Projects` folder.

Image inspection result:

- 9 readable JPG images.
- Dimensions: six landscape images at 1600x1131 and three square images at 1280x1280.
- Orientation: 6 landscape, 3 square.
- File size range: 127,393 to 174,946 bytes.
- Metadata: only two source property IDs were detected by the local image reader; no GPS coordinates were identified.
- Duplicates: none by exact SHA-256 hash or same-size grouping.
- Corrupted/unrelated files: none found.

Storage:

```text
assets/originals/projects/
public/images/projects/
```

The original JPG uploads are preserved in `assets/originals/projects/` for auditability. Website-ready copies are stored in `public/images/projects/` with descriptive filenames, stripped metadata, JPG fallbacks and AVIF/WebP variants. Published project imagery supports kitchen finishing content only, so the footer includes `View All Projects` and `Kitchen Projects` links, not unsupported bathroom or broad installation categories.

The `/projects` page uses neutral wording: selected projects feature tiles, sanitaryware, paints and finishing solutions supplied or supported by Kleihaus. It does not claim Kleihaus completed installation, name customers, provide project dates, publish precise locations or invent outcomes.

## Full Website Conversion Audit

On 2026-07-16, a comprehensive commercial conversion audit was added at `docs/KLEIHAUS_FULL_WEBSITE_CONVERSION_AUDIT.md`.

Current commercial score summary:

- Overall commercial effectiveness: 86/100
- Conversion readiness: 88/100
- Mobile conversion: 89/100
- Trust and credibility: 76/100
- Product discovery: 82/100
- Local SEO/customer acquisition: 88/100
- Measurement readiness: 88/100

Repo-supported improvements implemented with the audit:

- Quote form guidance now asks for measurements, location, product needs, timing, finish and budget details.
- Quote and support success/error messages now give clearer follow-up actions.
- Support modal copy now better guides customers toward product, quote, delivery and installation questions.
- Product, route and guide CTA labels are more commercially specific.
- Analytics event payloads now preserve page type, CTA label, CTA position, contact method, enquiry intent, guide name, form name, form step, form status, lead source and device type.

The audit identifies owner-input requirements before stronger trust claims can be added: confirmed location details, business hours, delivery areas, response-time commitment, payment methods, product brands, availability, price ranges, warranties, returns guidance, showroom photos, project photos, testimonials and Google Business Profile links.

## SEO Audit And Route Metadata Hardening

On 2026-07-22, the current repository and live website were re-audited after the social profile update.

Live baseline findings:

- `https://www.kleihaus.com/`, `/robots.txt`, `/sitemap.xml`, `/sanitaryware`, `/locations/nairobi` and `/tile-buying-guide` returned 200.
- `http://www.kleihaus.com/sanitaryware` redirected to `https://www.kleihaus.com/sanitaryware`.
- `https://kleihaus.com/sanitaryware` returned 200 instead of redirecting to the canonical `www` host.
- `https://www.kleihaus.com/definitely-not-a-real-kleihaus-page` returned 200, creating soft-404 risk under the current SPA asset fallback.
- Live `/sanitaryware` initial HTML still showed the homepage title/canonical, which means Worker route metadata injection was not active for normal page requests while `run_worker_first` remains limited to `/api/*`.

Repo-level improvements made:

- Added build-time route HTML generation through `scripts/generate-route-html.mjs` and `npm run generate:route-html`.
- Route-specific extensionless HTML assets are generated for every non-homepage SEO route in `src/seoManifest.js`, matching the sitemap's extensionless canonical URLs.
- Shared route metadata injection now lives in `src/seoHtml.js` and is used by both the Worker and the build-time generator.
- `public/sitemap.xml` now regenerates with `2026-07-22` `lastmod` values.
- No Cloudflare DNS, route, binding, secret or deployment-setting changes were made.

Remaining operations item: canonical apex-to-`www` redirect and unknown-route 404 behavior still require an explicit Cloudflare/asset-routing decision because the current request prohibited deployment configuration changes.

## Google Business Profile Conversion Note

The latest Google Business Profile performance signal reviewed on 2026-07-07 covered June 2026 and showed 62 profile views with 0 calls, 0 chat clicks, 0 website visits and 0 total interactions. Repo-only improvements now support visitors arriving from GBP with:

- A compact homepage local conversion section for tiles, sanitaryware, paints, adhesives, tools, delivery support, installation guidance, project quote planning and training/technical support.
- Direct call, WhatsApp and quote actions from the homepage support section and route-page local support blocks.
- Clear service-area links for Nairobi, Machakos and Makueni.
- UTM capture through existing first-party analytics, plus GA4 event parameters for source, medium and campaign when GA4 is configured.

Recommended Google Business Profile website URL:

```text
https://www.kleihaus.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp
```

Manual follow-up outside the repo: update the Google Business Profile website link in the Google profile manager after deployment.

## Sanitaryware Image Assets

On 2026-07-07, `sanitaryware.zip` was extracted and reviewed. It contained 21 JPG files at 1071x1428; 10 were exact duplicates, leaving 11 unique sanitaryware showroom images.

On 2026-07-22, the additional `Sanitaryware.zip` from `C:\Users\smwatu\Downloads\Regulations EPR\` was extracted and reviewed. It contained 9 readable JPG images showing kitchen sink, mixer, countertop and backsplash scenes.

Additional image inspection result:

- Dimensions: six landscape images at 1600x1131 and three square images at 1280x1280.
- Orientation: 6 landscape, 3 square.
- File size range: 127,393 to 174,946 bytes.
- Metadata: Sharp reported no EXIF, IPTC or XMP metadata in the uploaded files.
- Duplicates: no exact duplicates inside the uploaded ZIP; the visible content matches the recent kitchen project image set, so copy and usage remain neutral.
- Corrupted/unrelated files: none found.

Optimized image storage:

```text
assets/originals/sanitaryware-kitchen-sinks/
public/images/sanitaryware/
```

This folder is inside the local Kleihaus project path:

```text
C:\Users\smwatu\OneDrive - Kenya Institute for Public Policy Research and Analysis\Documents\Kleihaus\public\images\sanitaryware\
```

The site uses these images in:

- Homepage hero carousel/moving image block.
- Homepage Sanitaryware catalogue card and product group.
- `/sanitaryware` category route gallery.
- Sanitaryware service-location page image sets.

The duplicate ZIP entries and raw upload filenames from the first upload were not committed. The additional 2026-07-22 sink and mixer upload is preserved under `assets/originals/sanitaryware-kitchen-sinks/` and published with descriptive `sanitaryware-kitchen-*` filenames. Website-ready copies use JPG fallbacks plus WebP and AVIF variants matching the existing site image delivery pattern. The new `/sanitaryware` gallery stories are limited to visible sink, mixer, countertop and backsplash details and do not invent brands, prices, reviews, precise locations, dates or installation outcomes.

## SEO Effectiveness Audit

On 2026-07-08, the dedicated post-update SEO effectiveness audit was added at `docs/SEO_EFFECTIVENESS_AUDIT.md`.

After the 2026-07-22 SEO audit and route metadata hardening, current repo-level score summary:

- Overall SEO effectiveness: 90/100
- Technical SEO: 90/100
- Local SEO: 92/100
- Content SEO: 87/100
- Image SEO: 89/100
- Schema SEO: 92/100
- Analytics/measurement readiness: 89/100
- Performance SEO: 83/100
- UX/accessibility SEO: 90/100

The audit confirms that Kleihaus has a strong quote-led local SEO foundation after the Phase 1, GBP, analytics/Search Console, sanitaryware image and social profile updates. The 2026-07-08 implementation reduced major repo-level constraints by adding the shared route manifest, sitemap generation, visible breadcrumbs with matching BreadcrumbList schema and deeper service-location content. The 2026-07-22 implementation added build-time route-specific HTML assets so direct extensionless route requests can carry their own initial metadata without changing Cloudflare DNS, routes, bindings, secrets or deployment settings. Remaining constraints are mostly external or operational: verified GA4/Search Console reporting, GBP profile updates, apex-to-`www` redirect policy, unknown-route 404 behavior, real-world proof signals, accurate business hours if available and ongoing performance monitoring.

## Advanced SEO Implementation

The current SEO implementation now includes:

- `src/seoManifest.js` as the shared route source for route metadata, sitemap generation, build-time route HTML and Worker metadata injection.
- Checked-in `public/sitemap.xml` regenerated during `npm run build`, plus Worker sitemap support when the Worker handles `/sitemap.xml`.
- Route-specific initial HTML title, meta description, canonical, Open Graph, Twitter/X and safe JSON-LD generated as extensionless static route assets during `npm run build`.
- `/projects` route metadata, breadcrumb, generated route HTML and sitemap coverage backed by genuine project images.
- Shared metadata injection in `src/seoHtml.js`, reused by `src/worker.js` and `scripts/generate-route-html.mjs`.
- Visible breadcrumbs on category, guide, location and service-location pages.
- Matching BreadcrumbList JSON-LD generated from the same breadcrumb model used by the visible UI.
- Deeper local service-location page copy covering project types, customer needs, delivery support, selection guidance and local FAQs.

Schema boundaries remain conservative: Organization/HomeAndConstructionBusiness, WebSite, ContactPoint, WebPage/CollectionPage, BreadcrumbList, ItemList, Service and FAQPage are allowed where backed by visible content. Product schema, Offer schema, fake ratings, fake reviews and fake prices remain excluded.

## SEO Authority And Measurement Roadmap

On 2026-07-08, the repository added operational SEO authority and measurement documentation to support a move from a strong repo-level SEO score toward the 93-95/100 range after production setup and real-world proof signals are completed.

New docs:

- `docs/GOOGLE_BUSINESS_PROFILE_OPTIMIZATION.md` - tracked GBP URLs, category/service-area review, photo plan, post ideas, genuine review workflow and monthly GBP monitoring.
- `docs/SEO_CONTENT_ROADMAP.md` - six-month content roadmap for tile quantity, adhesive calculation, sanitaryware, paints, installation mistakes, commercial flooring, local service needs and future genuine case studies.
- `docs/CASE_STUDY_TEMPLATE.md` - reusable framework for approved real project case studies.
- `docs/BACKLINK_OUTREACH_PLAN.md` - ethical outreach plan for suppliers, architects, designers, contractors, directories, associations and local networks.
- `docs/MONTHLY_SEO_REPORT_TEMPLATE.md` - monthly Search Console, GA4, first-party conversion, GBP and referral reporting template.

The live site also received a small, safe content improvement: guide routes now include a compact project-planning CTA block and stronger internal links to relevant local service pages and location hubs. No Cloudflare configuration, DNS, routes, bindings, secrets or deployment settings were changed.

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
- Customer-facing WhatsApp CTAs use same-tab `wa.me/254748827166?text=...` click-to-chat links; browsers cannot send WhatsApp messages silently without opening WhatsApp.
- Contact actions expose verified `mailto:sales@kleihaus.com`, `tel:+254748827166` and WhatsApp click-to-chat links, with visible labels and WhatsApp logo/green branding on WhatsApp CTAs.
- Support modal submissions send `channel: "whatsapp"` and `intent: "support"`.
- WhatsApp-channel backend submissions send WhatsApp Business API staff notifications when credentials are configured and explicitly skip internal/customer email.
- If WhatsApp Business API credentials are missing or delivery is unconfirmed, visitors still see a neutral support request received message while backend logs retain skipped/failed delivery details for audit.
- WhatsApp Business API notification remains optional and missing credentials do not break quote or support submission.
- D1 stores `channel` and `intent` where the extended schema is available, with legacy insert fallback preserved.

## Analytics And Conversion Tracking

- First-party anonymous journey tracking remains active through `/api/track-event`.
- Optional GA4 support is configured through `VITE_GA_MEASUREMENT_ID`; when the variable is absent, GA4 is not loaded and no console error is expected.
- GA4 must be configured in the Cloudflare Workers Builds environment before the production build runs; it is not a runtime secret and no real Measurement ID is committed.
- Optional `VITE_ANALYTICS_DEBUG=true` logs only non-sensitive event names and metadata for local/test debugging.
- GA4 conversion hooks map successful quote submissions to `quote_submit` and also support `whatsapp_click`, `phone_click`, `email_click`, `guide_click`, `guide_view`, `location_view` and `cta_click`.
- Analytics payloads remain privacy-safe and should not include names, phone numbers, email addresses or free-form quote messages.
- Operational setup and verification steps live in `docs/ANALYTICS_AND_SEARCH_CONSOLE_SETUP.md`.

## Phase 2 Conversion Surface

- Mobile visitors see a persistent bottom action bar with WhatsApp click-to-chat and Request Quote actions.
- The support form remains available from the quote/contact panel and can submit backend support requests with optional WhatsApp Business API staff notification.
- The homepage includes a compact trust section for Fast Response, Wholesale & Retail, Delivery Support and Professional Guidance.
- A customer project gallery uses existing assets from `public/images/` for project inspiration without adding new media dependencies.
- FAQ content targets common local search and Google Business Profile conversion questions around tile prices, sanitaryware prices, paint prices, delivery and installation support.
- Category landing pages include related category links to improve internal navigation between tile, sanitaryware, paint and installation pages.
- All visible phone numbers are rendered as click-to-call `tel:` links.
- Structured data remains safe for Search Console: no Product or Offer JSON-LD is used; LocalBusiness and FAQ data describe service areas and quote guidance without fake prices.

## Compact Layout Pass

- The visible homepage blocks are intentionally compact: tighter header/category navigation, reduced hero height, smaller trust cards, denser catalogue cards, compact project gallery, shorter FAQ cards and a reduced footer.
- The bottom buying guidance area is reduced to four concise guide cards and a compact FAQ accordion to preserve useful customer answers with less vertical height.
- The About block positions Kleihaus as a finishing partner for materials, advisory, logistics, installation support and tailored training, with professional workflow language that avoids unsupported distributor claims.
- The About/Company section also includes Kleihaus Ceramics' Vision, Mission and Core Values in a compact customer-facing brand block.
- Quote and support blocks keep clear CTAs while avoiding repeated trust/support copy.
- WhatsApp/support CTAs use the same green primary-button visual system as catalogue quote actions, with white icon/text and consistent hover/focus states.
- WhatsApp CTAs use a lightweight inline WhatsApp logo in the shared button treatment so support actions are visually distinct from email and phone actions.
- Reusable button components avoid default-background conflicts when custom CTA backgrounds are supplied, preventing blank white CTA blocks in the hero and other high-value actions.
- Category navigation labels, guide targets and sitemap entries are aligned for the active category landing pages, including `/installation-support`.
- The compactness pass does not change `/api/quote-request`, Worker Assets deployment, D1 bindings, structured data policy or communication channel routing.

## SEO Audit And Metadata

- The public route set now includes `/`, core category routes, local SEO service routes and practical buying/project guide routes.
- Local SEO routes cover tiles, sanitaryware, paints and installation support for Nairobi, Machakos, Makueni and Kenya using service-area wording rather than unsupported branch/location claims.
- Location hub routes `/locations/nairobi`, `/locations/machakos` and `/locations/makueni` provide the preferred structure for location-specific guide discovery without creating many near-duplicate location-guide pages.
- Nairobi, Machakos and Makueni location hubs include compact local FAQs and location-specific CTA labels so local content is useful without creating thin duplicate guide-location pages.
- Guide routes include `/tile-buying-guide`, `/bathroom-renovation-guide`, `/paint-selection-guide`, `/adhesive-grout-guide`, `/installation-best-practices` and `/cost-estimation-guide`.
- Each category route has route-aware title, meta description, canonical URL, Open Graph/Twitter metadata and safe CollectionPage/BreadcrumbList JSON-LD generated by the React app.
- `public/sitemap.xml` includes all current public routes with `lastmod` values, and `public/robots.txt` allows crawling and points to the sitemap.
- Search Console setup should use `https://www.kleihaus.com/`, submit `https://www.kleihaus.com/sitemap.xml`, and inspect the route checklist documented in `docs/ANALYTICS_AND_SEARCH_CONSOLE_SETUP.md`.
- Structured data remains Search Console-safe: Organization, LocalBusiness/HomeAndConstructionBusiness, WebSite/SearchAction, FAQPage, ItemList, CollectionPage and BreadcrumbList are used; Product, Offer, AggregateRating and review schema are intentionally not used because Kleihaus does not publish product-level prices, inventory or verified reviews.
- Route-level JSON-LD can include safe Service schema for verified service-location pages and FAQPage schema where matching visible local FAQ content exists.
- Footer product links now provide crawlable internal links to the category guide routes, popular searches, project guides and locations served.
- Known limitation: because the customer site is a Vite single-page app, route metadata is updated client-side after JavaScript loads. The static `index.html` still provides strong homepage metadata, while `docs/SEO_AUDIT.md` records remaining options if server-rendered or edge-rendered metadata is needed later.

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

- Premium header with top utility strip, logo, search, state-driven navigation and WhatsApp click-to-chat CTA.
- Category navigation for major product groups that opens the compact catalogue panel and highlights the selected category.
- Home area with clear business positioning, premium hero carousel and hero trust badges.
- Hero messaging leads with "Tiles. Sanitaryware. Paints.", retail/wholesale/project quote positioning and Nairobi, Machakos and Makueni service areas.
- Compact segmented content area for Catalogue, About, Guidance and Quote.
- Catalogue panel with clickable category cards, icons, descriptions and quote CTAs.
- Catalogue cards include compact use-case and quote-support tags to reinforce sourcing, delivery and professional guidance.
- Catalogue category cards include consistent premium "View guide" links. Dedicated category guides point to their landing pages; Outdoor Tiles points to floor tile guidance and Installation Support points to its own installation guide.
- Category landing pages for `/floor-tiles`, `/wall-tiles`, `/bathroom-tiles`, `/sanitaryware`, `/paints`, `/adhesives-grout` and `/installation-support`.
- About panel with Kleihaus positioning, service areas and concise trust/support points.
- Guidance panel with concise quote-planning tips.
- Quote panel with the existing quote form and direct contact details.
- Mobile layout uses reduced hero sizing, compact trust badges and catalogue cards, narrowed panel spacing and a sticky WhatsApp / Request Quote action bar.
- Mobile footer places the WhatsApp CTA above the green branding strip; the green strip remains the final visible footer element.
- WhatsApp CTAs open WhatsApp/Web WhatsApp using the official click-to-chat format; support form submissions use `/api/quote-request` with `channel: "whatsapp"`.
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
- `public/sitemap.xml` includes the homepage and seven category landing page URLs without fragment-only sitemap entries.
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
