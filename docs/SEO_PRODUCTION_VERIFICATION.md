# Kleihaus Production SEO Verification

Verification date: 2026-08-05T17:44:08.764Z

Production base URL: https://www.kleihaus.com

Status: ACTION REQUIRED

## Endpoints Tested

- /: HTTP 200
- /sitemap.xml: HTTP 200
- /robots.txt: HTTP 200
- /seo-navigation.json: HTTP 200, valid JSON
- /seo-internal-links.json: HTTP 200, valid JSON
- /seo-dashboard.json: HTTP 200, valid JSON
- /images/image-manifest.json: HTTP 200, valid JSON

## Routes Tested

- /: HTTP 200, title present, canonical present, JSON-LD blocks 1
- /locations/nairobi: HTTP 200, title present, canonical present, JSON-LD blocks 2
- /locations/machakos: HTTP 200, title present, canonical present, JSON-LD blocks 2
- /locations/makueni: HTTP 200, title present, canonical present, JSON-LD blocks 2
- /tiles-nairobi: HTTP 200, title present, canonical present, JSON-LD blocks 2
- /sanitaryware-nairobi: HTTP 200, title present, canonical present, JSON-LD blocks 2
- /paints-nairobi: HTTP 200, title present, canonical present, JSON-LD blocks 2
- /installation-support: HTTP 200, title present, canonical present, JSON-LD blocks 2
- /tile-buying-guide: HTTP 200, title present, canonical present, JSON-LD blocks 2

## Route HTML Coverage

- Manifest routes: 39
- Sitemap URLs: 39
- Routes checked in production: 9
- Sitemap URLs missing from manifest: 0
- Manifest routes missing from sitemap: 0

## Generated JSON Endpoints

- /seo-navigation.json: HTTP 200, valid JSON
- /seo-internal-links.json: HTTP 200, valid JSON
- /seo-dashboard.json: HTTP 200, valid JSON
- /images/image-manifest.json: HTTP 200, valid JSON

## Findings

- /: Twitter/X description mismatch

## Warnings

- /: JSON-LD exists but expected route webpage @id was not found

## Limitations

- This verifier checks public HTTP responses and static metadata. It does not log in to Google Search Console, GA4 or Google Business Profile.
- It does not fabricate analytics values. Dashboard metrics that require private sources remain null until connected manually or through approved credentials.
- It performs basic JSON-LD structural validation and forbidden-schema detection, not a full Google Rich Results test.

## Manual Follow-Up

- Review Google Search Console sitemap processing, indexed pages, excluded pages and crawl errors weekly for four weeks.
- Review GA4 Realtime and DebugView for quote, WhatsApp, phone, email, guide and location events.
- Compare production SEO verification after every deployment.
