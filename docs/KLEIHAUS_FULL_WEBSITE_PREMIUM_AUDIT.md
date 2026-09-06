# Kleihaus full website premium experience audit

Audit date: 2026-09-06. Evidence reviewed: repository source, route manifest, generated SEO outputs, production verifier, image manifest, analytics verification, existing Playwright test and the current public architecture. The live browser screenshot pass was unavailable because the browser automation service reached its usage limit; visual findings are therefore marked as source-based or unverified where appropriate.

## Executive assessment

Kleihaus already presents a coherent, usable building-materials website with a clear commercial route structure, genuine product/project imagery, working enquiry channels and strong technical SEO plumbing. It feels more like a real supplier than a blank template, but it has not yet reached premium-brand credibility because the repository cannot verify a physical showroom story, operating hours, delivery proof, product specifications, approved customer proof or named supplier relationships.

The safest improvement in this pass removes the decorative page-level radial background and applies a global reduced-motion safeguard. This makes the visual system quieter and more architectural without changing the information architecture, quote flow, WhatsApp behaviour, SEO engine or Cloudflare code.

## What works well

- The main navigation and footer cover About, Products, Solutions, Projects, Guides, Locations and Contact without requiring a new site hierarchy.
- The homepage states “Tiles. Sanitaryware. Paints.” above a direct product discovery action.
- Products are organized into genuine categories: tiles, sanitaryware, kitchen sinks and mixers, paints, adhesives/grout and installation support.
- The projects gallery uses supplied photographs and neutral wording about materials “supplied or supported by Kleihaus”.
- Contact offers WhatsApp, phone, email and quote paths; the existing implementation records privacy-safe analytics events.
- The hero carousel supports manual controls, lazy loading for non-critical slides and reduced-motion preference.
- Images use the existing optimized image component and the repository contains WebP, AVIF and fallback assets.
- Route metadata, canonicals, breadcrumbs, sitemap, robots and structured data are generated from the existing SEO system.

## Baseline scores

| Area | Score | Evidence and limitation |
| --- | ---: | --- |
| Modernity | 78 | Responsive React interface, image-led sections and clear controls; live visual screenshot audit unavailable |
| Premium perception | 70 | Restrained green/neutral palette and real imagery; decorative styling and missing showroom proof reduce distinction |
| Business realism | 68 | Genuine contacts, imagery and service language; physical business evidence is incomplete |
| Trust | 64 | Contact routes and practical guidance are present; no verified hours, policies, testimonials or supplier proof in scope |
| Homepage effectiveness | 82 | Clear offer and product CTA; message still relies on broad category language |
| Product discovery | 78 | Category hubs and guides exist; no full product catalogue, filters or comparison data |
| Information architecture | 84 | Strong seven-part structure and shallow primary navigation; About/Contact are homepage sections rather than standalone routes |
| Mobile UX | 80 | Responsive classes, touch sizing and reduced-motion support are present; live device pass pending |
| Desktop UX | 82 | Wide max-width layouts and predictable sections; visual pass pending |
| Visual consistency | 79 | Shared cards, buttons, icons and image treatment; some repeated card patterns feel template-like |
| Content quality | 76 | Practical, careful copy; repeated “quote support” phrasing needs future editorial refinement |
| Projects/social proof | 72 | Genuine project images and neutral claims; project context and verified outcomes are absent |
| Contact experience | 86 | Four direct channels, location links and analytics; hours/location detail needs owner input |
| Quote journey | 84 | Existing form and success/error states are in place; end-to-end live submission was intentionally not performed |
| Performance | 73 | Build pipeline and modern formats are present; field Core Web Vitals are not measured |
| Accessibility | 82 | Labels, focus styles, alt text and reduced motion are implemented; full keyboard/screen-reader audit pending |
| SEO/UX integration | 86 | 39 route manifest and generated assets; commercial performance data is not connected |

Overall website experience score: **78/100**. This is a conservative repository-based experience score, separate from the engine’s 100/100 technical check score.

## Findings by priority

### P0: fix before scaling acquisition

No confirmed P0 defect was found in source/build/production route checks. The live GA4 Playwright test still has a known WhatsApp delivery gap, but this audit does not attribute it to the visual change.

### P1: high-impact improvements

- Add verified business hours, physical/showroom details and service-area boundaries.
- Add a compact product information pattern for dimensions, finish, application, compatibility and pack/quantity guidance when confirmed.
- Improve Projects into case-study entries only when project context and Kleihaus involvement are documented.
- Connect private Search Console/GA4 reporting and a minimal outcome register so acquisition can be measured beyond clicks.
- Keep the visual surface quiet. The page-level decorative radial background was removed and reduced-motion behaviour was strengthened in this pass.

### P2: worthwhile refinements

- Add product filters by room, material, finish, size and project type only after a verified catalogue exists.
- Refine repeated generic phrases and replace them with customer questions and concrete buying guidance.
- Make About and Contact standalone routes only if there is enough unique content to avoid duplicating homepage sections.
- Add a small delivery-planning explainer with confirmed service areas, lead times and constraints.

### P3: optional enhancements

- Add comparison or saved-enquiry tools after catalogue data and analytics prove the need.
- Add richer project filtering after enough genuine projects exist to support meaningful categories.

## Premium and realism audit

Present: real product imagery, supplied project photographs, Kenyan service-area references, phone, WhatsApp, email, quote flow, practical guidance and neutral claims. Weak: physical presence, delivery evidence, named expertise and project context. Business content required: opening hours, showroom photographs, product specifications, verified customer proof, policies, delivery details and supplier/brand information.

The current copy avoids prices, inventory, brands, ratings, reviews, project dates and customer identities. Preserve that discipline. “Professional guidance”, “reliable service” and similar phrases should be supported over time by visible evidence rather than expanded as claims.

## Structure and customer journey

The structure is strong for a first visit: homepage identity -> product categories -> guides/projects/locations -> Contact. The main friction is not navigation depth; it is the amount of information a buyer still needs to ask for. A customer can identify what Kleihaus sells and how to contact the business, but cannot consistently confirm exact product specifications, hours, delivery terms, warranty/returns or showroom arrangements.

Recommended journey: guide or search landing page -> product category -> project/reference page -> Contact or quotation. Keep one primary contact area per page and preserve the current CTA simplification.

## Desktop and mobile findings

Source evidence supports responsive grids, wrapped buttons, horizontal category navigation, explicit image aspect ratios and 44px form/header controls. The live desktop/mobile screenshot review could not be completed because browser automation was unavailable. Treat clipping, keyboard order, real device scroll depth and final image crops as open verification items.

## Deliberate non-changes

Do not add speculative location pages, invented testimonials, fake ratings, brands, prices, product schema, Offer schema, additional GA4 loaders or a second CTA system. Do not change Cloudflare, quote handling, WhatsApp navigation, analytics architecture or SEO route generation as part of this audit.

## Five highest-impact remaining improvements

1. Publish verified showroom/location details and operating hours.
2. Add verified delivery/service-area and order-planning information.
3. Build a real product information layer from an approved catalogue.
4. Add approved project context and customer proof.
5. Connect Search Console, GA4 reporting and private lead outcome classification.
