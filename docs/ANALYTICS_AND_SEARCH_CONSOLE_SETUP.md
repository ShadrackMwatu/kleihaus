# Kleihaus Analytics And Search Console Setup

Date: 2026-06-25

This guide covers the remaining post-Phase 1 analytics and Google Search Console configuration steps for the live Kleihaus website.

Production architecture:

```text
GitHub main
-> Cloudflare Workers Builds
-> Worker Assets
-> Worker "kleihaus"
-> https://www.kleihaus.com/
```

Active API endpoint:

```text
/api/quote-request
```

Do not commit real Google Analytics or Search Console verification secrets to the repository.

## Production Setup Checklist

Use this checklist after each major SEO deployment and after any analytics environment change.

### Production SEO Verification

- Run `npm run seo:verify-production` after each deployment to `main`.
- Use `npm run seo:verify-production:all` when checking every indexable route in the SEO manifest.
- The GitHub Actions `SEO Production Monitor` workflow runs full-route verification after relevant pushes to `main`, daily at `04:00 UTC` and by manual dispatch.
- Workflow reports are uploaded as GitHub Actions artifacts for 60 days; local timestamped reports remain ignored under `reports/seo-production/`.
- Confirm the command passes for `https://www.kleihaus.com`.
- Confirm `/sitemap.xml`, `/robots.txt`, `/seo-navigation.json`, `/seo-internal-links.json`, `/seo-dashboard.json` and `/images/image-manifest.json` return HTTP 200.
- Confirm representative route HTML contains route-specific title, description, canonical, Open Graph, Twitter/X metadata and JSON-LD in the initial server response.
- Treat failures as deployment blockers unless the report clearly identifies a temporary CDN/deployment propagation delay.
- Keep timestamped local reports under `reports/seo-production/` for review; do not store private analytics exports there.

### GA4 Configuration

- Confirm the official Kleihaus GA4 property exists.
- Add the real `VITE_GA_MEASUREMENT_ID` only in Cloudflare Workers Builds environment variables.
- Do not hardcode the real ID in source files, docs, `.env.example` or screenshots committed to the repo.
- Trigger a fresh production build after the environment variable is saved.
- Confirm the live site loads GA4 only after the build that includes the variable.

### GA4 Event Verification

- Open GA4 DebugView or Realtime.
- Visit the homepage and one guide route.
- Submit a successful quote request using test-safe details agreed by the business.
- Click a WhatsApp CTA and confirm same-tab navigation still works.
- Click phone and email CTAs.
- Click guide cards and related guide links.
- Visit `/locations/nairobi`, `/locations/machakos` and `/locations/makueni`.
- Confirm events appear for quote requests, WhatsApp clicks, phone clicks, email clicks, guide interactions and location views.

### Search Console Verification

- Verify ownership for `https://www.kleihaus.com/`.
- Use the existing verification file only if it exactly matches the file Google issued for the active property.
- Do not commit fake verification files or placeholder meta tags.
- Submit `https://www.kleihaus.com/sitemap.xml`.
- Confirm the sitemap fetch succeeds and submitted URL count matches the generated sitemap.
- Inspect the homepage, core category pages, location hubs, service-location pages and guide pages.
- Confirm each inspected page is indexable and shows the expected canonical URL.

### Monthly Monitoring

- Review Search Console queries, clicks, impressions, CTR and average position.
- Review top landing pages and pages with high impressions but low CTR.
- Review indexing, sitemap and enhancement reports.
- Review GA4 sessions, engaged sessions and conversion events.
- Review quote submissions, WhatsApp clicks, phone clicks, email clicks, guide interactions and location page views.
- Review Google Business Profile profile views, calls, chat clicks and website visits.
- Record findings in `docs/MONTHLY_SEO_REPORT_TEMPLATE.md`.

## GA4 Readiness

The frontend supports optional Google Analytics 4 through this Vite build-time environment variable:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

