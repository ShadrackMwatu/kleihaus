# Kleihaus SEO Automation Engine

Date: 2026-08-05

The Kleihaus SEO Automation Engine turns the existing route metadata work into one build-time automation layer. It is intentionally review-first: it generates SEO assets, reports warnings and prepares recommendations, but it does not publish content, invent claims or change Cloudflare configuration.

## Active Build Layers

### Layer 1 - Central SEO Metadata

`src/seoManifest.js` is the central source for route SEO. Each route is normalized into a configuration object with:

- `slug` / `path`
- `title`
- `description`
- `keywords`
- `image`
- `imageAlt`
- `schema`
- `breadcrumb` / `breadcrumbs`
- `canonical`
- `lastModified`
- `changefreq`
- `priority`

The same source now drives metadata injection, JSON-LD, breadcrumbs, sitemap data, robots output and primary navigation.

### Layer 2 - Sitemap And Robots

`npm run build` runs `npm run seo:generate` before Vite. The engine writes:

- `public/sitemap.xml`
- `public/robots.txt`

The sitemap is generated from the normalized route config and uses the shared `SEO_LASTMOD` value unless a route overrides it.

### Layer 3 - Image SEO Manifest

The engine scans `public/images/` and writes:

- `public/images/image-manifest.json`

The manifest groups JPG/PNG/WebP/AVIF files, responsive variants, fallback images, generated `srcset` strings and filename-based alt placeholders. It also flags missing WebP, AVIF, fallback or responsive variants in `docs/SEO_REPORT.md`.

This layer audits image readiness without adding native dependencies. A future `sharp`-powered optimizer can use the same manifest contract to resize and convert new uploads automatically.

### Layer 4 - Schema Automation

Routes declare page type, breadcrumbs, FAQs, service type and location context. The schema builder generates safe:

- `WebPage`
- `CollectionPage`
- `Service`
- `FAQPage`
- `BreadcrumbList`
- `WebSite`

The engine blocks unsupported `Product`, `Offer`, `Review` and `AggregateRating` schema.

### Layer 5 - Internal Linking Manifest

The engine writes:

- `public/seo-internal-links.json`

It combines declared related links with route-category, service, location and guide matches. This gives guide, product and location pages a reusable internal-link recommendation source.

### Layer 6 - Automated SEO Audit

Every build now runs `npm run seo:audit` after route-specific HTML generation. The audit writes:

- `docs/SEO_REPORT.md`

It checks missing titles, duplicate titles, duplicate descriptions, missing canonicals, missing breadcrumbs, missing schema, forbidden schema, missing sitemap/robots files, missing route images, broken internal references and generated route HTML coverage.

### Layer 7 - Performance Signals

The engine does not replace Vite optimization, but it reports image variant coverage and build output still reports bundle sizes. Oversized image and bundle thresholds can be added to `scripts/seo-engine.mjs` once owner-approved performance budgets are set.

## Prepared Long-Term Layers

### Layer 8 - Content Suggestions

The engine writes:

- `docs/SEO_CONTENT_SUGGESTIONS.md`

It includes review-ready metadata, internal-link and content expansion ideas based on the current route map. Once GA4, Search Console and quote data are connected, this layer can prioritize pages by impressions, clicks and lead quality.

### Layer 9 - GBP And Social Drafts

The engine writes:

- `docs/GBP_SOCIAL_DRAFTS.md`

It generates draft Google Business Profile, Facebook, LinkedIn and Instagram copy from verified product, guide and project pages. It does not publish automatically.

### Layer 10 - SEO Dashboard

The generated JSON files provide stable inputs for a dashboard:

- `public/seo-navigation.json`
- `public/seo-internal-links.json`
- `public/images/image-manifest.json`
- `public/seo-dashboard.json`
- `docs/SEO_REPORT.md`

The dashboard snapshot includes the current SEO score, route count, image readiness, metadata warnings, top route keywords, backlink opportunity categories and placeholders for GA4, Search Console, quote requests and GBP metrics.

### Layer 11 - AI SEO Agent

The long-term agent should operate in recommendation mode first. It may draft metadata, FAQs, guides, internal links and GBP/social posts, but owner approval should be required before merge or publication.

## Commands

```bash
npm run seo:generate
npm run seo:audit
npm run build
```

## Guardrails

- Do not add Product, Offer, Review or AggregateRating schema without explicit approval and truthful visible support.
- Do not invent prices, testimonials, ratings, customer names, branch locations, exact stock status or project outcomes.
- Do not change Cloudflare DNS, routes, bindings, secrets or deployment settings as part of SEO automation.
- Keep homepage conversion prompts consolidated in the final Contact section unless the owner changes that strategy.
