# Kleihaus SEO Strategy

## Phase 1 Audit Snapshot

### HTML Metadata

- Title existed, but has been upgraded to: `Kleihaus Ceramics | Tiles, Sanitaryware, Paints & Building Materials Kenya`.
- Meta description existed, but has been tightened for Kenya-wide search intent.
- Canonical URL is set to `https://www.kleihaus.com/`.
- Robots directives are set to `index, follow, max-image-preview:large`.
- Viewport metadata is present for responsive rendering.

### Open Graph and Twitter

- Open Graph and Twitter metadata are present.
- Social preview image uses the Kleihaus logo until a dedicated social preview image is produced.
- `og:image:alt` was added for accessibility and social preview clarity.

### Semantic Structure

- The homepage keeps one visible H1.
- Major sections use H2 headings and cards use H3 headings.
- Category, product and inspiration images now include descriptive alt text.
- Internal anchors remain focused on catalogue and contact journeys.

### Technical SEO

- `public/sitemap.xml` exists and includes the homepage plus catalogue/contact anchor targets requested for the single-page structure.
- `public/robots.txt` allows crawling and references the sitemap.
- `public/site.webmanifest` was added.
- Cloudflare Pages compatibility is preserved.
- Current route handling remains a single-page application; future dedicated routes can be added later if needed.
- Broken link risk is low because internal links use stable `#top`, `#catalogue`, `#contact` and `#faq` anchors, while phone, email and WhatsApp links use explicit protocols.
- Duplicate content risk is limited on the current single-page build, but future dedicated pages should use canonical URLs and unique descriptions.
- Mobile responsiveness is handled through the existing responsive grid, mobile menu and sticky WhatsApp CTA.

### Local SEO

- Nairobi, Machakos, Makueni and Kenya are included in visible content and JSON-LD.
- Contact details remain consistent:
  - Phone/WhatsApp: `+254 748 827 166`
  - Email: `sales@kleihaus.com`
  - Website: `https://www.kleihaus.com/`
- Structured data includes Organization, LocalBusiness, Store, WebSite, SearchAction and ContactPoint.

### Performance SEO

- Build output remains lightweight for a Vite/React catalogue site.
- Images now use lazy loading and async decoding where appropriate.
- The hero image remains eager-loaded because it is likely the largest above-the-fold visual.
- Larger image assets should later be converted into optimized WebP/AVIF variants.
- Current largest assets include product/showroom images; they are useful catalogue media but should be resized into responsive variants before scaling content volume.
- Render-blocking risk is low in the current Vite build, but future third-party scripts should be added carefully and deferred where possible.

### AI / LLM Discoverability

- Added machine-readable business and catalogue summaries.
- Added FAQ content and FAQ structured data.
- Product/category content is crawlable in semantic sections.
- Analytics and intelligence services remain backend-oriented and are not displayed publicly.

## Implemented SEO Features

- Premium homepage title and description.
- Canonical and robots metadata.
- Favicon and manifest support.
- Organization, LocalBusiness, Store, WebSite, SearchAction and ContactPoint JSON-LD.
- FAQPage JSON-LD.
- Crawlable catalogue summary.
- Areas We Serve section for Nairobi, Machakos and Makueni.
- FAQ section for tile selection, grout selection, delivery, project support and sanitaryware guidance.
- Image alt text, lazy loading and async decoding.
- Sitemap and robots updates.
- SPA document title/meta refresh through the React layer.

## Google Indexing Steps

1. Confirm `https://www.kleihaus.com/robots.txt` is reachable.
2. Confirm `https://www.kleihaus.com/sitemap.xml` is reachable.
3. Submit the sitemap in Google Search Console.
4. Request indexing for the homepage after deployment.
5. Inspect the rendered HTML and mobile usability report after Google crawls the site.

## Search Console Setup

- Verify the domain property or URL prefix property for `https://www.kleihaus.com/`.
- The existing Google verification file in `public/` can support HTML-file verification if it matches the active Search Console property.
- Submit the sitemap URL.
- Monitor indexing, page experience, Core Web Vitals, query impressions and mobile usability.

## Future SEO Scaling Roadmap

- Add dedicated pages/routes for:
  - Floor tiles in Kenya
  - Bathroom tiles Kenya
  - Sanitaryware Kenya
  - Tile adhesive and grout Kenya
  - Paints and finishes Kenya
  - Tiles in Nairobi
  - Building materials in Machakos
  - Tile supply in Makueni
- Add original product photography and optimized WebP/AVIF image variants.
- Add FAQ expansions based on real quote questions.
- Add internal links from guides to relevant catalogue sections.

## Local SEO Roadmap

- Complete and verify Google Business Profile.
- Add official opening hours after business confirmation.
- Upload verified Kleihaus product and showroom photos.
- Encourage real customer reviews after completed purchases or projects.
- Keep NAP data consistent across website, Google profile and social profiles.

## AI Search Readiness Roadmap

- Keep catalogue descriptions factual, original and structured.
- Add concise answers to common buying questions.
- Add product and service schema as catalogue depth grows.
- Feed anonymized search and quote trends into backend monthly reporting.
- Avoid exposing internal analytics, weak signals or ML scoring on the public website.