The example above shows the expected format only. Use the real Measurement ID issued by the official Kleihaus GA4 property.

Current behavior:

- If `VITE_GA_MEASUREMENT_ID` is present during the Cloudflare Workers Builds build, the site loads GA4.
- If it is absent, GA4 is not loaded.
- Missing GA4 configuration does not create console errors.
- GA4 failures do not block quote submission, WhatsApp links, phone links, email links or first-party journey tracking.
- First-party anonymous journey events still go to `/api/track-event`.

### 2026-08-05 Production Verification Note

After the official GA4 Web Data Stream was created and the Cloudflare Workers Builds variable was reportedly added, the repo-level integration was verified with a temporary local build value only. The local production build embedded the temporary value once, loaded the Google tag path once and included one GA4 config call.

Live production at that moment still served JavaScript with the optional GA4 loader code path but without a concrete Measurement ID, so a fresh Workers Build was required after the Cloudflare build-time variable configuration. Do not add the manual Google tag snippet to `index.html`; the existing `VITE_GA_MEASUREMENT_ID` integration is the intended path.

After a documentation-only deployment trigger, the active Workers Build for commit `4461590` completed successfully and live production served a new JavaScript asset containing one redacted Measurement ID, one Google tag loader reference and one GA4 config call. No duplicate loader or manual initial-HTML snippet was detected.

After the fresh deployment completes, verify:

- The live JavaScript contains one redacted `G-...` Measurement ID.
- `googletagmanager.com/gtag/js` is requested once.
- One `gtag("config", ...)` call is present.
- GA4 Realtime or DebugView receives a page visit and then receives test clicks for quote, WhatsApp, phone, email, guide, location and CTA events.

## Configure GA4 In Cloudflare Workers Builds

Add the real GA4 Measurement ID in the Cloudflare project/build environment that runs the GitHub connected Worker build.

Recommended Cloudflare path:

1. Open Cloudflare Dashboard.
2. Select the Kleihaus account.
3. Go to Workers & Pages.
4. Open Worker `kleihaus`.
5. Open Settings.
6. Find build/deployment environment variables for Workers Builds.
7. Add:

```env
VITE_GA_MEASUREMENT_ID=<real GA4 Measurement ID>
```

8. Save.
9. Trigger a new production build from `main`.
10. Verify the deployed JavaScript includes GA4 only after the variable is configured.

Do not add the GA4 Measurement ID to source files, `README.md`, `.env.example` or docs.

## Optional Analytics Debug Mode

For local or temporary build debugging, the repo supports:

```env
VITE_ANALYTICS_DEBUG=true
```

Debug behavior:

- Disabled by default.
- Logs `KLEIHAUS_ANALYTICS_DEBUG` in the browser console.
- Logs only non-sensitive metadata: event name, GA event name, page path, clicked element, product/category and UTM source.
- Does not log names, phone numbers, email addresses or customer messages.
- Should remain blank or false in production unless temporarily debugging a deployment.

## GA4 Event Verification Checklist

Use GA4 DebugView or Realtime after the real Measurement ID is configured and deployed.

| Event | User action | Where to test | Expected GA4 result |
| --- | --- | --- | --- |
| `quote_submit` | Submit the quote form successfully. | Homepage Quote panel or Contact section. | Event appears after backend confirms successful email-channel quote submission. |
| `whatsapp_click` | Click a WhatsApp CTA. | Header, hero, footer, mobile sticky CTA or support modal "Chat on WhatsApp". | Event appears with CTA/source metadata before same-tab WhatsApp navigation. |
| `phone_click` | Click a phone link. | Top bar, Contact section or footer. | Event appears with phone CTA source metadata. |
| `email_click` | Click an email link. | Top bar, Contact section or footer. | Event appears with email CTA source metadata. |
| `guide_click` | Click a guide or planning topic. | Buying Guide & FAQs or guide-related links. | Event appears with guide/topic metadata. |
| `guide_view` | Open a guide route. | `/tile-buying-guide`, `/bathroom-renovation-guide`, `/paint-selection-guide`, `/adhesive-grout-guide`, `/installation-best-practices`, `/cost-estimation-guide`. | Event appears with route path and guide category. |
| `location_view` | Open a location hub. | `/locations/nairobi`, `/locations/machakos`, `/locations/makueni`. | Event appears with route path and location category. |
| `cta_click` | Click tracked generic CTA events. | Category cards, quote CTAs and contact actions. | Event appears with CTA source metadata where mapped from first-party events. |

