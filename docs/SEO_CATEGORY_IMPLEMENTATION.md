# Six-Category SEO Implementation

The existing engine now adds six-category reporting during generation and build. It does not replace the central manifest, commercial model, existing metadata/schema, production verifier or GBP draft generator.

## Automated Work

- On-page: route URL, metadata and alt-map checks; existing keyword and internal-link model retained. `npm run seo:browser` checks rendered H1/canonical/image/mobile-overflow basics and records heading skips, visible word counts and unrecognized internal destinations for review. It does not enforce keyword density or arbitrary word counts.
- Off-page: generates a supplier/partner, guest contribution, digital PR and creator outreach review queue. No external publishing, scraping of private contacts, paid ranking links or bulk messages.
- Technical: records actual dist JS/CSS sizes and oversized source images, separate from unconnected field Core Web Vitals. Existing builds already minify/tree-shake and serve optimized image variants. Production HTTPS/route verification and mobile layout tests remain separate execution checks, never inferred as passed.
- Local: compares Organization and LocalBusiness name/phone/email declarations. Missing physical address, external citations, GBP ownership and genuine review evidence stay unverified. Provides neutral review-request and response drafts, never review gating or incentives.
- Content: creates high-intent route briefs and a 180-day editorial-review queue using declared lastModified. It never refreshes timestamps to imply an edit, invents expertise, or adds filler for length.
- E-commerce: preserves quote-led categories. Product and review schema remain gated until individual product pages, verified visible data, eligible genuine reviews and owner approval exist. No prices, ratings or stock are fabricated.

## Outputs and Use

- `public/seo-dashboard.json`: new `categories` object; existing technical and commercial fields remain intact.
- `docs/SEO_CATEGORY_AUTOMATION_REPORT.md`: generated findings across all six categories.
- `docs/SEO_OFFPAGE_LOCAL_REVIEW_QUEUE.md`: generated outreach and local review workflows; human approval required.
- `npm run seo:test`: all Node SEO regression tests.
- `npm run seo:browser`: live production by default; use PLAYWRIGHT_BASE_URL for a local preview. Browser output contains aggregate page findings, not form input or personal analytics data.

Build-time reports do not execute browsers, contact prospects or call private APIs. Asset measurements during prebuild may describe a previous dist; the postbuild audit measures the current bundle. Local consistency does not establish external NAP correctness. Existing unverified priceRange is flagged for owner review rather than used as price evidence.

## Validation and Link Correction

Installation, build, 11 Node tests, analytics wiring and production verification (39 routes / seven endpoints) passed. The new browser audit checked 39 routes and detected an undeclared /locations/kenya link in country-page related links. Its narrowly scoped correction points to the existing /locations hub with the label Service areas. The browser test now asserts all internal page destinations are declared. No enquiry flow or route architecture was changed.

## Owner Dependencies

Owner-approved business details and GBP access; verified suppliers and media rights; genuine customer review permission/provenance; product specifications; approved GSC/GA4/CrUX data access. No backlinks or ranking improvement are claimed as achieved by creating workflows.

## Guidance

- [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google local ranking guidance](https://support.google.com/business/answer/7091)
- [Google product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
