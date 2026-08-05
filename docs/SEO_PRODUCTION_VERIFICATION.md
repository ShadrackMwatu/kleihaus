# Kleihaus Production SEO Verification

Verification date: 2026-08-05T18:16:59.883Z

Production base URL: https://www.kleihaus.com

Status: PASS

Mode: Full-route production verification

## Endpoints Tested

- /: HTTP 200, 591ms
- /sitemap.xml: HTTP 200, 78ms
- /robots.txt: HTTP 200, 75ms
- /seo-navigation.json: HTTP 200, 83ms, valid JSON
- /seo-internal-links.json: HTTP 200, 76ms, valid JSON
- /seo-dashboard.json: HTTP 200, 72ms, valid JSON
- /images/image-manifest.json: HTTP 200, 84ms, valid JSON

## Routes Tested

- /: HTTP 200, 76ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /products: HTTP 200, 76ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /tiles: HTTP 200, 246ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /floor-tiles: HTTP 200, 85ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /wall-tiles: HTTP 200, 95ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /bathroom-tiles: HTTP 200, 90ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /sanitaryware: HTTP 200, 93ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /paints: HTTP 200, 85ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /adhesives-grout: HTTP 200, 96ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /installation-support: HTTP 200, 86ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /guides: HTTP 200, 102ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /locations: HTTP 200, 175ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /projects: HTTP 200, 78ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /trade-projects: HTTP 200, 89ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /locations/nairobi: HTTP 200, 87ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /locations/machakos: HTTP 200, 96ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /locations/makueni: HTTP 200, 87ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /tiles-nairobi: HTTP 200, 88ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /tiles-machakos: HTTP 200, 93ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /tiles-makueni: HTTP 200, 101ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /tiles-kenya: HTTP 200, 95ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /sanitaryware-nairobi: HTTP 200, 90ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /sanitaryware-machakos: HTTP 200, 106ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /sanitaryware-makueni: HTTP 200, 90ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /sanitaryware-kenya: HTTP 200, 79ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /paints-nairobi: HTTP 200, 85ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /paints-machakos: HTTP 200, 75ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /paints-makueni: HTTP 200, 90ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /paints-kenya: HTTP 200, 79ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /installation-support-nairobi: HTTP 200, 83ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /installation-support-machakos: HTTP 200, 75ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /installation-support-makueni: HTTP 200, 87ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /installation-support-kenya: HTTP 200, 79ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /tile-buying-guide: HTTP 200, 85ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /bathroom-renovation-guide: HTTP 200, 78ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /paint-selection-guide: HTTP 200, 89ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /adhesive-grout-guide: HTTP 200, 79ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /installation-best-practices: HTTP 200, 85ms, title present, canonical present, JSON-LD blocks 2, metadata valid
- /cost-estimation-guide: HTTP 200, 78ms, title present, canonical present, JSON-LD blocks 2, metadata valid

## Route HTML Coverage

- Manifest routes: 39
- Sitemap URLs: 39
- Routes checked in production: 39
- Sitemap URLs missing from manifest: 0
- Manifest routes missing from sitemap: 0
- Full manifest route coverage: yes

## Response Times

- Average response time: 102ms
- Slowest responses:
  - /: HTTP 200, 591ms
  - /tiles: HTTP 200, 246ms
  - /locations: HTTP 200, 175ms
  - /sanitaryware-machakos: HTTP 200, 106ms
  - /guides: HTTP 200, 102ms

## Generated JSON Endpoints

- /seo-navigation.json: HTTP 200, 83ms, valid JSON
- /seo-internal-links.json: HTTP 200, 76ms, valid JSON
- /seo-dashboard.json: HTTP 200, 72ms, valid JSON
- /images/image-manifest.json: HTTP 200, 84ms, valid JSON

## Metadata Validation

- Routes with valid metadata: 39
- Routes with blocking metadata failures: 0
- JSON endpoint validity: pass
- Sitemap/manifest consistency: pass

## Findings

- No blocking production mismatches detected.

## Warnings

- None.

## Limitations

- This verifier checks public HTTP responses and static metadata. It does not log in to Google Search Console, GA4 or Google Business Profile.
- It does not fabricate analytics values. Dashboard metrics that require private sources remain null until connected manually or through approved credentials.
- It performs basic JSON-LD structural validation and forbidden-schema detection, not a full Google Rich Results test.

## Manual Follow-Up

- Review the GitHub Actions SEO Production Monitor after pushes and scheduled runs.
- Download Markdown/JSON report artifacts when a workflow warning or failure needs investigation.
- Review Google Search Console sitemap processing, indexed pages, excluded pages and crawl errors weekly for four weeks.
- Review GA4 Realtime and DebugView for quote, WhatsApp, phone, email, guide and location events.