Troubleshooting:

- If no events appear, confirm the production build was created after `VITE_GA_MEASUREMENT_ID` was added.
- Confirm the value is available to the build environment, not only to runtime Worker variables.
- Confirm browser extensions are not blocking GA.
- Confirm the browser console has no `KLEIHAUS_ANALYTICS_DEBUG` errors if debug mode is enabled.
- Confirm first-party `/api/track-event` responses return success so local journey tracking still works.

## Four-Week Monitoring Cycle

Use `docs/SEO_GA4_4_WEEK_MONITORING_TEMPLATE.md` for the first four weeks after major SEO deployments.

## Future API-Based Monitoring

The continuous SEO production monitor does not connect to GA4 or Search Console yet because approved credentials have not been provided and should not be committed to the repository.

Future GA4 automation can be added only after the official Kleihaus property ID and approved Google Analytics Data API credentials are available through GitHub secrets. Candidate metrics include organic sessions, landing pages, engagement, `quote_submit`, `whatsapp_click`, `phone_click`, `email_click`, `guide_click`, `guide_view`, `location_view` and `cta_click`.

Future Search Console automation can be added only after the production property is verified and approved API access is available through GitHub secrets. Candidate metrics include clicks, impressions, CTR, average position, top queries, top pages, sitemap status and index coverage where supported.

Do not add fake zeroes, placeholder service-account JSON, verification tokens or dummy property IDs to simulate these integrations.

Search Console weekly checks:

- Indexed pages and excluded pages.
- Sitemap processing status and submitted URL count.
- Crawl errors and page indexing issues.
- Impressions, clicks, CTR and average position.
- Top queries, top pages, location-related queries and guide-related queries.

GA4 weekly checks:

- Organic sessions, engaged sessions, engagement rate and average engagement time.
- Landing pages and source/medium.
- GBP UTM traffic from the recommended profile URLs.
- `quote_submit`, `whatsapp_click`, `phone_click`, `email_click`, `guide_click`, `guide_view`, `location_view` and `cta_click`.

Manual rule:

- Do not fill missing metrics with estimates. Use `TBD`, `not configured` or `not available` until the official account data is accessible.

## Google Business Profile UTM Tracking

The June 2026 Google Business Profile report showed 62 profile views but 0 calls, 0 chat clicks, 0 website visits and 0 interactions. Use a tracked website URL in Google Business Profile so future profile-to-site visits can be separated from broader organic traffic.

Recommended primary Google Business Profile website URL:

```text
https://www.kleihaus.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp
```

Optional location-specific profile or campaign links:

```text
https://www.kleihaus.com/locations/nairobi?utm_source=google&utm_medium=organic&utm_campaign=gbp_nairobi
https://www.kleihaus.com/locations/machakos?utm_source=google&utm_medium=organic&utm_campaign=gbp_machakos
https://www.kleihaus.com/locations/makueni?utm_source=google&utm_medium=organic&utm_campaign=gbp_makueni
```

Manual action outside this repo: update the Google Business Profile website link to the tracked URL after the site changes deploy. Do not add redirects for this; GA4 and the first-party journey tracker already preserve the UTM parameters on landing.

To verify GBP traffic in GA4:

