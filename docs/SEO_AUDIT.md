# Kleihaus SEO Audit

Date: 2026-06-18

This audit covers repo-level SEO implementation for the active Kleihaus architecture:

```text
GitHub main
-> Cloudflare Workers Builds
-> Worker Assets
-> Worker "kleihaus"
-> kleihaus.com / www.kleihaus.com
```

No DNS, Cloudflare settings, Worker bindings, secrets, backend API routes, quote form behavior or WhatsApp/support routing were changed.

## Scope Checked

- `index.html`
- `src/App.jsx`
- `public/sitemap.xml`
- `public/robots.txt`
- `public/site.webmanifest`
- Public image metadata and alt text usage
- Route-aware metadata logic
- JSON-LD structured data
- Canonical URLs
- Open Graph and Twitter Card tags
- Internal category links and route coverage
- Local SEO signals for Nairobi, Machakos, Makueni and Kenya

## Current Strengths

- Homepage static metadata includes a focused title, meta description, canonical URL, Open Graph tags and Twitter Card tags.
- The React app updates title, description, canonical, Open Graph, Twitter Card and JSON-LD metadata for category guide routes.
- The site uses safe structured data: Organization, LocalBusiness/HomeAndConstructionBusiness, WebSite/SearchAction, FAQPage, ItemList, CollectionPage and BreadcrumbList.
- FAQ JSON-LD is aligned with visible FAQ content and avoids fake pricing claims.
- Category pages contain descriptive H1/H2 content, meaningful image alt text and related category links.
- `robots.txt` allows public crawling and points to the sitemap.
- Sitemap coverage is focused on real public routes only.
- Image optimization work is already in place with modern image variants and lazy loading for non-critical images.

## Issues Found

- A broad `/tiles` route was expected for SEO coverage but was not yet represented as a dedicated category landing page.
- Sitemap entries did not include `lastmod` values or the broader `/tiles` route.
- Static homepage social image metadata relied on the logo instead of a richer site image suitable for previews.
- Static ItemList category URLs pointed to the homepage catalogue anchor rather than the real category guide routes.
- LocalBusiness schema did not fully reflect Kleihaus' current value proposition around tools, finishing advisory, delivery coordination, installation support and tailored training.
- The broader `/tiles` guide needed a visible internal link so it was not sitemap-only.

## Fixes Implemented

- Added a dedicated `/tiles` route with route-aware title, description, canonical URL, category content, images and safe CollectionPage metadata.
- Added `/tiles` to `public/sitemap.xml` and added `lastmod` values for every sitemap URL.
- Updated Open Graph and Twitter image metadata to use a representative Kleihaus site image with alt text.
- Enriched LocalBusiness structured data with HomeAndConstructionBusiness, service types and natural `knowsAbout` terms for materials, tools, delivery, installation and training.
- Updated homepage ItemList JSON-LD so catalogue category items link to real category routes.
- Added crawlable footer product links for category guide routes, including `/tiles`.
- Updated the web manifest description to include tools, delivery coordination, installation support and finishing advisory.

## Structured Data Policy

No Product, Offer, AggregateRating or review schema was added.

This is intentional. Kleihaus currently presents quote-led categories rather than product-level pages with live prices, availability or verified reviews. Adding Product rich-result schema without those facts would risk Search Console warnings and misleading markup.

## Public Route Coverage

- `/`
- `/tiles`
- `/floor-tiles`
- `/wall-tiles`
- `/bathroom-tiles`
- `/sanitaryware`
- `/paints`
- `/adhesives-grout`
- `/installation-support`

## SPA Metadata Limitation

Kleihaus is a Vite single-page app. The static `index.html` provides strong homepage metadata for crawlers and social previews. Category route metadata is updated client-side after JavaScript loads.

Most modern search crawlers can process client-rendered metadata, but static source inspection tools may only see the homepage defaults. If future SEO needs become more demanding, the next step would be an edge-rendered or prerendered metadata strategy without changing the active Worker Assets architecture.

## Verification Checklist

- Run `npm install`.
- Run `npm run build`.
- Run `git diff --check`.
- Validate JSON-LD blocks parse as JSON.
- Scan source and build output for Product, Offer and AggregateRating schema.
- Confirm `robots.txt` references `https://www.kleihaus.com/sitemap.xml`.
- Confirm sitemap XML includes all current public routes.
- After deployment, run Google Rich Results Test and request validation in Google Search Console.

## Remaining Recommendations

- Submit the updated sitemap in Google Search Console after deployment.
- Use Google Rich Results Test on the homepage and key guide routes.
- Keep Google Business Profile categories, service areas, phone number and website URL aligned with the site copy.
- Add more granular location/service pages only if Kleihaus can maintain useful, non-duplicate content for those pages.
- Continue avoiding Product/Offer schema until product-level pages have real displayed prices, availability and accurate offer details.