1. Open GA4 Realtime after clicking the tracked GBP URL.
2. Confirm the landing page is `/` or the selected `/locations/...` route.
3. Confirm source/medium shows `google / organic` where GA4 attribution is available.
4. Review campaign values for `gbp`, `gbp_nairobi`, `gbp_machakos` or `gbp_makueni`.
5. Test quote, WhatsApp, phone and email actions from that same session.

## Google Search Console Setup

Recommended property:

```text
https://www.kleihaus.com/
```

Setup steps:

1. Open Google Search Console.
2. Add the URL-prefix property for `https://www.kleihaus.com/`.
3. Verify ownership.
4. Use the existing HTML verification file only if Google issues the matching filename/content.
5. If using a meta-tag method, add the real meta tag to `index.html` only after Google provides it.
6. Do not commit fake placeholder verification tags.
7. Submit the sitemap:

```text
https://www.kleihaus.com/sitemap.xml
```

8. Use URL Inspection for key routes.
9. Request indexing for important pages after deployment.
10. Monitor Pages, Sitemaps, Search Performance and Enhancements reports.

Current crawler files:

- `public/robots.txt` allows crawling and points to `https://www.kleihaus.com/sitemap.xml`.
- `public/sitemap.xml` lists homepage, category pages, location hubs, service-location pages and guide pages.
- `public/google1e52ed9d448e7c74.html` exists. Treat it as real only if it matches the active Search Console property verification file.

## Indexing Verification Checklist

Use Search Console URL Inspection for these routes.

Homepage:

- `https://www.kleihaus.com/`

Core product/service pages:

- `https://www.kleihaus.com/tiles`
- `https://www.kleihaus.com/floor-tiles`
- `https://www.kleihaus.com/wall-tiles`
- `https://www.kleihaus.com/bathroom-tiles`
- `https://www.kleihaus.com/sanitaryware`
- `https://www.kleihaus.com/paints`
- `https://www.kleihaus.com/adhesives-grout`
- `https://www.kleihaus.com/installation-support`

Location hubs:

- `https://www.kleihaus.com/locations/nairobi`
- `https://www.kleihaus.com/locations/machakos`
- `https://www.kleihaus.com/locations/makueni`

Main category-location pages:

- `https://www.kleihaus.com/tiles-nairobi`
- `https://www.kleihaus.com/tiles-machakos`
- `https://www.kleihaus.com/tiles-makueni`
- `https://www.kleihaus.com/sanitaryware-nairobi`
- `https://www.kleihaus.com/sanitaryware-machakos`
- `https://www.kleihaus.com/sanitaryware-makueni`
- `https://www.kleihaus.com/paints-nairobi`
- `https://www.kleihaus.com/paints-machakos`
- `https://www.kleihaus.com/paints-makueni`
- `https://www.kleihaus.com/installation-support-nairobi`
- `https://www.kleihaus.com/installation-support-machakos`
- `https://www.kleihaus.com/installation-support-makueni`

Guide pages:

- `https://www.kleihaus.com/tile-buying-guide`
- `https://www.kleihaus.com/bathroom-renovation-guide`
- `https://www.kleihaus.com/paint-selection-guide`
- `https://www.kleihaus.com/adhesive-grout-guide`
- `https://www.kleihaus.com/installation-best-practices`
- `https://www.kleihaus.com/cost-estimation-guide`

For each inspected URL, confirm:

- URL is allowed by robots.
- Canonical is `https://www.kleihaus.com/...`.
- Page is indexed or eligible for indexing.
- Rendered HTML shows the expected visible content.
- No Product or Offer structured data warnings appear.
- Sitemap discovery works.

## Ongoing Monitoring

Monthly checks:

- Search Console performance by query, page and country.
- Pages indexed vs submitted.
- Sitemap fetch status.
- Top organic landing pages.
- Quote submissions by landing page from first-party journey data.
- GA4 conversions for quote, WhatsApp, phone, email, guide and location events.

Keep personal contact details out of analytics tools unless there is a reviewed consent and privacy policy process.
